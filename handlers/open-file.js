const { dialog } = require("electron");
const { readFile } = require("./file-ops");
const signalUpdatedFileContents = require("../utils/signal-updated-file-content");

const mainWindowStore = require("../stores/main-window.store");
const selectedFilePathStore = require("../stores/selected-file-path.store");
const unsavedChangesStore = require("../stores/unsaved-changes.store");

const openFile = () => {
	const mainWindow = mainWindowStore.get();
	const selectedPaths = dialog.showOpenDialogSync(mainWindow);

	if (selectedPaths && selectedPaths.length) {
		unsavedChangesStore.set(false);
		selectedFilePathStore.set(selectedPaths[0]);
		signalUpdatedFileContents(readFile(selectedPaths[0]));
		mainWindow.webContents.send("save-complete");
	}
};

module.exports = openFile;
