import {gitClone} from "./methods/git";
import {reload} from "../reloader";
import PicklesEvents from "../pickles_events"
import { activatePlugin } from "../pickles_utils";
import path from "path";

const runInstall = (plugin) => {
    try {
        const _plugin = require(path.resolve(process.cwd(),plugin.pathOnDisk,plugin.entryFile));
        if (typeof _plugin.install !== "function") return;
        _plugin.install();
        console.log("found it",_plugin);    
    } catch (e) {console.log(e);}
}


export const getPluginByMethod = (source,method,git_branch = null) => {
    switch (method) {
        case "git":
            const {output,status} = gitClone(source,git_branch)
            if (status !== 0) {
                return {
                    status: false,
                    message: output.toString()
                }
            }
            break;
        default:
    }
    return {
        status: true,
        message: ""
    }
}


/**
 * /install a plugin into the current project
 * @param {string} source 
 * @param {string} method 
 * @param {string?} git_branch 
 */
export const install = (source,method,git_branch = null) => {
    // get the plugin files 
    const { status,message } = getPluginByMethod(source,method,git_branch)
    if (!status) return {status:status,message:message}
    // run install function and activate the plugin
    const plugins = reload();
    const new_plugin = plugins[plugins.length -1];
    try {
        runInstall(new_plugin);
        activatePlugin(new_plugin.name)
    } catch (e) {console.log(e);}
    return {
        status:true,
        message:"COMPLETED"
    }
}

