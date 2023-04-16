const { contextBridge } = require("electron");
const { isWindows, isMac, isLinux } = require("./detect-os");

contextBridge.exposeInMainWorld("electron", {
	isWindows,
	isLinux,
	isMac,
});
