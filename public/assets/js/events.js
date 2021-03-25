import {Stox} from '../js/model/stoxModel.js';
import * as dataFetch from '../js/fetchData.js';

// get elements 
const leftInput = document.getElementById('left-input');
const rightInput = document.getElementById('right-input');
const leftResult = document.getElementById('left-result');
const rightResult = document.getElementById('right-result');


// console.log(leftInput);

//functin to fetch data from API 
const fetchData = (ticker, side) => {
    let id;
    axios.get(`http://api.marketstack.com/v1/eod?access_key=8ab519ff412561125ca0729e24df2b3c&symbols=${ticker}`).then( res => {
        // console.log(res.data.data);
    if(side == 'left'){
        id = 1; 
        leftResult.innerHTML = displayResult(res.data.data, id);
        prepareSaveForm(res.data.data, id);  
    } else if( side == 'right') {
        id = 2;
        rightResult.innerHTML = displayResult(res.data.data, id);
        prepareSaveForm(res.data.data, id);  
    }
         
    }).catch( err => {
        console.log('ERRORRRRRR' + err);
    });

}


//debouce function to delay fetch function until user stops typing 

//debounce
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout( () => {
            func.apply(null, args);
        }, delay);
    }
};


const onSearchLeft = event => {
    // console.log(event.target.value);
    fetchData(event.target.value, 'left' );
}

const onSearchRight = event => {
    // console.log(event.target.value);
    fetchData(event.target.value, 'right' );
}


//event listener with debounce function
leftInput.addEventListener('input', debounce(onSearchLeft, 1000));
rightInput.addEventListener('input', debounce(onSearchRight, 1000));


const displayResult = (data, id) => {
    console.log(data);
    return `<h1 id="asset${id}">${data[0].symbol}</h1>
                  <h1>${data[0].date.substring(0,10)}</h1>
                  <div class="card text-white bg-dark mb-3">
                  <div class="card-body">
                    <h5 class="card-title">VOLUME</h5>
                    <p class="card-text">
                      ${data[0].volume}
                    </p>
                  </div>
                </div>
                <div class="card text-white bg-dark mb-3">
                  <div class="card-body">
                    <h5 class="card-title">OPEN</h5>
                    <p class="card-text">
                      ${data[0].open}
                    </p>
                  </div>
                </div>
                <div class="card text-white bg-dark mb-3">
                  <div class="card-body">
                    <h5 class="card-title">CLOSE</h5>
                    <p class="card-text">
                      ${data[0].close}
                    </p>
                  </div>
                </div>
                <div class="card text-white bg-dark mb-3">
                  <div class="card-body">
                    <h5 class="card-title">HIGH</h5>
                    <p class="card-text">
                      ${data[0].high}
                    </p>
                  </div>
                </div>
                <div class="card text-white bg-dark mb-3">
                  <div class="card-body">
                    <h5 class="card-title">LOW</h5>
                    <p class="card-text">
                      ${data[0].low}
                    </p>
                  </div>
                </div>`
}


//update form with data from searched assets
function prepareSaveForm(data,id){

  document.getElementById(`asset${id}_name`).value = data[0].symbol;
  document.getElementById(`asset${id}_closing`).value = data[0].close;

}

//resets stox search
let resetSearch = () => {
  leftInput.value = '';
  rightInput.value = '';
  leftResult.innerHTML = '';
  rightResult.innerHTML = '';
}



//creates new stox Object 

let getFormValues = () => {

    let time = Date.now();
    let today = new Date(time);
    let date = today.toISOString().slice(0,10);
    let author = 'Daniel';

  return new Stox(
      document.getElementById('_id').value,
      document.getElementById('asset1_name').value,
      document.getElementById('asset1_invested').checked,
      document.getElementById('asset1_amount').value,
      document.getElementById('asset1_price').value,
      document.getElementById('asset1_shares').value,
      document.getElementById('asset1_closing').value,
      document.getElementById('asset2_name').value,
      document.getElementById('asset2_invested').checked,
      document.getElementById('asset2_amount').value,
      document.getElementById('asset2_price').value,
      document.getElementById('asset2_shares').value,
      document.getElementById('asset2_closing').value,
      document.getElementById('comment').value,
      date,
      author
  )

}



let saveStox = async () => {

  let newStox = getFormValues();

  if(newStox){

    const result = await createNewStox(newStox);
    console.log(result);
    resetSearch();
  }

  document.getElementById('productForm').reset()


}


let createNewStox = async (stox) => {

  const url = `http://localhost:8080/faceoff`;

  let httpMethod = 'POST';

  if(stox._id > 0){
    httpMethod = 'PUT';
  }

  let request = dataFetch.fetchInit(httpMethod, JSON.stringify(stox));

  try{
    const response = await fetch(url,request);
    const json = await response.json();

    return true;

  }catch(err){
    console.log(err);
    return err;
  }

}






//=============FORM CONTENT EVENTS ====================================

const asset1Checkbox = document.getElementById('asset1_invested');
const asset2Checkbox = document.getElementById('asset2_invested');

asset1Checkbox.addEventListener('change', invested);
asset2Checkbox.addEventListener('change', invested);



function invested(){

  let isInvested;
  let assetPrice;
  let assetAmount;
  let shares;


    //cheks if user is invested in asset1
    if(this.id == 'asset1_invested'){

        isInvested = document.getElementsByClassName('ifChecked1');
        assetAmount = document.getElementById('asset1_amount');
        assetPrice = document.getElementById('asset1_price');
        shares = document.getElementById('asset1_shares');

        if(this.checked){
          isInvested.forEach( item => {
            item.classList.remove('d-none');
            item.addEventListener('input', () => {
              let total = assetAmount.value / assetPrice.value;
              shares.value = total.toFixed(2);
        });
      });

        }else{
          isInvested.forEach( item => {
            item.classList.add('d-none');
          })
        }

    
        //cheks if user is invested in asset2
    } else {
        isInvested = document.getElementsByClassName('ifChecked2');
        assetAmount = document.getElementById('asset2_amount');
        assetPrice = document.getElementById('asset2_price');
        shares = document.getElementById('asset2_shares')
      //displays input field
        if(this.checked){
          isInvested.forEach( item => {
            item.classList.remove('d-none');
            item.addEventListener('input', () => {
              let total = assetAmount.value / assetPrice.value;
              shares.value = total.toFixed(2);
            })
          });
      
        }else{
          isInvested.forEach( item => {
            item.classList.add('d-none');
          })
        }
    }

}

//Calls saveStox function to make a POST request and create a new StoX 
document.getElementById('saveStox').addEventListener('click', () => {
  saveStox();
})


//Calls resetSearch function to clear faceoff page input fields and content
document.getElementById('resetContent').addEventListener('click', () => {
  resetSearch();
})


//=============FORM CONTENT EVENTS ====================================





export {

fetchData,
debounce,
onSearchLeft,
onSearchRight,
displayResult,
prepareSaveForm,
resetSearch,
getFormValues,
saveStox,
invested
}