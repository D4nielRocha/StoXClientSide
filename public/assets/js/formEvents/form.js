import { Stox } from '../model/stoxModel.js';
import { leftInput, rightInput, leftResult, rightResult } from '../events.js';
//update form with data from searched assets
function prepareSaveForm(data, meta, id){

    document.getElementById(`asset${id}_name`).value = meta[1];
    document.getElementById(`asset${id}_closing`).value = data[4];
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
      let author = sessionStorage.getItem('email');
      
  
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


  //============= FORM CONTENT EVENTS ====================================

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


export {
    prepareSaveForm,
    resetSearch,
    getFormValues    
}