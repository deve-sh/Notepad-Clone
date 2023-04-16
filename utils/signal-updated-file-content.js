const mainWindowStore = require("../stores/main-window.store");

// Send updated file content to web process
const signalUpdatedFileContents = (contents) => {
	const mainWindow = mainWindowStore.get();
	mainWindow.webContents.send("file-content-change", contents);
};

module.exports = signalUpdatedFileContents;
