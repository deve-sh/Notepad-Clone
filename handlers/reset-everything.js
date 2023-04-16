const mainWindowStore = require("../stores/main-window.store");
const selectedFilePathStore = require("../stores/selected-file-path.store");
const unsavedChangesStore = require("../stores/unsaved-changes.store");

const resetEverything = () => {
	selectedFilePathStore.set(null);
	unsavedChangesStore.set(false);
	const mainWindow = mainWindowStore.get();
	mainWindow.webContents.reloadIgnoringCache();
};

module.exports = resetEverything;
