const { Menu, ipcRenderer } = require("electron");

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
	{ role: "windowMenu", label: "View" },
];

const setMenu = () => {
	const newMenu = Menu.buildFromTemplate(menuTemplate);
	return Menu.setApplicationMenu(newMenu);
};

module.exports = setMenu;
