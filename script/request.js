function send(message) {
    fetch(`https://api.telegram.org/bot7553712337:AAEOmCgFXnuDSS0g5hnJ1vbisusGDxYCgZc/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: "7368930252",
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert("Nachricht gesendet!");
        } else {
            alert("Fehler: " + data.description);
        }
    })
    .catch(error => console.error("Fehler:", error));
}

function getName() {
    const name = prompt("Name der die Request sendet: ");
    if (name) {
        return name;
    } else {
        alert("Bitte gib einen Namen ein!");
    }
}

// Functions to send the request Messages

function startServer() {
    send("Request to START SERVER by " + getName());
}

function stopServer() {
    send("Request to STOP SERVER by " + getName());
}

function restartServer() {
    send("Request to RESTART SERVER by " + getName());
}