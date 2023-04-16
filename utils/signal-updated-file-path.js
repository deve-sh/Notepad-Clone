// Signal an updated file path to the web process

const mainWindowStore = require("../stores/main-window.store");

const signalUpdatedFilePath = (updatedFilePath) => {
	const mainWindow = mainWindowStore.get();
	mainWindow.webContents.send("selected-file-change", updatedFilePath);
};

module.exports = signalUpdatedFilePath;
