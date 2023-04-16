const { contextBridge, ipcRenderer } = require("electron");
const { isWindows, isMac, isLinux } = require("./detect-os");

contextBridge.exposeInMainWorld("electron", {
	isWindows,
	isLinux,
	isMac,
	setHasUnsavedChanges: (hasUnsavedChanges = true) => {
		ipcRenderer.send("set-unsaved-changes", hasUnsavedChanges);
	},
});

window.addEventListener("DOMContentLoaded", () => {
	ipcRenderer.on("get-entered-contents", (event) => {
		const value = document.getElementById("root").value;
		event.sender.send("receive-entered-contents", value);
	});

	// Update document title on selected file path change
	ipcRenderer.on("selected-file-change", (_event, fileName) => {
		document.title = `${fileName
			.split(/[\\/]/g)
			.pop()
			.split(".")
			.slice(0, -1)
			.join(".")} - Notepad`;
	});

	// Update text area's content
	ipcRenderer.on("file-content-change", (_event, content) => {
		document.getElementById("root").value = content;
	});

	// Remove unsaved changes indicator from title
	ipcRenderer.on("save-complete", () => {
		window.hasUnsavedChanges = false;
		document.title = document.title.replace("*", "");
	});
});
