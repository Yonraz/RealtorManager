import { Router } from "express";
import { addProperty, deleteProperty, 
//   updateProperty,
getProperties, } from "../controller/AdminController.js";
const router = Router();
router.post("/add-property", addProperty);
router.post("/delete-property", deleteProperty);
// router.post("/update-property", updateProperty);
router.get("/get-properties", getProperties);
export default router;
