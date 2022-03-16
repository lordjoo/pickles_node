import fs from "fs";
import {PLUGIN_OBJ_DEF, PLUGINS_PATH} from "./consts";
import logger from "./utils/logger";
import path from "path";
import {validate} from "./pluginValidator"
import {isActive, setPicklesJSONContent} from "./pickles_utils";

/**
 * this function will return the plugin object definition that will be saved into pickles.json
 *
 * @param {string} plugin_path
 */
const createPluginJSONObject = (plugin_path) => {
    const plugin_json = JSON.parse(fs.readFileSync(path.resolve(plugin_path,"plugin.json"),{encoding:'utf-8'}));
    let newObj = {}
    Object.keys(PLUGIN_OBJ_DEF).forEach(key => {
        if (plugin_json[key]) {
            newObj[key] = plugin_json[key]
        }
    });
    newObj.pathOnDisk = plugin_path;
    newObj.isActive = isActive(plugin_json.name)
    return newObj;
}


/**
 *
 * @return {array}
 */
const scanPluginFolder = () => {
    let plugins = [];
    // start scanning the directory
    fs.readdirSync(PLUGINS_PATH).forEach(plugin_folder => {
        const plugin_path = path.resolve(PLUGINS_PATH,plugin_folder);
        // check if it has 'plugin.json'
        if (!fs.existsSync(path.resolve(plugin_path,"plugin.json"))) {
            logger.error(`${plugin_folder} doesn't have plugin.json `)
            logger.warn(`${plugin_folder} ignored`)
            return 0;
        }
        // if yes then start the validation process
        // here we will chek a lot of this you can see what's happening in the pluginValidator.js file
        if (!validate(plugin_path)) {
            logger.error(`validation failed for ${plugin_folder}`)
            return 0;
        }
        plugins.push(createPluginJSONObject(plugin_path))
    });
    return plugins;
}


/**
 *
 * @return {Array}
 */
export const reload = () => {
    // check if 'plugins' folder exists
    if (!fs.existsSync(PLUGINS_PATH)) {
        // if not create it
        logger.debug("creating 'plugins' folder")
        try {
            fs.mkdirSync(PLUGINS_PATH);
        } catch (e) {
            logger.error("error creating 'plugins' folder",{
                error: e.message
            })
            return false;
        }
    }
    const plugins =  scanPluginFolder();
    setPicklesJSONContent(plugins);
};



