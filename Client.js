let ErrorDetected = {
    password:false,
    login: false
};

const url = 'http://localhost:3003/';

document.getElementById('btn').addEventListener("click", ()=>{
    let password = document.getElementById('password').value;
    let login = document.getElementById('login').value;

    if(!checkEnteredData(login,password))
        return;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(
        JSON.stringify({
        login,
        password
        })
    );
    let receivedData = JSON.parse(xhr.response);

    if(receivedData.data.status === 'failed')
    {
        document.getElementById('password').after(crePassErMess());
        document.getElementById('login').after(creLogErMess());
        ErrorDetected.password = true;
        ErrorDetected.login = true;
    }
    if(receivedData.data.status === 'wrongPassword')
    {
        document.getElementById('password').after(crePassErMess());
        ErrorDetected.password = true;


    }
    if(receivedData.data.status === 'success')
    {
        document.getElementById('btn').after(creSuccessMess());
    }
})

function checkEnteredData(login, password){

    if(login === "" || login === null)
    {

        document.getElementById('login').after(creLogErMess());

        ErrorDetected.login = true;
    }

    if(password === "" || password === null)
    {

        document.getElementById('password').after(crePassErMess());

        ErrorDetected.login = true;
    }

    if(ErrorDetected.login || ErrorDetected.password)
        return false;

    return true;
}

document.getElementById('password').addEventListener('input',()=>{
    delSuccessMess();
    if(ErrorDetected.password)
        DeleteMessageBox();
})
document.getElementById('login').addEventListener('input',()=>{
    delSuccessMess();
    if(ErrorDetected.login)
        DeleteMessageBox();
})


function DeleteMessageBox()
{
    let ErrorMessages = document.getElementsByClassName('AuthError');
    let errLength = ErrorMessages.length;

    for (let i = ErrorMessages.length; i > 0; i--)
        ErrorMessages[i-1].remove();

    ErrorDetected.login = false;
    ErrorDetected.password = false
}

function  creLogErMess()
{
    let span = document.createElement('span');

    span.className = "AuthError";
    span.innerHTML = "Incorrect login";
    return span;
}

function crePassErMess()
{
    let span = document.createElement('span');

    span.className = "AuthError";
    span.innerHTML = "Incorrect password";
    return span;
}

function creSuccessMess(){
    let span = document.createElement('span');
    span.id = "AuthSuccess";
    span.innerHTML = "Success"
    return span;
}

function  delSuccessMess(){

    let messageBox = document.getElementById('AuthSuccess');
    if(messageBox!== null)
        messageBox.remove();
}
