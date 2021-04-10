import { auth0WebAuth } from "./auth0-variables.js";

function checkStatus(){

    const accessToken = sessionStorage.getItem('accessToken');
    const expirationDate = new Date(Number.parseInt(sessionStorage.getItem('expirationDate')));
    const isExpired = expirationDate < new Date();
    let status;


    if (!accessToken) {
        status = 'There is no access token present in local storage, meaning that you are not logged in.';
        } else if (isExpired) {
        status = 'There is an expired access token in local storage.';
        } else {
        status = `There is an access token in local storage, and it expires on ${expirationDate}.`;
        }

        console.log("status: ", status);

    if(accessToken && !isExpired){
        return true;
    } else {
        return false;
    }
}

function getAccessToken(){
    return sessionStorage.getItem('accessToken');
}


function saveAuthResult(result){
    sessionStorage.setItem('accessToken', result.accessToken);
    sessionStorage.setItem('idToken', result.idToken);
    sessionStorage.setItem('expirationDate', Date.now() + Number.parseInt(result.expiresIn) * 1000);
    console.log(`this is the result from saveAuthResult`, result);
    checkStatus();
}


function checkSession(){
    auth0WebAuth.checkSession({
        responseType: 'token id_token',
        timeout: 5000,
        usePostMessage: true
    }, function(err, result){
        if(err){
            console.log(`Could not get a new token using silent authentication (${err.error})`);
            return false;
        } else {
            saveAuthResult(result);
        }
        return true;
    });
}


const parseJwt = (token) => {
    try{
        return JSON.parse(atob(token.split('.')[1]));
    } catch(e){
        return null;
    }
}

function checkAuth(permission){
    const jwt = sessionStorage.getItem('accessToken');

    if(jwt == null){
        return false;
    }
    const decoded = parseJwt(jwt);
    return decoded.permissions.includes(permission);
}

export{ 
    checkStatus,
    getAccessToken,
    saveAuthResult,
    checkSession,
    checkAuth
}