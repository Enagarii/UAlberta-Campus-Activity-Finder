
function sendData(pinData) 
{
    console.log(JSON.stringify({pinData}));

    fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: pinData })  // Send the message as JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.reply);
    })
    .catch(error => console.error('Error:', error));
}