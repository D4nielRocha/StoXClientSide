const API_ROLES = {
    CREATE_STOX: 'create:stox',
    READ_STOX: 'read:stox',
    UPDATE_STOX: 'update:stox',
    DELETE_STOX: 'delete:stox'
}

const AUTH0_CLIENT_ID = 'Ffyuq5vslRo8Ir6W2l5Hfu9W9QXBrkkb';

const AUTH0_DOMAIN = 'danielrochamz.eu.auth0.com';

const AUDIENCE = 'https://stox-api';

// const AUTH0_CALLBACK_URL = "http://localhost:3000/faceoff.html";

const auth0WebAuth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: location.href,
    // responseType: "id_token token",
    audience: AUDIENCE
});

const auth0Authentication = new auth0.Authentication(auth0WebAuth, {
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID
});

export{
    API_ROLES,
    auth0WebAuth,
    auth0Authentication
}