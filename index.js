const express = require('express');
const app = express();

const server = app.listen(3000, () => console.log('Listening on http://localhost:3000'));
let io = require('socket.io')(server);

app.use(express.static('public'));

let parties = [];
const PARTYSIZE = 2;

io.on('connection', (socket) => {
    socket.on('party_created', data => {
        parties.push(data);
    });

    socket.on('join_request', data => {
        // Checking if that party exists
        let exists = parties.some(party => {
            return data == party;
        });

        let err = {
            feedback: "",
            id: null
        };

        if(exists) {
            // Join request accepted
            
            // Add party size control some time
            if(true) {
                const message = "You successfuly joined the party " + data;
                socket.join(data);
                socket.emit('join_request_accepted', message);
            } else {
                err.feedback = "Max party size reached!"
                err.id = 2;
                socket.emit('join_request_declined', err);
            }
        } else {
            // Party doesn't exist

            if(data == "") {
                err.feedback = "You must provide a party name!"
                err.id = 0;
            } else {
                err.feedback = "Sorry, it seems like specified party does not exist!";
                err.id = 1;
            }

            socket.emit('join_request_declined', err);
        }
    });

    socket.on('ready', data => {
        // do stuff
    });
});

setInterval(() => {
    parties.forEach(party => {
        //
    });
}, 1000);


