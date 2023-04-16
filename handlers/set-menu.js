const { Menu, ipcRenderer } = require("electron");
const isDev = require("../utils/is-dev");

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
				click: () => {
					ipcRenderer.send("save-file");
				},
			},
			{
				label: "Save As",
				click: () => {
					ipcRenderer.send("save-file-as");
				},
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
