import {PICKLES_FILE_PATH} from './consts'
import fs from "fs";
import logger from "./utils/logger";

/**
 * Activate a plugin: if the plugin name is not found the function will return false
 * @param plugin_name
 * @return {boolean}
 */
export const activatePlugin = (plugin_name) =>
{
    const _allPlugins = allPlugins();
    if (_allPlugins.filter(plugin => plugin.name === plugin_name).length === 0)
        return false;
    const new_json = _allPlugins.map(plugin => {
        if (plugin.name === plugin_name) {
            plugin.isActive = true;
        }
        return plugin;
    })
    setPicklesJSONContent(new_json);
    return true;
}


export const deActivatePlugin = (plugin_name) =>
{
    const _allPlugins = allPlugins();
    if (_allPlugins.filter(plugin => plugin.name === plugin_name).length === 0)
        return false;
    const new_json = _allPlugins.map(plugin => {
        if (plugin.name === plugin_name) {
            plugin.isActive = false;
        }
        return plugin;
    })
    setPicklesJSONContent(new_json);
    return true;

}


export const setPicklesJSONContent = (json_obj) =>
{
    const json_text = JSON.stringify(json_obj,null,2)
    try {
        fs.writeFileSync(PICKLES_FILE_PATH,json_text);
        logger.info("pickles.json has been updated");
    } catch (e) {
        logger.error("unable to update pickles.json content",{error:e.message});
    }
}

/**
 *
 * @param plugin_name
 * @return boolean
 */
export const isActive = (plugin_name) => {
    return JSON.parse(fs.readFileSync(PICKLES_FILE_PATH,{encoding: 'utf8'})).filter(p => (p.isActive && p.name === plugin_name)).length >= 1
}

export const allPlugins = () => {
    return JSON.parse(fs.readFileSync(PICKLES_FILE_PATH))
}
