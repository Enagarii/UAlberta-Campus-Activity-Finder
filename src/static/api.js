
function sendData(test) {
    console.log(test);

    fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: test })  // Send the message as JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.reply);
    })
    .catch(error => console.error('Error:', error));
}