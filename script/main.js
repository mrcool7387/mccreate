function setServerStatus(status) {
    const serverStatusTitle = document.querySelector('#status_title');
    const serverStatusBox = document.querySelector('.server_status');

    serverStatusTitle.textContent = status;
    serverStatusTitle.className = "status_title " + status.toLowerCase();

    serverStatusBox.id = status.toLowerCase();
}

function fetchServerLog() {
    fetch('./server.log')
        .then(response => response.text())
        .then(data => {
            const logContainer = document.querySelector('div#log');
            logContainer.innerHTML = colorizeLog(data).replace(/\n/g, '<br>');
        })
        .catch(error => console.error('Error fetching server log:', error));
}

function fetchStatus() {
    fetch('./status')
        .then(response => response.text())
        .then(data => {
            const status = document.querySelector('span#status_title');
            status.innerHTML = data.replace(/\n/g, '').toLowerCase();

            const div = document.querySelector('div.status_title')
            status.id = data.replace(/\n/g, '').toLowerCase();
        })
        .catch(error => console.error('Error fetching status:', error));
}

// Call the function to fetch and display the server log
fetchServerLog();
fetchStatus();

// Optionally, you can set an interval to refresh the log periodically
setInterval(fetchServerLog, 5000); // Refresh every 5 seconds
setInterval(fetchStatus, 5000);

function colorizeLog(log) {
    const config = [
        { regex: /ERROR/g, color: 'red' },
        { regex: /WARN/g, color: 'orange' },
        { regex: /INFO/g, color: 'green' },
        { regex: /\[/g, color: 'gray' },
        { regex: /\]/g, color: 'gray' },
        { regex: /DEBUG/g, color: 'purple' },
        { regex: /\d{4}-\d{2}-\d{2}/g, color: 'light_blue' }, // Date
        { regex: /\d{2}:\d{2}:\d{2}/g, color: 'light_blue' }, // Time
        { regex: /\[.*?\]/g, color: 'gray' }, // Everything between brackets
        // Add more regex and color pairs as needed
        { regex: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, color: 'italic' }, // IP addresses
        { regex: /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g, color: 'bold' }, // UUIDs
    ];

    config.forEach(({ regex, color }) => {
        log = log.replace(regex, match => `<span class="color-${color}">${match}</span>`);
    });

    return log;
}

/*
document.addEventListener('DOMContentLoaded', (event) => {
    console.log(document.querySelector('div.container#title'));
    console.log(document.querySelector('div.container#title').scrollHeight);
    console.log(document.querySelector('div.container.log').scrollHeight);
    console.log(document.querySelector('#log').scrollHeight);
    console.log(document.body.scrollHeight)
});
*/
