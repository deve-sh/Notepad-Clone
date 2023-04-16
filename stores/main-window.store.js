const mainWindowStore = () => {
	let mainWindow;
	return {
		set: (newWindow) => (mainWindow = newWindow),
		get: () => mainWindow,
	};
};

module.exports = mainWindowStore();
