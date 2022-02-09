const socket = io('http://localhost:3333');


socket.on("message", (situation) => {
    console.log(situation);

    $("#chat-messages").append(`
            <div class="message">
            <p class="meta">${situation.username} 
            <p class="text">${situation.message}
            </p>
            </div>`)



});

socket.on("goChatRoom", (situation) => {
    console.log(situation);

    $("#chat-messages").append(`
            <div class="message">
            <p class="meta">${situation.username} 
            <p class="text">${situation.message}
            </p>
            </div>`)


});




const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const roomFind = urlParams.get('room')
const usernameFind = urlParams.get('username')

$("#users").append(`<strong> ${usernameFind} </strong> `)
$("#room-name").append(`<strong> ${roomFind} </strong> `)



$(() => {
    $("#chat-form").submit((e) => {

        e.preventDefault();
        const msgInput = $("#msgInput").val()

        socket.emit('userInfo', { username: usernameFind, room: roomFind, message: msgInput });

        sendInfoMongo({ username: usernameFind, room: roomFind, message: msgInput })
    })
    getMessages(roomFind)
})




function sendInfoMongo(message) {
    $.post('http://localhost:3333/messages', message)
}




function getMessages(roomByUser) {
    $.get('http://localhost:3333/messages', (data) => {

        data.filter(returnedInfo => {
            return returnedInfo.room == roomByUser;
        }).map(info => {

            $("#chat-messages").append(`
            <div class="message">
            <p class="meta">${info.username} 
            <p class="text">${info.message}
            </p>
            </div>`)

        });

    })
}






