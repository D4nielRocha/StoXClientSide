import * as api from '../generalData/fetchData.js';

let saveUser = async (user) => {

    console.log(`this is the user to be saved`, user);

    const url = `${api.BASE_URL}/user/newuser`;

    console.log(JSON.stringify(user));

    const init = api.fetchInit('POST', JSON.stringify(user));

    try{
        const result = await api.getDataAsync(url, init)
        console.log(`this is the result from the post request`, result);
    }catch(e){
        console.log(e);
    }
    
}

let getSavedUser = async () => {

    let email = sessionStorage.getItem('email');
    console.log(email);

    const url = `${api.BASE_URL}/user/${email}`

    try{
        const result = await api.getDataAsync(url)
        console.log(`this is the result from the getsaveduser function`, result);
        return result;
    }catch(e){
        console.log(e);
    }


}


let updateUser = async (user) => {

    console.log(`this is the user to be saved`, user);

    const url = `${api.BASE_URL}/user/update`;

    console.log(JSON.stringify(user));

    const init = api.fetchInit('PUT', JSON.stringify(user));

    try{
        const result = await api.getDataAsync(url, init)
        console.log(`this is the result from the post request`, result);
        return result
    }catch(e){
        console.log(e);
    }


}


export {
    saveUser, getSavedUser, updateUser
}