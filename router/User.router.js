import { Router } from "express";
import { addUser , Attendance} from "../controller/User.controller.js"
import { upload } from "../middleware/multer.js"

const router = Router();

router.route("/adduser").post(upload.single('profileImg'),addUser);

router.route("/attendance").post(upload.single('img') ,Attendance);

export default router