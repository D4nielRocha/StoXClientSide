import * as url from './generalData/fetchData.js';
import * as stoxData from './accountSection/stoxData.js';
import { displayUser } from './login/login.js';
import { auth0WebAuth, auth0Authentication } from './auth/auth0-variables.js';
import { getAccessToken } from './auth/jwtAuth.js'
// import { saveUser } from './accountSection/stoxData.js'




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

async function fillStoxModal(){

    // console.log(this.id);
    const result = await url.getDataAsync(`${url.BASE_URL}/myaccount/${this.id}`)

    displaySingleStox(result);

}


async function deleteStox(){

    const result = await stoxData.deleteStox(this.id);
    location.reload();

}





let displayStox = (data) => {

    let author = sessionStorage.getItem('nickname');
    
    const stoxs = data.map( item => {


    let stox =  ` <div class="stox-item col-2">
                    <div class="stox-text">
                        <h4>${item.asset1_name} <span>X</span> ${item.asset2_name}</h4>
                        <p>Created by: <span id="author">${author}</span><br>${item._date}</p>
                    </div>

                    <span id="X">X</span>
                    
                    <div id="buttons"> 
                        <button class="btn btn-sm btn-primary seeMoreButton" data-bs-toggle="modal" data-bs-target="#stoxDetailsModal" type="button" id="${item._id}">See More</button>
                        <button class="btn btn-sm btn-danger deleteButton"  id="${item._id}" type="button">Delete</button>            
                    </div>  
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <polygon fill="rgb(255,255,255)" points="0,100 100,0 100,100"/>
                            </svg>    
                </div> 
                
            `
        return stox;

    })
    
    document.getElementById('stoxs').innerHTML = stoxs.join('');


    const deleteBtn = document.getElementsByClassName('deleteButton');
    const seeMoreBtn = document.getElementsByClassName('seeMoreButton');
    // const id = document.getElementById('_id').value;
    // const myModal = document.getElementById('stoxDetailsModal');
    // const closeModalBtn = document.getElementById('closeStoxModal');
    // const author = document.getElementById('author').InnerText;

    for(let i = 0; i <= deleteBtn.length; i++){
        deleteBtn[i].addEventListener('click', deleteStox);
        console.log('added event listenert to seemorebtn');
        seeMoreBtn[i].addEventListener('click', fillStoxModal)
    }
}




let displaySingleStox = async (data) => {

    document.getElementById('stoxDetails').innerHTML = `${data.asset1_name} <span>X</span> ${data.asset2_name}`;

    let author = data.author.substr(0, data.author.indexOf('@'));
    
    document.getElementById('modalBody').innerHTML = ` <div class="stox-item text-center" id="stoxDetails">
                                                            <p>Created by: <span id="author">${author}</span> on ${data._date}</p>
                                                            <div class="row stox-content">
                                                                <div class="col-6">
                                                                    <p><span>Closing Price</span> <br> $${data.asset1_closing.toFixed(2)}</p>
                                                                    <p><span>Amount Invested</span> <br>$${data.asset1_amount.toFixed(2)}</p>
                                                                    <p><span>Price at buy</span> <br>$${data.asset1_price.toFixed(2)}</p>
                                                                    <p><span>Shares:</span> <br>${data.asset1_shares}</p>
                                                                </div>
                                                                <div class="col-6">
                                                                <p><span>Closing Price</span> <br> $${data.asset2_closing.toFixed(2)}</p>
                                                                <p><span>Amount Invested</span> <br>$${data.asset2_amount.toFixed(2)}</p>
                                                                <p><span>Price at buy</span> <br>$${data.asset2_price.toFixed(2)}</p>
                                                                <p><span>Shares</span> <br>${data.asset2_shares}</p>
                                                                <input type="hidden" name="_id" id="_id" value="${data._id}">
                                                                </div>
                                                                <div class="col-12" id="comment">
                                                                <span>Comment</span><br>
                                                                    <p>${data.comment}</p>
                                                                </div>
                                                            </div>     
                                                        </div> 
                                                        `

}




window.addEventListener('load', () => {
    let author = sessionStorage.getItem('email');
    console.log(author);
    if(!author){
        document.getElementById('loginBtn').click();
    } else {
        document.getElementById('profileBtn').innerText = `${author}`;
        getUserStox(author);
    }

    if(sessionStorage.getItem('email') == "d4niel_rocha@icloud.com"){
        document.getElementById('adminButton').classList.remove('d-none');
    }  
   
});


export {

    displayStox,
    getUserStox
}




{/* <div class="row stox-content">
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
                </div> */}