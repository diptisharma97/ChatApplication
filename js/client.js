const socket= io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");
var audio =new Audio('msg_song.mp3');


const append=(message,position)=>{
const messageElement=document.createElement('div');
messageElement.innerText=message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position=='left'){
    audio.play();
}
}

const appendForNewJoined=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('newJoined');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    audio.play();
    }

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";
})

const name= prompt('Enter your name to join');
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    appendForNewJoined(`${name} joined the chat`,'center');
})

socket.on('receive',data=>{
    console.log(data.name);
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('leave',name=>{
    console.log(name);
    appendForNewJoined(`${name} left the chat`,'center');
})