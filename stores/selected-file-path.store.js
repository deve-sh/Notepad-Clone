// Common closure function to store the selected file in memory.
const selectedFileHandler = () => {
	let selectedFilePath = "";
	return {
		set: (path) => (selectedFilePath = path),
		get: () => selectedFilePath,
	};
};

module.exports = selectedFileHandler();
