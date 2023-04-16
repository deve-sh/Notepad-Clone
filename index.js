const { app, BrowserWindow, nativeTheme } = require("electron");
const path = require("path");

const setMenu = require("./handlers/set-menu");
const onWindowClose = require("./handlers/on-window-close");

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			preload: path.resolve(__dirname, "./preload.js"),
		},
	});
	nativeTheme.themeSource = "light";
	mainWindow.loadURL(path.resolve(__dirname, "./src/index.html"));

	setMenu();
	onWindowClose(mainWindow);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
