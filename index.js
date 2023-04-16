const {
	app,
	dialog,
	BrowserWindow,
	nativeTheme,
	ipcMain,
} = require("electron");
const path = require("path");

const setMenu = require("./handlers/set-menu");
const { saveFile } = require("./handlers/file-ops");

let userHasUnsavedChanges = false;
let selectedFilePath = null;

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

	mainWindow.on("close", (event) => {
		if (!userHasUnsavedChanges) return;
		const choice = dialog.showMessageBoxSync(mainWindow, {
			type: "question",
			buttons: ["Save", "Don't Save", "Cancel"],
			title: "Confirm",
			message: "Do you want to save changes to your file?",
		});
		if (choice === 0) {
			event.preventDefault();
			mainWindow.webContents.send("get-entered-contents");
			ipcMain.on("receive-entered-contents", async (_event, contents) => {
				// We have the contents for the file entered by the user.
				// Open a save dialog
				if (selectedFilePath) {
					// Store the contents to an existing file.
					saveFile(selectedFilePath, contents);
				} else {
					const selectedPath = dialog.showSaveDialogSync(mainWindow);
					saveFile(selectedPath, contents);
				}

				// Now done, close the window.
				mainWindow.close();
			});
		}
		if (choice === 2) event.preventDefault();
		else userHasUnsavedChanges = false;
	});

	ipcMain.on("set-unsaved-changes", (hasUnsavedChanges) => {
		userHasUnsavedChanges = hasUnsavedChanges;
	});
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
