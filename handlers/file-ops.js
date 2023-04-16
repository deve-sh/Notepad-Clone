const fs = require("fs");

exports.saveFile = (path, contents) => {
	if (!path) return;
	fs.writeFileSync(path, contents);
};

exports.readFile = (path) => {
	if (!path) return;
	return fs.readFileSync(path, "utf-8");
};
