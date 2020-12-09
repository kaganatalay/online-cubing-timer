let socket = io.connect('http://localhost:3000');
const entry_wrapper = document.querySelector(".entry-wrapper");
const createParty = document.querySelector(".create-party");
const joinParty = document.querySelector(".join-party");
const partyCode = document.querySelector(".party-code");
const errorFeedback = document.querySelector(".join span");
const codeDisplay = document.querySelector(".create span");

socket.on('connect', () => {
    createParty.addEventListener('click', () => {
        const data = socket.id;
        console.log(data);
        socket.emit('party_created', data);

        codeDisplay.innerHTML = data;
    });

    joinParty.addEventListener('click', () => {
        // Join request
        const data = partyCode.value;
        socket.emit('join_request', data);
    });
});

socket.on('join_request_declined', data => {
    partyCode.classList.add("declined");
    errorFeedback.innerHTML = ''
    errorFeedback.innerHTML = data.feedback;
});

socket.on('join_request_accepted', data => {
    console.log(data);
    // Hide other elements
    entry_wrapper.style.display = 'none';
});

socket.on('ping', data => {
    console.log(data);
});
//setInterval(()=>console.log(partyCode.value), 100);




