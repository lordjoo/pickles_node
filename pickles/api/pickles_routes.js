import {Router} from "express"
import bodyParser from "body-parser";
import {install} from "../installer/gitInstall";
import {activatePlugin, allPlugins, deActivatePlugin} from "../pickles_utils";
import {reload} from "../reloader";

const router = Router();
router.use(bodyParser.json())

// all plugins in the system
router.route('/all').get((req,res) => {
    res.json({
        status:true,
        message:"Plugins retrieved successfully",
        data:allPlugins()
    });
});

router.route('/activate/:plugin').post((req,res) => {
   if (activatePlugin(req.params.plugin)) {
       reload()
       res.json({
           message: `${req.params.plugin} activated`,
           status: true
       });
   } else {
       res.json({
           message: `${req.params.plugin} not found`,
           status: false
       }, 404);
   }
});

router.route('/de-activate/:plugin').post((req,res) => {
   if (deActivatePlugin(req.params.plugin)) {
       reload()
       res.json({
           message: `${req.params.plugin} de-activated`,
           status: true
       });
   } else {
       res.json({
           message: `${req.params.plugin} not found`,
           status: false
       }, 404);
   }
});

router.route("/install/git").post((req,res) => {
    console.log(req.body);
    install(req.body.repo)
    return res.json("hi");
});



export default router;
