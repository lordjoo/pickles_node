import * as PicklesConst from "../consts"
import {spawn,exec,spawnSync} from 'child_process'
import {reload} from "../reloader";

const summonGetCommand = (command) =>
{
    console.log(command)
    return spawn(command,[],{
        cwd: PicklesConst.PLUGINS_PATH,
        detached: true,
        shell:"/bin/bash"
    })
}


export const install = (repo_remote,branch = 'master') =>
{
    summonGetCommand(`git clone ${repo_remote}`).on("exit",(code) => {
        reload()
    })
}

