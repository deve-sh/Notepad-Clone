// Common closure function to store whether there are unsaved changes in memory.
const hasUnsavedChangesStore = () => {
	let unsavedChanges = false;
	return {
		set: (hasUnsavedChanges) => (unsavedChanges = hasUnsavedChanges),
		get: () => unsavedChanges,
	};
};

module.exports = hasUnsavedChangesStore();
