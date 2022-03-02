import {PICKLES_FILE_PATH} from './consts'
import fs from "fs";
import logger from "./utils/logger";


export const activatePlugin = (plugin_name) =>
{

}


export const deActivatePlugin = (plugin_name) =>
{

}


export const setPicklesJSONContent = (json_obj) =>
{
    const json_text = JSON.stringify(json_obj)
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

