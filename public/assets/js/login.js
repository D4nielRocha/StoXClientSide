let logInUser = () => {

    let username = document.getElementById('loginName').value;
    let email= document.getElementById('loginEmail').value;
    let password= document.getElementById('loginPassword').value;
  
    // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    axios({
      method: 'post',
      url: 'http://localhost:8080/user',
      data: {
        "username": username,
        "email": email,
        "password": password
      },
      headers: {
        "Access-control-Allow-Origin": "*"
      }  
    }).then( res => {
      console.log(res)
    }).catch( err => {
      console.log(err);
    })
  
    location.reload();
  
  }