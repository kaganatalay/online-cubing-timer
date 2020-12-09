let socket = io.connect('http://localhost:3000');

const createParty = document.querySelector(".create-party");
const joinParty = document.querySelector(".join-party");
const ready = document.querySelector(".ready");

const partyCode = document.querySelector(".party-code");
const errorFeedback = document.querySelector(".join span");
const codeDisplay = document.querySelector(".create span");

const userNotifier = document.querySelector(".user .notifier");
const opponentNotifier = document.querySelector(".opponent .notifier");

const entry_wrapper = document.querySelector(".entry-wrapper");
const race_wrapper = document.querySelector(".race-wrapper");

let code = null;

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
        code = data;
        socket.emit('join_request', data);
    });
});

ready.addEventListener('click', () => {
    socket.emit('ready', code);

    userNotifier.classList.add('ready');
    userNotifier.children[0].innerHTML = 'Ready';
    setTimeout(() => {
        ready.classList.add('disappear');
    }, 100);
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
    race_wrapper.style.display = 'flex';
});

socket.on('ping', data => {
    console.log(data);
});
//setInterval(()=>console.log(partyCode.value), 100);




