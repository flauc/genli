import {initPrompt} from "./initPrompt";
import {createFile} from "../../helpers/filer"

const co = require("co"),
    prompt = require("co-prompt");

export default function init(content: any): void {
    let jsonObject = {};

    // Display the intro text
    console.log(initPrompt.intro);

    co(function *() {
        let structurePrompt = yield prompt("structure: (standard) "),
            bootLocationPrompt = yield prompt("bootLocation: (app/boot.ts) ");

        return {
            "structure": structurePrompt ? structurePrompt : "standard",
            "bootLocation": bootLocationPrompt ? bootLocationPrompt : "app/boot.ts"
        };

    }).then((values) => {
        jsonObject = values;
        createFile("bu", "bla.json");
    })
}