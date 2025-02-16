/*
    Base functionality for creating marker data
*/

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

function getData()
{
    fetch('/api/data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.reply)
    })
    .catch(error => console.error('Error:', error));
}