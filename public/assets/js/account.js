import * as url from './fetchData.js';
import * as stoxData from './dataAccess/stoxData.js'; 



let getUserStox = async (author) => {

    try{
        const result = await url.getDataAsync(`${url.BASE_URL}/faceoff/${author}`);

        // const json = await result.json();
        console.log(result);
        displayStox(result);

    }catch(e){
        console.log(e);
    }
}


async function deleteStox(){

    const result = await stoxData.deleteStox(this.id);
    location.reload();

}





let displayStox = (data) => {

    
    const stoxs = data.map( item => {

    let stox =  ` <div class="stox-item col-2">
                <h4>${item.asset1_name} X ${item.asset2_name}</h4>
                <p>Created by: <span id="author">${item.author}</span> on ${item._date}</p>
                <div class="row stox-content">
                    <div class="col-6">
                        <p>Closing Price <br> $${item.asset1_closing.toFixed(2)}</p>
                        <p>Amount Invested <br>$${item.asset1_amount.toFixed(2)}</p>
                        <p>Price at buy <br>$${item.asset1_price.toFixed(2)}</p>
                        <p>Shares: <br>${item.asset1_shares}</p>
                    </div>
                    <div class="col-6">
                    <p>Closing Price <br> $${item.asset2_closing.toFixed(2)}</p>
                    <p>Amount Invested <br>$${item.asset2_amount.toFixed(2)}</p>
                    <p>Price at buy <br>$${item.asset2_price.toFixed(2)}</p>
                    <p>Shares: <br>${item.asset2_shares}</p>
                    <input type="hidden" name="_id" id="_id" value="${item._id}">
                    </div>
                </div>
                    <div id="buttons"> 
                        <button class="btn btn-sm btn-primary seeMoreButton" type="button">See More</button>
                        <button class="btn btn-sm btn-danger deleteButton" id="${item._id}" type="button">Delete</button>            
                    </div>      
                </div> 
            `
        return stox;
    })

    document.getElementById('stoxs').innerHTML = stoxs.join('');

    const deleteBtn = document.getElementsByClassName('deleteButton');
    const seeMoreBtn = document.getElementsByClassName('seeMoreButton');
    const id = document.getElementById('_id').value;
    // const author = document.getElementById('author').InnerText;

    for(let i = 0; i <= deleteBtn.length; i++){
        deleteBtn[i].addEventListener('click', deleteStox);
    }

}


window.addEventListener('load', () => {
    getUserStox('Daniel');
});


export {

    displayStox,
    getUserStox
}
