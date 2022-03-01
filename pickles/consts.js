const path = require("path");
export const PLUGIN_OBJ_DEF = {
    "name": null,
    "pathOnDisk": null,
    "entryFile": null,
    "frontEnd": null,
    "version": null
}
export const PLUGINS_PATH = path.resolve(process.cwd(), 'plugins');
export const PICKLES_FILE_PATH = path.resolve(process.cwd(),"pickles.json")
export const JSON_BASE_CONTENT = {
    active: [],
    nonActive:[]
}
