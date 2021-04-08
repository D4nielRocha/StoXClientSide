import {Stox} from '../js/model/stoxModel.js';
import * as dataFetch from '../js/fetchData.js';
import * as url from './url.js'
import * as formEvent from './formEvents/form.js';

// get elements 
const leftInput = document.getElementById('left-input');
const rightInput = document.getElementById('right-input');
const leftResult = document.getElementById('left-result');
const rightResult = document.getElementById('right-result');
const rightBtn = document.getElementById('right-button');
const leftBtn = document.getElementById('left-button');
const leftRegion = document.getElementById('left-region');
const rightRegion = document.getElementById('right-region');


// console.log(leftInput);

//functin to fetch data from API 
const fetchData = async (ticker, side, region = '') => {
    let id;
    try{
      const dailyData = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}${region}&apikey=${url.ALPHA_API_KEY}`);
      const companySummary = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${url.ALPHA_API_KEY}`);
      const dailyDataJson = await dailyData.json();
      const companySummaryJson = await companySummary.json();
       //Access Key values in json object 
       let fData = dailyDataJson['Time Series (Daily)'];
       let data = dailyDataJson['Meta Data'];
       //Convert objects into Array
       fData = Object.values(fData)[0];
       data = Object.values(data);
       let summary = Object.values(companySummaryJson);
      //  console.log(`this is the data`, data[1], data[2]);
      console.log(summary);
       //Convert first key of financial data object into Array
       let financeArray = Object.values(fData);

    if(side == 'left'){
        id = 1; 
        console.log(`this is the financeArray`,financeArray);
        leftResult.innerHTML = displayResult(financeArray, data, id);
        formEvent.prepareSaveForm(financeArray, data, id);
        if(region == ''){
          leftResult.innerHTML += displaySummary(summary); 
        }
    } else if( side == 'right') {
        id = 2;
        // console.log(json);
        rightResult.innerHTML = displayResult(financeArray, data, id);
        formEvent.prepareSaveForm(financeArray, data, id);  
        if(region == ''){
          rightResult.innerHTML += displaySummary(summary); 
        }
    }}catch(err){
        console.log('ERRORRRRRR' + err);
    };
}



const onSearchLeft = (value, region = '') => {
  console.log(value, region);
    // console.log(event.target.value);
    fetchData(value, 'left', region);
}

const onSearchRight = (value, region = '') => {
  console.log(value, region);

    // console.log(event.target.value);
    fetchData(value, 'right', region);
}


//event listener with debounce function
rightBtn.addEventListener('click', () => {
  if(rightRegion.value == "US"){
    onSearchRight(rightInput.value.toUpperCase());
  } else if (rightRegion.value == "SAO"){
    onSearchRight(rightInput.value.toUpperCase(), '.SAO');
  } else if (rightRegion.value == "LON"){
    onSearchRight(rightInput.value.toUpperCase(), '.LON');
  } else {
    rightRegion.focus();
    alert('Please enter a valid Region');
  }
})

leftBtn.addEventListener('click', () => {
  if(leftRegion.value == 'US'){
    onSearchLeft(leftInput.value.toUpperCase());
  } else if (leftRegion.value == "SAO"){
    onSearchLeft(leftInput.value.toUpperCase(), '.SAO');
  } else if (leftRegion.value == "LON"){
    onSearchLeft(leftInput.value.toUpperCase(), '.LON');
  } else {
    leftRegion.focus();
    alert('Please enter a valid Region');
  }
})


const displayResult = (data, meta, id) => {
    console.log(data);
    return `<h1 id="asset${id}">${meta[1]}</h1>
                  <h1>${data[2]}</h1>
                  <div class="card text-black bg-light mb-3">
                  <div class="card-body">
                    <h5 class="card-title">VOLUME</h5>
                    <p class="card-text">
                      $${data[5]}
                    </p>
                  </div>
                </div>
                <div class="card text-white bg-dark mb-3">
                  <div class="card-body">
                    <h5 class="card-title">OPEN</h5>
                    <p class="card-text">
                      ${data[0]}
                    </p>
                  </div>
                </div>
                <div class="card text-white bg-dark mb-3">
                  <div class="card-body">
                    <h5 class="card-title">CLOSE</h5>
                    <p class="card-text">
                      ${data[4]}
                    </p>
                  </div>
                </div>
                <div class="card text-white bg-dark mb-3">
                  <div class="card-body">
                    <h5 class="card-title">HIGH</h5>
                    <p class="card-text">
                      ${data[2]}
                    </p>
                  </div>
                </div>
                <div class="card text-white bg-dark mb-3">
                  <div class="card-body">
                    <h5 class="card-title">LOW</h5>
                    <p class="card-text">
                      ${data[3]}
                    </p>
                  </div>
                </div>`
}




let saveStox = async () => {

  let newStox = formEvent.getFormValues();

  if(newStox){

    const result = await createNewStox(newStox);
    console.log(result);
    formEvent.resetSearch();
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




let displaySummary = (data) => {
  console.log(data);
  return `<div class="card text-black bg-light mb-3">
            <div class="card-body">
              <h5 class="card-title">Address</h5>
              <p class="card-text">
                ${data[10]}
              </p>
            </div>
          </div>`

}










//Calls saveStox function to make a POST request and create a new StoX 
document.getElementById('saveStox').addEventListener('click', () => {
  saveStox();
})


//Calls resetSearch function to clear faceoff page input fields and content
document.getElementById('resetContent').addEventListener('click', () => {
  formEvent.resetSearch();
})


//=============FORM CONTENT EVENTS ====================================





export {
fetchData,
onSearchLeft,
onSearchRight,
displayResult,
saveStox,
leftInput,
rightInput,
leftResult,
rightResult
}