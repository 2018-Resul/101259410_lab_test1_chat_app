$(() => {
    $("#send").click(() => {

        createDB({
            username: $("#username").val(),
            fName: $("#fName").val(),
            surname: $("#surname").val(),
            password: $("#password").val(),
            oncreate:$("#oncreate").val()
        })
    })

})



function createDB(user) {
    $.post('http://localhost:3333/user', user)
    window.location.href = 'logIn.html'
}


document.getElementById('login').addEventListener('click',()=>{
    $.get('http://localhost:3333/user', (data) => {
        data.map(sendData);
    })
})




function sendData(user) {

    const username= $("#username").val()
    

    if ( username== user.username ) {

        localStorage.setItem('getUserInfo', user.username)
        window.location.href = 'joinChat.html'
    } else {
        document.getElementById('messages').innerHTML = "Someting went wrong please try again"
    }
}
