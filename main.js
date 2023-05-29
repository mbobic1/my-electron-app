console.log("main process working");
console.log('main.js');

const electron =  require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;
//ako hocemo da bude u produkciji moramo dodati u packege.json provjeriti na intertu
//process.env.NODE_ENV = 'production';
const isInDevelopment = process.env.NODE_ENV !== 'production';


function createWindow(){
    win = new BrowserWindow({
        title: 'Ticket shop',
        width: isInDevelopment ?  1500 : 600,
        height: 700,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false,
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, './renderer/index.html'),
        protocol: 'file',
        slashes: true
    }));   
    //otvaramo devtools ako je u developmentu
    if(isInDevelopment){
        win.webContents.openDevTools();
    }
    win.on('closed', ()=>{
        win = null;
    })
}

app.on('ready', createWindow);
//za ios kako bi se ugasio
app.on('window-all-closed', () =>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
});

app.on('activate', ()=> {
    if(win === null){
        createWindow()
    }
});

