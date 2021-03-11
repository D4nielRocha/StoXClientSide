// get elements 
const leftInput = document.getElementById('left-input');
const rightInput = document.getElementById('right-input');
const leftResult = document.getElementById('left-result');
const rightResult = document.getElementById('right-result');
console.log(leftInput);

//functin to fetch data from API 
const fetchData = (ticker, side) => {

    axios.get(`http://api.marketstack.com/v1/eod?access_key=8ab519ff412561125ca0729e24df2b3c&symbols=${ticker}`).then( res => {
        // console.log(res.data.data);
    if(side == 'left'){
        id = 1; 
        leftResult.innerHTML = displayResult(res.data.data, id);  
    } else if( side == 'right') {
        id = 2;
        rightResult.innerHTML = displayResult(res.data.data, id);
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



let saveStox = () => {

  let asset1 = document.getElementById('asset1').innerText;
  let asset2 = document.getElementById('asset2').innerText;

  // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  axios({
    method: 'post',
    url: 'http://localhost:8080/faceoff',
    data: {
      "asset1": asset1,
      "asset2": asset2
    },
    headers: {
      "Access-control-Allow-Origin": "*"
    }  
  }).then( res => {
    console.log(res)
  }).catch( err => {
    console.log(err);
  })



}