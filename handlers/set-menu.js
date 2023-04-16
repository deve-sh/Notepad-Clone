const { Menu, ipcRenderer } = require("electron");
const isDev = require("../utils/is-dev");

const onFileSave = require("./save-file");
const onFileSaveAs = require("./save-file-as");

const isMac = process.platform === "darwin";

const menuTemplate = [
	{
		label: "File",
		submenu: [
			{
				label: "Open...",
				click: () => {
					ipcRenderer.send("open-file");
				},
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
				click: () => {
					ipcRenderer.send("print-file");
				},
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
