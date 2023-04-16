const { dialog } = require("electron");
const { readFile } = require("./file-ops");
const signalUpdatedFileContents = require("../utils/signal-updated-file-content");

const mainWindowStore = require("../stores/main-window.store");
const selectedFilePathStore = require("../stores/selected-file-path.store");
const unsavedChangesStore = require("../stores/unsaved-changes.store");

const openFile = () => {
	const mainWindow = mainWindowStore.get();
	const [selectedPath] = dialog.showOpenDialogSync(mainWindow);

	if (selectedPath) {
		unsavedChangesStore.set(false);
		selectedFilePathStore.set(selectedPath);
		signalUpdatedFileContents(readFile(selectedPath));
		mainWindow.webContents.send("save-complete");
	}
};

module.exports = openFile;
