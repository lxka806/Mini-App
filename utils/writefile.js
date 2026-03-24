const fs = require("fs/promises");

const writeFile = async (file, data) => {
    try {
        await fs.writeFile(file, JSON.stringify(data, null, 2)); // pretty-print with 2 spaces
        return "File written successfully";
    } catch (err) {
        throw new Error(`Failed to write file: ${err.message}`);
    }
};

module.exports = writeFile;