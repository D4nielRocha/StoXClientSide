import * as url from './url.js'

let text = document.querySelector('#inputText');
const tableDiv = document.getElementById('tableBody');
const newsDiv = document.getElementById('displayNews');


window.onload = () => {
        getDataAsync();

}   
        
// Function to fetch url and get data parsed 
async function getDataAsync(){

    if(!localStorage.getItem('news') || !localStorage.getItem('table') || !localStorage.getItem('slider') || !localStorage.getItem('chart')){
        
        try{
            
            const news = fetch(url.NEWS_API);
            const table = fetch(url.trendURL, url.headers);
            const trending = fetch(url.trendURL, url.headers);
            const spChart = fetch(url.urlCharts, url.headers);
            const results = Promise.all([news, table,trending,spChart]).then( async ([news, table, trending, spChart]) => {
                const newsJson = await news.json();
                const tableJson = await table.json();
                const trendingJson = await trending.json();
                const chartJson = await spChart.json();
                return [newsJson, tableJson, trendingJson, chartJson];
            }).then( dataApi => {
                localStorage.setItem('slider', JSON.stringify(dataApi[2].finance.result[0].quotes));
                localStorage.setItem('news', JSON.stringify(dataApi[0].articles));
                localStorage.setItem('table', JSON.stringify(dataApi[1].finance.result[0].quotes));   
                localStorage.setItem('chart', JSON.stringify(dataApi[3].result[0].timestamp));   
            })

            let newsLocal = JSON.parse(localStorage.getItem('news'));
            let tableLocal = JSON.parse(localStorage.getItem('table'));
            let trendingSlider = JSON.parse(localStorage.getItem('slider'));
            let chart = JSON.parse(localStorage.getItem('chart'));
            console.log(chart);

            displayNews(newsLocal);
            createIndexYahooTable(tableLocal);
            populateSlider(trendingSlider)
            createChart(chart.chart.result[0].timestamp);
            negativeNumber();

            }catch(err){
                console.log(err);
            }
    }else {

        let newsLocal = JSON.parse(localStorage.getItem('news'));
        let tableLocal = JSON.parse(localStorage.getItem('table'));
        let trendingSlider = JSON.parse(localStorage.getItem('slider'));
        let chart = JSON.parse(localStorage.getItem('chart'));
        console.log(chart);


        displayNews(newsLocal);
        createIndexYahooTable(tableLocal);
        populateSlider(trendingSlider);
        createChart(chart.chart.result[0]);
        negativeNumber();

        console.log('LocalStorage is already Up To Date!');
    }

  
}



//Add Red Color to negative numbers 
async function negativeNumber(){

    let array = [];

    let table = document.querySelectorAll(`#tableBody > tr`);

    for(let i = 1; i < table.length; i++){
            let row = document.querySelectorAll(`#tableBody > tr:nth-child(${i})`);
            array.push(row[0]);
            // console.log(array)
    }

    
    console.log(array);
    for(let j = 0; j < array.length; j++){
        let percentage = array[j].cells[4];
        console.log(percentage.innerText);
        if(Number(percentage.innerText) < 0){
            percentage.style.color = "red";
        console.log(percentage.innerText);
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
                                    <div class="news-image col-3">
                                    <img src="${data[i].urlToImage}" alt="${data[i].title.slice(0,15)}">
                                    </div>
                                    <div class="news-content col-9">
                                        <a href="${data[i].url}">${data[i].title}</a>
                                        <hr class="my-2">
                                    </div>
                                </div>
                                <hr>`
    } 



};


function createIndexYahooTable(tableData){ 

    
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



function createChart(data){

    
    let timestamp= [];
    let close = []; 
    let xAxys;
   

    data.timestamp.forEach( time => {
        xAxys = getTime(time);
        timestamp.push(xAxys);
    })

    data.indicators.quote[0].close.forEach( price => {
        close.push(Number(price.toFixed(0)));
    })

    const ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamp,
            datasets: [{
                label: 'SP-500',
                data: close,
                backgroundColor: [
                    'rgba(255, 255, 255, 1)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            legend: {
                labels: {
                    boxWidth: 0
                }
            },
            elements: {
                point: {
                    radius: 0
                }
            },
            scales: {
                xAxes: [{
                  display: false,
                  gridLines: {
                    display: false
                  },
                  scaleLabel: {
                    display: false
                  }
                }],
                yAxes: [{
                  display: true,
                  gridLines: {
                    display: false
                  },
                  scaleLabel: {
                    display: true                  }
                }]
              },
            responsive: true,
        }
    });

    


    console.log(myChart.data.datasets[0].data);


   




}





//===========================CHART =======================================




function getTime(data){

    let dateObj = new Date(data); 
 
    // Get hours from the timestamp 
    let hours = dateObj.getUTCHours(); 
     
    // Get minutes part from the timestamp 
    let minutes = dateObj.getUTCMinutes(); 
     
    // Get seconds part from the timestamp 
    // let seconds = dateObj.getUTCSeconds(); 
     
    return          hours.toString().padStart(2, '0') + ':' +  
                    minutes.toString().padStart(2, '0') 
                    // seconds.toString().padStart(2, '0'); 

}









