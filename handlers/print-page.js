const mainWindowStore = require("../stores/main-window.store");

const printPage = () => {
	const mainWindow = mainWindowStore.get();
	return mainWindow.webContents.print();
};

module.exports = printPage;
