const { ipcMain, dialog } = require("electron");
const { saveContentsToFile } = require("./file-ops");

const selectedFilePathHandler = require("../stores/selected-file-path.store");
const unsavedChangesStore = require("../stores/unsaved-changes.store");

const mountWindowCloseEvent = (mainWindow) => {
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
			mainWindow.webContents.send("get-entered-contents");
			ipcMain.on("receive-entered-contents", async (_event, contents) => {
				// We have the contents for the file entered by the user.
				// Open a save dialog
				const selectedFilePath = selectedFilePathHandler.get();
				if (selectedFilePath) {
					// Store the contents to an existing file.
					saveContentsToFile(selectedFilePath, contents);
				} else {
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
