const { deepEqual, ok } = require("assert");

const database = require("./database");

const DEFAULT_ITEM_REGISTER = {
    name: "Flash",
    power: "Speed",
    id: 1
}

const DEFAULT_ITEM_UPDATE = {
    name: "Green Lantern",
    power: "Power of ring",
    id: 2
}

describe("Suíte manipulação de Herois", () => {
    before(async () => {
        await database.remove();
        await database.register(DEFAULT_ITEM_REGISTER);
        await database.update(DEFAULT_ITEM_UPDATE);
    });

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

    it("deve atualizar um heroi pelo id", async () => {
        const expected = {
            ...DEFAULT_ITEM_UPDATE,
            name: "Batman",
            power: "Money"
        }

        await database.update(expected.id, {
            name: expected.name,
            power: expected.power
        });

        const [realResult] = await database.list(DEFAULT_ITEM_UPDATE);
        deepEqual(realResult, expected);
    });
});


