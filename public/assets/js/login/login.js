import { auth0WebAuth, auth0Authentication } from '../auth/auth0-variables.js';
import { getAccessToken, checkSession, saveAuthResult, checkStatus } from '../auth/jwtAuth.js';



function toggleLinks(loggedIn){

    if(loggedIn){
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';
        document.getElementById('profileBtn').style.display = 'block';
    } else {
        document.getElementById('loginBtn').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('profileBtn').style.display = 'none';
    }
}



document.getElementById('loginBtn').addEventListener('click', event => {
    event.preventDefault();

    auth0WebAuth.authorize({returnTo: location.href});
    console.log('Logged In');
}, false);

document.getElementById('logoutBtn').addEventListener('click', event => {
    event.preventDefault();

    sessionStorage.clear();
    auth0WebAuth.logout({returnTo: 'http://localhost:3000/index.html'});
    console.log('Logged Out');
}, false);

document.getElementById('profileBtn').addEventListener('click', async event => {
    event.preventDefault();

    auth0Authentication.userInfo(getAccessToken(), (err, usrInfo) => {
        console.log(usrInfo);
        sessionStorage.setItem('email', usrInfo.email);
        document.getElementById('profileDisplay').innerHTML = `<img src="${usrInfo.picture}" alt="profile Picture">
                                                                <h2>${usrInfo.nickname}</h2>
                                                                <p>${usrInfo.email}</p>
                                                                `;
        // document.getElementById('profileDisplay').classList.remove('profileHide');                                   
        
    });  
    
}, false);


function displayUser(user){
    console.log(`this is the user`, user);
    sessionStorage.setItem('nickname', user.idTokenPayload.nickname);
    sessionStorage.setItem('email', user.idTokenPayload.email);
    document.getElementById('profileBtn').innerText = `Logged in as: ${user.idTokenPayload.nickname}`;
}


window.addEventListener('load', event => {
    console.log('login js loading');
    auth0WebAuth.parseHash(function (err, result){
        if(result){
            saveAuthResult(result);
            toggleLinks(true);
            console.log(`this is the result`, result);
            displayUser(result);
        }
    });
    toggleLinks(checkStatus());
});

export {
    displayUser
}