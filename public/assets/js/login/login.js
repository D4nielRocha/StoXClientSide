import { auth0WebAuth, auth0Authentication } from '../auth/auth0-variables.js';
import { getAccessToken, checkSession, saveAuthResult, checkStatus } from '../auth/jwtAuth.js';
import { saveUser, getSavedUser, updateUser } from '../userSection/userForm.js';
import { User } from '../model/userModel.js'
// import {prepareNewUser} from '../formEvents/form.js'



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
    document.getElementById('profileDisplay').classList.toggle('hidden'); 
    await auth0Authentication.userInfo(getAccessToken(), (err, usrInfo) => {
        // console.log(usrInfo);
        sessionStorage.setItem('email', usrInfo.email);
        sessionStorage.setItem('nickname', usrInfo.nickname);
        document.getElementById('profileInfo').innerHTML = `<img src="${usrInfo.picture}" alt="profile Picture">
                                                            <p>Username: <span>${usrInfo.nickname}</span> </p>
                                                            <p>Email: <span>${usrInfo.email}</span> </p>`

    });

    //check if user already has been updated previously
    let isSaved = await getSavedUser();
    console.log(`this is the isSaved`, isSaved)

    if(isSaved[0].firstName){
        // document.getElementById('profileInput').style.display = "none";
        document.getElementById('saveUserBtn').style.display = "none";
        document.getElementById('profileInput').innerHTML = `   <p><strong>First Name</strong>: <span>${isSaved[0].firstName}</span> </p>
                                                                <p><strong>Last Name</strong>: <span>${isSaved[0].lastName}</span> </p>
                                                                <p><strong>Phone</strong>: <span>${isSaved[0].phone}</span> </p>`;

    } else {
        document.getElementById('saveUserBtn').addEventListener('click', () => {
            let updatedUser = prepareUpdateUser();
            updateUser(updatedUser);
            alert(`User Succesfully Updated!`);
            document.getElementById('profileDisplay').classList.toggle('hidden');
        })
    }
       
    
}, false);


function displayUser(user){
    console.log(`this is the user`, user);
    sessionStorage.setItem('nickname', user.idTokenPayload.nickname);
    sessionStorage.setItem('email', user.idTokenPayload.email);
    document.getElementById('profileBtn').innerText = `Logged in as: ${user.idTokenPayload.nickname}`;
   
}



let prepareUpdateUser = () => {

    return new User(
        sessionStorage.getItem('nickname'),
        sessionStorage.getItem('email'),
        document.getElementById('firstName').value,
        document.getElementById('lastName').value,
        document.getElementById('phone').value
    )
  }



window.addEventListener('load', event => {
    console.log('login js loading');
    auth0WebAuth.parseHash(function (err, result){
        if(result){
            saveAuthResult(result);
            toggleLinks(true);
            console.log(`this is the result`, result);
            displayUser(result);
            saveUser(result.idTokenPayload);
            if(result.idTokenPayload.email == "d4niel_rocha@icloud.com"){
                document.getElementById('adminButton').classList.remove('d-none');
            }            
        }
    });
    toggleLinks(checkStatus());
});

export {
    displayUser
}