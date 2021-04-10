import * as api from '../generalData/fetchData.js';

let deleteStox = async (id) => {

    console.log(id);

    const url = `${api.BASE_URL}/myaccount/${id}`;

    const init = api.fetchInit('DELETE');

    try{
        const result = await api.getDataAsync(url, init)
        console.log(result);
    }catch(e){
        console.log(e);
    }
}


export  {
    deleteStox
}