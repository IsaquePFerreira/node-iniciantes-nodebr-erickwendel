const { deepEqual, ok } = require("assert");

const database = require("./database");
const DEFAULT_ITEM_REGISTER = {
    name: "Flash",
    power: "Speed",
    id: 1
}

describe("Suíte manipulação de Herois", () => {
    // before(async () => {
    //     await database.register(DEFAULT_ITEM_REGISTER);
    // });

    it("deve pesquisar um heroi usando arquivos", async () => {
        const expected = DEFAULT_ITEM_REGISTER;
        const [result] = await database.list();

        deepEqual(result, expected);
    });

    it("deve cadastrar um heroi, usando arquivos", async () => {
        const expected = DEFAULT_ITEM_REGISTER;
        const result = await database.register(DEFAULT_ITEM_REGISTER);
        const [actual] = await database.list(DEFAULT_ITEM_REGISTER.id);

        deepEqual(actual, expected);
    });

    it.only("deve remover um heroi por id", async () => {
        const expected = true;
        const result = await database.remove(DEFAULT_ITEM_REGISTER);
        deepEqual(result, expected);
    });
});


