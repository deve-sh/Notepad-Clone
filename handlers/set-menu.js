const { Menu } = require("electron");

const setMenu = () => {
	const defaultMenu = Menu.getApplicationMenu();
	const newMenu = new Menu();
	for (let item of defaultMenu.items) {
		if (item.label === "View") continue;
		if (item.label === "Window") {
			item.label = "View";
			item.role = "viewmenu";
		}
		newMenu.append(item);
	}
	return Menu.setApplicationMenu(newMenu);
};

module.exports = setMenu;
