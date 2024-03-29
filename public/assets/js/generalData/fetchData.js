// const BASE_URL = "https://stox-server.azurewebsites.net/";
// const BASE_URL = "http://localhost:8080";
const BASE_URL = "https://stox-server.herokuapp.com/";


//get HHTP header for requests to the application

let getHeaders = () => {

    return new Headers ({
        "Accept": "application/json", 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
    });
};


//Used to initiliase requests and permit cors requests
//parameters: http method and body content

let fetchInit = (httpMethod = 'GET', bodyContent = '') => {

    let init = {  
        method: httpMethod,
        credentials: 'include',
        headers: getHeaders(),
        mode: 'cors',
        cache: 'default'
    };

    if(bodyContent != ''){
        init.body = bodyContent;
    };

    return init;

};


//Fetch data from DB // ANY DATA - GENERIC FUNCTION
let getDataAsync = async (url, init = fetchInit()) => {

    try{
        
    const response = await fetch(url, init);
    const json = await response.json();
    console.log(json);

    return json

    }catch(err){
        console.log(err);
    }

}

export {
    BASE_URL,
    fetchInit,
    getDataAsync
}



