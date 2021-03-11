// const chartProperties = {
//     width: 500,
//     height: 400,
//     timeScale: {
//         timeVisible:true,
//         secondsVisible: false
//     }
// }



// const chartDiv = document.getElementById('charts');
// const chart = LightweightCharts.createChart(chartDiv, chartProperties);
// const candleSeries = chart.addCandlestickSeries();

// try
// {
//     fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data?symbol=%5EGSPC&region=US", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "8f6042bc97msha003fe69e6bb4f4p105aabjsna64480f53e4c",
// 		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
// 	}
// }).then( res => res.json()).then( data => {
//     const cdata = data.prices.map( d => {
//         return {time:d[2]/1000,open:parseFloat(d[5]),high:parseFloat(d[3]),low:parseFloat(d[4]),close:parseFloat(d[1])};

//     });
//     candleSeries.setData(cdata);
// })
// }catch(err){
//     console.log(err);
// }

// const log = console.log;

// const chartProperties = {
//   width:350,
//   height:500,
//   timeScale:{
//     timeVisible:true,
//     secondsVisible:false,
//   }
// }

// const domElement = document.getElementById('chart');
// const chart = LightweightCharts.createChart(domElement,chartProperties);
// const candleSeries = chart.addCandlestickSeries();


// fetch(`https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1d&limit=1000`)
//   .then(res => res.json())
//   .then(data => {
//     const cdata = data.map(d => {
//       return {time:d[0]/1000,open:parseFloat(d[1]),high:parseFloat(d[2]),low:parseFloat(d[3]),close:parseFloat(d[4])}
//     });
//     candleSeries.setData(cdata);
//   })
//   .catch(err => log(err))