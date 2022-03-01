import fs from "fs";
import {JSON_BASE_CONTENT, PICKLES_FILE_PATH} from "./consts";
import logger from "./utils/logger";
import path from "path";

/**
 * This function runs the init hook in the plugin main js file which then use the function in the express app
 * @param app the current express app instance
 * @param entryFile the js entryFile for the plugin desired to be loaded
 */

const runInitFunction = (app,entryFile) => {
    const _plugin = require(path.resolve(process.cwd(),entryFile));
    if (typeof _plugin.init !== "function") return;
    app.use(_plugin.init());
}

/**
 * this function loads the activated plugins defined in the pickles.json into our express app
 * @param {Express} app
 */

export const load = (app) => {
    // check if pickles.json exists
    if (!fs.existsSync(PICKLES_FILE_PATH)) {
        // if not create it
        fs.writeFileSync(PICKLES_FILE_PATH,JSON.stringify(JSON_BASE_CONTENT))
        logger.debug("pickles.json was not found but we created it")
    }
    let pickles = JSON.parse(fs.readFileSync(PICKLES_FILE_PATH))
    let active_plugins = pickles.active
    // start loading the active plugins into the express app
    active_plugins.forEach(plugin => {
        runInitFunction(app,plugin.entryFile)
    })
}

