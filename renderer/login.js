const { ipcRenderer } = require('electron');

var mysql      = require('mysql');  
    var connection = mysql.createConnection({  
      host     : 'localhost',  
      user     : 'root',  
      password : 'uma6bobic',  
      database : 'kosarka'  
    });    
connection.connect();  

const loginForm = document.getElementById('login-form');
const errorContainer = document.getElementById('error-container');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const isValidLogin = await verifyLogin(username, password);
   
});

async function verifyLogin(username, password) {
    $sql = "SELECT username, password FROM  osoba WHERE username= ? AND password = ?";   
        connection.query($sql, [username, password] ,function (error, results, fields) {  
        if (error) throw error;  
        console.log("result " + results.length);  
        if(results.length==1) {
            console.log("Ovdje bi trebao uci");
            ipcRenderer.send('login-success');
        }else {
            // ako nije tacan ispisi gresku
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Nije tacan username ili password';
            errorContainer.innerHTML = ''; // obrisi prijasnje greske
            errorContainer.appendChild(errorMessage);
        }
        connection.end;
    });
   
}
