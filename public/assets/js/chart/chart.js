//===========================CHART =======================================



function createChart(data){
    
    let timestamp= [];
    let close = []; 
    let xAxys;
   

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
        close.push(Number(price.toFixed(0)));
    })

    const ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamp,
            datasets: [{
                label: 'Daily SP-500 Chart',
                data: close,
                backgroundColor: [
                    'rgba(255, 255, 255, 1)',
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