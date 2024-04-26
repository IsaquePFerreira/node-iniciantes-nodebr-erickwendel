const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
    constructor() {
        this.FILE_NAME = "heroes.json";
    }

    async getDataFile() {
        const file = await readFileAsync(this.FILE_NAME, "utf8");
        return JSON.parse(file.toString());
    }

    async writeFiles(datas) {
        await writeFileAsync(this.FILE_NAME, JSON.stringify(datas));
        return true;
    }

    async register(hero) {
        const data = await this.getDataFile();
        const id = hero.id <= 2 ? hero.id : Date.now();

        const heroWithId = {
            id,
            ...hero
        }

        const finalData = [
            ...data,
            heroWithId
        ];

        const result = await this.writeFiles(finalData);
        
        return result;
    }

    async list(id) {
        const data = await this.getDataFile();
        const filterData = data.filter(item => (id ? (item.id === id) : true));
        return filterData;
    }

    async remove(id) {
        if(!id) {
            return await this.writeFiles([]);
        }

        const data = await this.getDataFile();
        const index = data.findIndex(item => item.id === parseInt(id));

        if(index === -1) {
            throw Error("O usuário informado não existe");
        }
        
        data.splice(index, 1);
        return await this.writeFiles(data);
    }
}

module.exports = new Database();
