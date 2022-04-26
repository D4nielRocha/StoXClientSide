const app = Vue.createApp({
    
    mounted:function(){
        if(this.checkAdmin()){
            this.getUsers();
        }
    },

    data(){
        return {
            base_url: 'http://localhost:8080',
            name: 'Daniel',
            users: []
        }
    },
    computed: {

    }, 
    methods: {
        async getUsers(){
            try{
                const result = await this.getDataAsync(`${this.base_url}/user`);
                console.log(result);
                result.forEach( item => {
                    this.users.push(item);
                })
                // this.users.push(result);
                // return json;
            }catch(e){
                console.log(e);
            }
        },
        getHeaders(){

            return new Headers ({
                "Accept": "application/json", 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('accessToken')            });
        },
        fetchInit(httpMethod = 'GET', bodyContent = ''){

            let init = {  
                method: httpMethod,
                credentials: 'include',
                headers: this.getHeaders(),
                mode: 'cors',
                cache: 'default'
            };
        
            if(bodyContent != ''){
                init.body = bodyContent;
            };
        
            return init;
        },
        async getDataAsync(url, init = this.fetchInit()){

            try{
                
            const response = await fetch(url, init);
            const json = await response.json();
            // console.log(json);
        
            return json
        
            }catch(err){
                console.log(err);
            }
        
        },
        checkAdmin(){
            document.getElementById('profileBtn').innerText = `${sessionStorage.getItem('email')}`;
            if(sessionStorage.getItem('email') == "d4niel_rocha@icloud.com"){
                document.getElementById('adminButton').classList.remove('d-none');
                return true;
            }

            return false;
             
        }
        
        
    },
   

})


app.mount('#app');