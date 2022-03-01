import fs from "fs";
import logger from "./utils/logger";
import path from "path";
const MAIN_KEYS = ['name',"version","entryFile","author"];

/**
 * this function checks if the plugin.json contains the required keys to be considered as a valid plugin
 * @param {Object} json the plugin.json object
 * @return boolean
 */
const hasMainKeys = (json) => {
    let keys = Object.keys(json)
    let check = keys.filter(key => MAIN_KEYS.includes(key));
    if (check.length !== MAIN_KEYS.length) {
        logger.error("missing required keys in plugin.json")
        return false;
    }
    return true;
}

/**
 * this function makes sure that the entryFile specified in the plugin.json definition is exists
 * @param {object} json_cont
 * @param {string} plugin_path
 * @return {boolean}
 */
const entryFileExists = (json_cont,plugin_path) => {
    if (fs.existsSync(path.resolve(plugin_path,json_cont.entryFile)))
        return true;
    else
        logger.error("entryFile doesn't exists")
    return false;
}

/**
 *
 * @return {boolean}
 * @param plugin_path
 */
export const validate = (plugin_path) =>
{
    const json_path = path.resolve(plugin_path,"plugin.json")
    let json_cont = fs.readFileSync(json_path,{encoding: 'utf8'}).toString();

    try {
        json_cont = JSON.parse(json_cont);
    } catch (e) {
        logger.error(`${json_path} doesn't contain a valid json`)
        return false;
    }

    return hasMainKeys(json_cont) &&
        entryFileExists(json_cont, plugin_path);

}