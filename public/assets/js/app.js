import * as url from './generalData/url.js';
import * as chartJS from './chart/chart.js';
import { displayUser } from './login/login.js';
import { auth0WebAuth, auth0Authentication } from './auth/auth0-variables.js';
import { BASE_URL } from './generalData/fetchData.js';


let text = document.querySelector('#inputText');
const tableDiv = document.getElementById('tableBody');
const newsDiv = document.getElementById('displayNews');


window.addEventListener('load', () => {

        // updateData(localStorage.getItem('dataExpiration'));

        getDataAsync();
        document.getElementById('profileBtn').innerText = `${sessionStorage.getItem('email')}`;

});   
        
// Function to fetch url and get data parsed 
async function getDataAsync(){

    // console.log('data async triggered');

    if(!localStorage.getItem('news') || !localStorage.getItem('table') || !localStorage.getItem('slider') || !localStorage.getItem('chart') || !localStorage.getItem('movers') || !localStorage.getItem('nasdaqChart') || !localStorage.getItem('dowChart')){
        
        try{
            
            const news =  fetch(url.NEWS_API);
            const table =  fetch(url.trendURL, url.headers);
            const trending =  fetch(url.trendURL, url.headers);
            const spChart =  fetch(url.urlCharts, url.headers);
            const nasdaqCharts = fetch(url.nasdaqUrl, url.headers);
            const dowCharts = fetch(url.dowUrl, url.headers);
            const movers = fetch(url.urlMovers, url.headers);
            const results = Promise.all([news, table,trending,spChart, nasdaqCharts, dowCharts, movers]).then( async ([news, table, trending, spChart, nasdaqChart, dowChart, movers]) => {
                const newsJson = await news.json();
                const tableJson = await table.json();
                const trendingJson = await trending.json();
                const chartJson = await spChart.json();
                const nasdaqJson = await nasdaqChart.json();
                const dowJson = await dowChart.json();
                const moversJson = await movers.json();
                return [newsJson, tableJson, trendingJson, chartJson, nasdaqJson, dowJson, moversJson];
            }).then( dataApi => {
                console.log(dataApi);
                localStorage.setItem('slider', JSON.stringify(dataApi[2].finance.result[0].quotes));
                localStorage.setItem('news', JSON.stringify(dataApi[0].articles));
                localStorage.setItem('table', JSON.stringify(dataApi[1].finance.result[0].quotes));   
                localStorage.setItem('chart', JSON.stringify(dataApi[3].chart.result[0])); 
                localStorage.setItem('nasdaqChart', JSON.stringify(dataApi[4].chart.result[0])); 
                localStorage.setItem('dowChart', JSON.stringify(dataApi[5].chart.result[0])); 
                localStorage.setItem('movers', JSON.stringify(dataApi[6])); 

            })

            loadData();

            }catch(err){
                console.log(err);
            }
    }else {
        loadData();
        console.log('LocalStorage is already Up To Date!');

    }

  
}



let loadData = () => {

    let newsLocal = JSON.parse(localStorage.getItem('news'));
    let tableLocal = JSON.parse(localStorage.getItem('table'));
    let trendingSlider = JSON.parse(localStorage.getItem('slider'));
    let chart = JSON.parse(localStorage.getItem('chart'));
    let nasdaq = JSON.parse(localStorage.getItem('nasdaqChart'));
    let dow = JSON.parse(localStorage.getItem('dowChart'));
    let movers = JSON.parse(localStorage.getItem('movers'));

    displayNews(newsLocal);
    createIndexYahooTable(tableLocal);
    populateSlider(trendingSlider);
    chartJS.createChart(chart, 1);
    chartJS.createChart(nasdaq, 2, 'NASDAQ');
    chartJS.createChart(dow, 3, 'DOW JONES');
    negativeNumber();
}



//Add Red Color to negative numbers 
async function negativeNumber(){

    let array = [];

    let table = document.querySelectorAll(`#tableBody > tr`);

    for(let i = 1; i <= table.length; i++){
            let row = document.querySelectorAll(`#tableBody > tr:nth-child(${i})`);
            array.push(row[0]);
    }

  
    // console.log(array);
    for(let j = 0; j <= array.length-1; j++){
        let percentage = array[j].cells[4];
        let change = array[j].cells[5];
        let previousClose = array[j].cells[2];
        let dayClose = array[j].cells[3]; 
        // console.log(percentage.innerText);
        if(Number(percentage.innerText).toFixed(2) < 0){
            percentage.style.color = "red";
            change.style.color = "red";
            
        // console.log(percentage.innerText);
        } else if (Number(percentage.innerText).toFixed(2) > 0) {
            percentage.style.color = "green";
            change.style.color = "green";

        }

        if(Number(dayClose.innerText) < Number(previousClose.innerText)){
            dayClose.style.color = "red"
        } else if (Number(dayClose.innerText) > Number(previousClose.innerText)){
            dayClose.style.color = "green"
        } 
    }
} 


let sliderNegativeChanges = (slider) => {

   for(let i = 0; i < slider.length; i++) {{
    //    console.log(Number(dailyChange[i].innerText.replace('%','')));
       if(Number(slider[i].innerText.replace('%', '')) < 0){
           slider[i].style.color = "red";
       }
   }}
}




let populateSlider = (trending) => {


    const items = trending.map( trend => {

        let item = `<div class="ticker-item">
                        <div class="ticker-title mx-2" id="ticker-title">${trend.symbol.toUpperCase()}</div>
                        <div id="inner-display">
                            <div class="ticker-price mx-2">$${trend.regularMarketPrice.toFixed(2)}</div>
                            <div class="ticker-change mx-2" id="changePercentage">${trend.regularMarketChangePercent.toFixed(1)}<span>%</span></div>
                        </div>
                    </div>`

                  
        return item;

    })
   
    
    document.getElementById('sliderDisplay').innerHTML = items.join('');

    let dailyChange = document.getElementsByClassName('ticker-change');

    sliderNegativeChanges(dailyChange);

}





async function displayNews(data){

    const newsSidebar = document.getElementById('news');


    for(let i = 0; i < data.length ;i++){
        newsSidebar.innerHTML += `<div class="news-wrapper">
                                    <div class="news-image col-5">
                                    <img src="${data[i].urlToImage}" alt="${data[i].title.slice(0,15)}">
                                    </div>
                                    <div class="news-content col-7">
                                        <a target="_blank" href="${data[i].url}">${data[i].title}</a>
                                        <hr class="my-2">
                                    </div>
                                </div>
                                `
    } 

};


function createIndexYahooTable(tableData){ 
    // console.log(tableData);
    
        for(let i = 0; i < tableData.length ; i++){
            let tr = document.createElement('tr');

            if(tableData[i].regularMarketChangePercent){


            tr.innerHTML = `    <th scope="row">${tableData[i].symbol}</th>
                                <td>${tableData[i].shortName}</td>
                                <td>${tableData[i].regularMarketPreviousClose.toFixed(2)}</td>
                                <td>${tableData[i].regularMarketPrice.toFixed(2)}</td>
                                <td>${tableData[i].regularMarketChange.toFixed(2)}</td>
                                <td id="percentage${i}">${tableData[i].regularMarketChangePercent.toFixed(2)}</td>`

        tableDiv.appendChild(tr); 
        // console.log(tr);

        }   
    }    
}


let updateData = (localExpiration) => {
    
    if(!localExpiration){
        let date = new Date();
        let expDate = new Date(date.getTime() + 60*60000);
        console.log(`this is the new expDate`, expDate);
        localStorage.setItem('dataExpiration', expDate);
    } else {
        let localExp = Date.parse(localExpiration);
        // console.log(localExp);
        let localDate = new Date(localExp);
        // console.log(localDate);
        console.log(new Date() > localDate);
        console.log(new Date(), localDate);
        if(new Date() > localDate){ 
            localStorage.clear();
            console.log(`localstorage clear!`);
        }
    }
}



const tl = gsap.timeline({defaults: {ease: 'power1.out'}});

tl.fromTo('#step1', {y: '0%'}, {x: '-110%', delay: 3, duration: 4, stagger: 0.25}), '-=2';
tl.fromTo('#step2', {x: '0%'}, {x: '-110%', delay: 4, duration: 4, stagger: 0.25}), '-=2';
tl.fromTo('#step3', {x: '0%'}, {x: '-110%', delay: 5, duration: 4, stagger: 0.25}), '-=2';
tl.fromTo('#step4', {x: '0%'}, {x: '-110%', delay: 2, duration: 4, stagger: 0.25}), '-=2';
















