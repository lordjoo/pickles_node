import {Router} from "express"
import bodyParser from "body-parser";
import {activatePlugin, allPlugins, deActivatePlugin} from "../pickles_utils";
import {reload} from "../reloader";
import { install } from "../installer/plugin_installer";

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

router.route("/install/:method").post((req,res) => {
    const {status,message} = install(req.body.source,req.params.method);
    if (status) {
        return res.json({
            status:true,
            message:message
        });
    } else {
        return res.status(500).json({
            status:false,
            message:message
        });
    }
    
});



export default router;
