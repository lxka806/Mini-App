// utils/readFile.js
const fs = require("fs/promises");

const readFile = async (file) => {
    try {
        const data = await fs.readFile(file, "utf-8");
        return JSON.parse(data); // parse JSON
    } catch (e) {
        return [];
    }
};

module.exports = readFile;