//===========================CHART =======================================



function createChart(data, id = '', ticker = 'SP-500'){
    
    let timestamp= [];
    let close = []; 
    let xAxys;
   
    const ctx = document.getElementById(`myChart${id}`).getContext('2d');
    

    data.timestamp.forEach( time => {
        // console.log(time);
        xAxys = getDate(time);
        if(xAxys.slice(xAxys.length-1) == '/'){
            xAxys = xAxys.slice(0, xAxys.length-1);
        }
        // xAxys = xAxys.replace('/', '-');

        // console.log(xAxys);
        timestamp.push(xAxys);
    })

    data.indicators.quote[0].close.forEach( price => {
        close.push(Number(price.toFixed(2)));
    })
    

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamp,
            datasets: [{
                label: `Daily ${ticker} Chart`,
                data: close,
                backgroundColor: [
                    'rgba(255, 255, 255, 0)',
                ],
                borderColor: [
                    'rgb(255, 115, 0)',
                ],
                borderWidth: 3
            }]
        },
        options: {
            animation: {
                easing: "easeInOutQuint"
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                bodyFontColor: 'white',
                titleFontSize: 14,
                bodyFontSize: 14,
                displayColors: false,
                titleAlign: 'center',
                bodySpacing: 10,
                titleSpacing: 8

            },
            hover: {
                mode: 'index',
                intersect: false
            },  
            legend: {
                labels: {
                    fontSize: 25,
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
                  display: true,
                  gridLines: {
                    display: false
                  },
                  scaleLabel: {
                    display: true
                  }
                }],
                yAxes: [{
                  display: true,
                  position: 'right',
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
}



function getDate(data){

    const dateObject = new Date(data * 1000);

    const finalDate = dateObject.toLocaleString();

    const day = finalDate.slice(0,1);

    const month = finalDate.slice(2,4);
     
    return          `${day}/${month}`;

}





export {
    createChart 
}