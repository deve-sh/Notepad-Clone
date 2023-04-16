const { ipcMain, dialog } = require("electron");
const { saveContentsToFile } = require("./file-ops");

const selectedFilePathHandler = require("../stores/selected-file-path.store");
const unsavedChangesStore = require("../stores/unsaved-changes.store");
const mainWindowStore = require("../stores/main-window.store");

const mountWindowCloseEvent = () => {
	const mainWindow = mainWindowStore.get();
	const onWindowClose = (event) => {
		const userHasUnsavedChanges = unsavedChangesStore.get();
		if (!userHasUnsavedChanges) return;

		const choice = dialog.showMessageBoxSync(mainWindow, {
			type: "question",
			buttons: ["Save", "Don't Save", "Cancel"],
			title: "Confirm",
			message: "Do you want to save changes to your file?",
		});

		if (choice === 0) {
			event.preventDefault();
			// Ask for contents from the web window.
			mainWindow.webContents.send("get-entered-contents");
			// Get contents back as response asynchronously
			ipcMain.on("receive-entered-contents", async (_event, contents) => {
				// We have the contents for the file entered by the user.
				const selectedFilePath = selectedFilePathHandler.get();
				if (selectedFilePath) {
					// Store the contents to an existing file.
					saveContentsToFile(selectedFilePath, contents);
				} else {
					// Open a save dialog
					const selectedPath = dialog.showSaveDialogSync(mainWindow);
					saveContentsToFile(selectedPath, contents);
				}
				// Now done, close the window.
				mainWindow.close();
			});
		}
		if (choice === 2) event.preventDefault();
		else unsavedChangesStore.set(false);
	};
	mainWindow.on("close", onWindowClose);
	ipcMain.on("set-unsaved-changes", (_event, hasUnsavedChanges) => {
		unsavedChangesStore.set(hasUnsavedChanges);
	});
};

module.exports = mountWindowCloseEvent;
