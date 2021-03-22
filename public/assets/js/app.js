import * as url from './url.js'

let text = document.querySelector('#inputText');
const tableDiv = document.getElementById('tableBody');
const newsDiv = document.getElementById('displayNews');


window.onload = () => {
        getDataAsync();

}   
        
// Function to fetch url and get data parsed 
async function getDataAsync(){

    if(!localStorage.getItem('news') || !localStorage.getItem('table') || !localStorage.getItem('slider')){
        
        try{
            
            const news = fetch(url.NEWS_API);
            const table = fetch(url.trendURL, url.headers);
            const trending = fetch(url.trendURL, url.headers);
            const results = Promise.all([news, table,trending]).then( async ([news, table, trending]) => {
                const newsJson = await news.json();
                const tableJson = await table.json();
                const trendingJson = await trending.json();
                return [newsJson, tableJson, trendingJson];
            }).then( dataApi => {
                console.log(dataApi);
                localStorage.setItem('slider', JSON.stringify(dataApi[2].finance.result[0].quotes));
                localStorage.setItem('news', JSON.stringify(dataApi[0].articles));
                localStorage.setItem('table', JSON.stringify(dataApi[1].finance.result[0].quotes));   
            })

            let newsLocal = JSON.parse(localStorage.getItem('news'));
            let tableLocal = JSON.parse(localStorage.getItem('table'));
            let trendingSlider = JSON.parse(localStorage.getItem('slider'));

            displayNews(newsLocal);
            createIndexYahooTable(tableLocal);
            populateSlider(trendingSlider)
            negativeNumber();

            }catch(err){
                console.log(err);
            }
    }else {

        let newsLocal = JSON.parse(localStorage.getItem('news'));
        let tableLocal = JSON.parse(localStorage.getItem('table'));
        let trendingSlider = JSON.parse(localStorage.getItem('slider'));


        displayNews(newsLocal);
        createIndexYahooTable(tableLocal);
        populateSlider(trendingSlider)
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


let populateSlider = (trending) => {


    const items = trending.map( trend => {

        let item = `<div class="ticker-item">
                        <div class="ticker-title mx-2" id="ticker-title">${trend.shortName.slice(0,18)}</div>
                        <div id="inner-display">
                            <div class="ticker-price mx-2">$${trend.regularMarketPrice}</div>
                            <div class="ticker-change mx-2" id="changePercentage">${trend.regularMarketChangePercent}%</div>
                        </div>
                    </div>`

        return item;

    })
    
    document.getElementById('sliderDisplay').innerHTML = items.join('');


}



async function displayNews(data){

    const display_carousel = document.getElementById('carousel-inner');

    const news = data;

    for(let i = 1; i < 5; i++){
        const news_carousel = ` <div class="carousel-item">
        <div class="view h-100">
        <img class="d-block h-100" src="${news[i].urlToImage}"
        alt="First slide">
        <div class="mask rgba-black-strong h-100"></div>
        </div>
        <div class="carousel-caption h-100">
        <a href="${news[i].url}"><h3 class="h3-responsive">${news[i].title.slice(0,40)}</h3></a>
        <p>${news[i].description.slice(0.10)}...</p>
        </div>
    </div>` 

    display_carousel.innerHTML += news_carousel;

    }

    display_carousel.firstElementChild.classList.add('active');


};


function createIndexYahooTable(tableData){ 

    
        for(let i = 0; i < tableData.length ; i++){
            let tr = document.createElement('tr');

            if(tableData[i].regularMarketChangePercent){


            tr.innerHTML = `    <th scope="row">${tableData[i].symbol}</th>
                                <td>${tableData[i].shortName}</td>
                                <td>${tableData[i].regularMarketPrice}</td>
                                <td>${tableData[i].regularMarketChange}</td>
                                <td id="percentage${i}">${tableData[i].regularMarketChangePercent.toFixed(2)}</td>`

        tableDiv.appendChild(tr); 
        // console.log(tr);

        }   

    }

    
}




$('.carousel').carousel({
    interval: 500
});
