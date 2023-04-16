const { ipcMain, dialog } = require("electron");

const mainWindowStore = require("../stores/main-window.store");
const selectedFilePathStore = require("../stores/selected-file-path.store");
const unsavedChangesStore = require("../stores/unsaved-changes.store");

const { saveContentsToFile } = require("./file-ops");

const onFileSaveAs = () => {
	const mainWindow = mainWindowStore.get();

	const onReceiveFileContents = (_event, contents) => {
		// We have the contents for the file entered by the user.
		// Open a save dialog
		const selectedPath = dialog.showSaveDialogSync(mainWindow);
		if (selectedPath) {
			selectedFilePathStore.set(selectedPath);
			ipcRenderer.send("selected-file-change", selectedPath);
			unsavedChangesStore.set(false);
			saveContentsToFile(selectedPath, contents);
			mainWindow.webContents.send("save-complete");
		}
		ipcMain.off("receive-entered-contents", onReceiveFileContents);
	};

	// Ask for contents from the web window.
	mainWindow.webContents.send("get-entered-contents");
	// Get contents back as response asynchronously
	ipcMain.on("receive-entered-contents", onReceiveFileContents);
};

module.exports = onFileSaveAs;
