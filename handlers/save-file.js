const { ipcMain, dialog } = require("electron");

const selectedFilePathStore = require("../stores/selected-file-path.store");
const mainWindowStore = require("../stores/main-window.store");
const unsavedChangesStore = require("../stores/unsaved-changes.store");

const { saveContentsToFile } = require("./file-ops");

const onFileSave = () => {
	const mainWindow = mainWindowStore.get();

	const onReceiveFileContents = (_event, contents) => {
		// We have the contents for the file entered by the user.
		const selectedFilePath = selectedFilePathStore.get();
		if (selectedFilePath) {
			// Store the contents to an existing file.
			saveContentsToFile(selectedFilePath, contents);
		} else {
			// Open a save dialog
			const selectedPath = dialog.showSaveDialogSync(mainWindow);
			if (selectedPath) {
				selectedFilePathStore.set(selectedPath);
				unsavedChangesStore.set(false);
				saveContentsToFile(selectedPath, contents);
				// Send the updated file name to the web view
			}
		}

		ipcMain.off("receive-entered-contents", onReceiveFileContents);
	};

	// Ask for contents from the web window.
	mainWindow.webContents.send("get-entered-contents");
	// Get contents back as response asynchronously
	ipcMain.on("receive-entered-contents", onReceiveFileContents);
};

module.exports = onFileSave;
