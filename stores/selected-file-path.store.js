// Common closure function to store the selected file in memory.
const selectedFileStore = () => {
	let selectedFilePath = "";
	return {
		set: (path) => (selectedFilePath = path),
		get: () => selectedFilePath,
	};
};

module.exports = selectedFileStore();
