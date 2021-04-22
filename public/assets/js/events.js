import {Stox} from '../js/model/stoxModel.js';
import * as dataFetch from './generalData/fetchData.js';
import * as url from './generalData/url.js'
import * as formEvent from './formEvents/form.js';
import { displayUser } from './login/login.js';
import { auth0WebAuth, auth0Authentication } from './auth/auth0-variables.js';
import * as chartJS from './chart/chart.js';
import { checkSession, checkStatus } from './auth/jwtAuth.js';




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
    let companySummary;
    let chart;
    let companySummaryJson;
    let chartJson;
    let chartData;


    try{
      //Fetch Data
      const dailyData = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}${region}&apikey=${url.ALPHA_API_KEY}`);

      if(region == ''){
        companySummary = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${url.ALPHA_API_KEY}`);
        chart = await fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&symbol=${ticker}&range=1mo&region=US`, url.headers);
        companySummaryJson = await companySummary.json();
        chartJson = await chart.json();
        chartData = chartJson.chart.result[0];
      }
       

      //Parsing Data (JSON)
      const dailyDataJson = await dailyData.json();
       let fData = dailyDataJson['Time Series (Daily)'];
       let data = dailyDataJson['Meta Data'];
       
       //Convert objects into Array
       fData = Object.values(fData)[0];
       data = Object.values(data);

       //Convert first key of financial data object into Array
       let financeArray = Object.values(fData);

    if(side == 'left'){
        id = 1;
        if(region == ''){
          leftResult.innerHTML = displayResult(financeArray, data, id, 'USD');
        } else if (region == '.SAO'){
          leftResult.innerHTML = displayResult(financeArray, data, id, 'R$');
        } else if (region == '.LON'){
          leftResult.innerHTML = displayResult(financeArray, data, id, '£');
        }
        backgroundComparison(id);
        formEvent.prepareSaveForm(financeArray, data, id);
        if(region == ''){
          leftResult.innerHTML += createSummaryButton(id); 
          overviewModal(companySummaryJson, id);
          leftResult.innerHTML += `<canvas id="myChart${id}"></canvas>`
          chartJS.createChart(chartData, id, ticker);
        }
    } else if( side == 'right') {
        id = 2;
        if(region == ''){
          rightResult.innerHTML = displayResult(financeArray, data, id, 'USD');
        } else if (region == '.SAO'){
          rightResult.innerHTML = displayResult(financeArray, data, id, 'R$');
        } else if (region == '.LON'){
          rightResult.innerHTML = displayResult(financeArray, data, id, '£');
        }
        backgroundComparison(id);
        formEvent.prepareSaveForm(financeArray, data, id);  
          if(region == ''){
            rightResult.innerHTML += createSummaryButton(id);
            overviewModal(companySummaryJson, id);
            rightResult.innerHTML += `<canvas id="myChart${id}"></canvas>`
            chartJS.createChart(chartData, id, ticker);
          }
    }}catch(err){
        console.log('ERRORRRRRR' + err);
    };
}



const onSearchLeft = (value, region = '') => {
  // console.log(value, region);
    // console.log(event.target.value);
    fetchData(value, 'left', region);
}

const onSearchRight = (value, region = '') => {
  // console.log(value, region);

    // console.log(event.target.value);
    fetchData(value, 'right', region);
}


//event listener with debounce function
rightBtn.addEventListener('click', () => {
    showSpinner(rightResult);
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
  showSpinner(leftResult);
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


const displayResult = (data, meta, id, currency ) => {
    hideSpinner();
    console.log(data);
    return `<h1 id="asset${id}">${meta[1]}</h1>
                  <h1>${meta[2]}</h1>
                  <div class="card text-black bg-stox mb-3">
                  <div class="card-body">
                    <h5 class="card-title">DAILY VOLUME</h5>
                    <p class="card-text">
                      ${data[5]}
                    </p>
                  </div>
                </div>
                <div class="card text-black bg-stox mb-3">
                  <div class="card-body">
                    <h5 class="card-title">DAILY OPEN in ${currency}</h5>
                    <p class="card-text" id="open${id}">
                      ${data[0]}
                    </p>
                  </div>
                </div>
                <div class="card text-black mb-3" id="closeDiv${id}">
                  <div class="card-body">
                    <h5 class="card-title">DAILY CLOSE in ${currency}</h5>
                    <p class="card-text" id="close${id}">
                      ${data[4]}
                    </p>
                  </div>
                </div>
                <div class="card text-black bg-stox mb-3">
                  <div class="card-body">
                    <h5 class="card-title">INTRADAY - HIGH in ${currency}</h5>
                    <p class="card-text">
                      ${data[2]}
                    </p>
                  </div>
                </div>
                <div class="card text-black bg-stox mb-3">
                  <div class="card-body">
                    <h5 class="card-title">INTRADAY - LOW in ${currency}</h5>
                    <p class="card-text">
                      ${data[3]}
                    </p>
                  </div>
                </div>`

}


let backgroundComparison = (id) => {

  const open = document.getElementById(`open${id}`);
  const close = document.getElementById(`close${id}`);
  const closeDiv = document.getElementById(`closeDiv${id}`);

  console.log(`this is the open.value`, open.innerText);

  if(close.innerText < open.innerText){
    // closeDiv.classList.remove('bg-light') 
    closeDiv.classList.add('bg-danger') 
  } else if (close.innerText > open.innerText){
    // closeDiv.classList.remove('bg-light') 
    closeDiv.classList.add('bg-success');
  } else {
    closeDiv.classList.add(`bg-light`);
  }
}



let saveStox = async () => {

  if(checkStatus()){
    let newStox = formEvent.getFormValues();

    if(newStox){
  
      const result = await createNewStox(newStox);
      console.log(result);
      alert('StoX Saved. Go to the account page to check out your stox');
      formEvent.resetSearch();
    }
  
    document.getElementById('productForm').reset()
  } else {
    alert('You need to be logged in to do that!');
  }
}


let createNewStox = async (stox) => {

  const url = `http://localhost:8080/faceoff`
  // const url = `${dataFetch.BASE_URL}/faceoff`;

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




let createSummaryButton = (id) => {
  console.log(id);
  return `<button type="button" id="financialBtn" class="btn btn-md btn-outline-dark" data-bs-toggle="modal" data-bs-target="#financialOverview${id}">Financial Overview</button>
          `
}
/* <canvas id="myChart${id}"></canvas> */


function overviewModal(data, id){
    const title = document.getElementById(`financialOverviewTitle${id}`);
    const body = document.getElementById(`financialOverviewBody${id}`);
    const table = document.getElementById(`financialOverviewTable${id}`);
    title.innerText = '';
    body.innerHTML = '';
    let object = Object.entries(data);
    title.innerText = object[2][1].toUpperCase();
    table.innerHTML = `<table class="table table-dark">
    <thead>
      <tr>
        <th scope="col">Financial</th>
        <th scope="col">Value</th>
      </tr>
    </thead><br>
    <tbody id="tableBody${id}"></tbody>
  </table>`
    // for(let [key, value] of Object.entries(data)){
    //   body.innerHTML += `<p>${key}: ${value}</p>`
    // }

    for(let i = 0; i < 4; i++){
      let [key, value] = object[i];
      body.innerHTML += `<p><strong>${key}</strong>: ${value}</p>`
    }

    for(let i = 4; i < object.length; i++){
      let tableBody = document.getElementById(`tableBody${id}`);
      let [key, value] = object[i];
      tableBody.innerHTML += `<tr>
                                <td>${key}</td>
                                <td>${value}</td>
                              </tr>`
    }
};

let showSpinner = (element) => {
  element.innerHTML = `<div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>`
}

let hideSpinner = () => {
  document.querySelector('.spinner-border').style.display = 'none';
}









//Calls saveStox function to make a POST request and create a new StoX 
document.getElementById('saveStox').addEventListener('click', () => {
    saveStox(); 
})


//Calls resetSearch function to clear faceoff page input fields and content
document.getElementById('resetContent').addEventListener('click', () => {
  formEvent.resetSearch();
})

window.addEventListener('load', ()=>{
  document.getElementById('profileBtn').innerText = `${sessionStorage.getItem('email')}`;
})


//=============FORM CONTENT EVENTS ====================================





export {
fetchData,
onSearchLeft,
onSearchRight,
displayResult,
saveStox,
overviewModal,
leftInput,
rightInput,
leftResult,
rightResult
}



