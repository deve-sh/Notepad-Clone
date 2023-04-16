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
});
