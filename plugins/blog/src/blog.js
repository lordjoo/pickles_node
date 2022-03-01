import {Router} from "express";


const init = () => {
    const router = new Router()
    router.route("/blog")
        .get((req,res) => {
            res.json("hi")
        })
    return router;
}

const install = ({}) => {

}

const uninstall = ({}) => {

}

export {init,install,uninstall}