const { Menu, ipcRenderer } = require("electron");
const isDev = require("../utils/is-dev");

const resetEverything = require("./reset-everything");
const openFile = require("./open-file");
const onFileSave = require("./save-file");
const onFileSaveAs = require("./save-file-as");
const printPage = require("./print-page");

const isMac = process.platform === "darwin";

const menuTemplate = [
	{
		label: "File",
		submenu: [
			{
				label: "New",
				click: resetEverything,
				accelerator: "CommandOrControl+N",
			},
			{
				label: "Open...",
				click: openFile,
				accelerator: "CommandOrControl+O",
			},
			{
				label: "Save",
				accelerator: "CommandOrControl+S",
				click: onFileSave,
			},
			{
				label: "Save As",
				accelerator: "CommandOrControl+Shift+S",
				click: onFileSaveAs,
			},
			{ type: "separator" },
			{
				label: "Print",
				accelerator: "CommandOrControl+P",
				click: printPage,
			},
			{ type: "separator" },
			isMac ? { role: "close" } : { role: "quit" },
		],
	},
	{ role: "editMenu" },
	{
		role: "windowMenu",
		label: "View",
		submenu: [
			{ role: "minimize" },
			{ role: "zoom" },
			isDev ? { role: "toggleDevTools" } : { role: "close" },
		],
	},
];

const setMenu = () => {
	const newMenu = Menu.buildFromTemplate(menuTemplate);
	return Menu.setApplicationMenu(newMenu);
};

module.exports = setMenu;
