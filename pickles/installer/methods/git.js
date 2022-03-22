import * as PicklesConst from "../../consts"
import {spawn,exec,spawnSync} from 'child_process'

const summonGetCommand = (command) =>
{
    return spawnSync(command,[],{
        cwd: PicklesConst.PLUGINS_PATH,
        detached: true,
        shell:"/bin/bash"
    })
}


export const gitClone = (repo_remote,branch = 'master') =>
{
    return summonGetCommand(`git clone ${repo_remote}`);
}

