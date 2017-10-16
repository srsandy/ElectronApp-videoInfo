/*
	When we create a electron application we create two
	major section of codes 
	1. Electron app
	2. MainWindow (to support our app to show our content) 
*/

const electron = require('electron'); 
//this is electron app
const ffmpeg = require('fluent-ffmpeg');

//ffmpeg is something that helps us with video and audio file to get its info
//we have downloaded ffmpeg from our CLI with the cmd 'brew install ffmpeg'
//before this make sure you have homebrew on your OSX
//fluent-ffmpeg help and makes bridge b/w ffmpeg and our electron app

const { app, BrowserWindow, ipcMain } = electron;

// Electron creates an app for us which we can use as electron.app to get the handle on the app
// Next we create a window ojb to our content ( as soon the app is ready) 

let mainWindow;

app.on('ready', () => {
	//console.log('im ready');
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(`file://${__dirname}/index.html`);
});  

//loadURL render the URL given on our app's window 


/* IPC (Inter Process Communication) system is used to communicate with our diff section of our code in
   our electron app project file
   IPC system is event based which is that one side we will emit something 
   and we will listen for is the other side

   On MainWindow we use ipcRenderer object to send and listen the events
   On Electon app we use ipcMain to listen but mainWindow.webContents.send to send event
*/   	

ipcMain.on('video:submit', (event, path) => {
	//console.log(event);
	//console.log(path);
	ffmpeg.ffprobe(path, (err, metadata) => {
		//console.log(metadeta);  
		mainWindow.webContents.send('video:metadata', metadata.format.duration);
	});

	//ffmpeg have a method name ffprobe which helps us for our task here
	//which returns a metadata from where we can extract the durtion

});   



