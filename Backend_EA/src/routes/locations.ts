import { Request, Response, Router } from "express";
import { addAct, deleteLoc, getLoc, getLocs, postLoc, updateLoc } from "../controllers/locations";

const router = Router();

/**
 * http://localhost:3009/locations
 */
router.get("/all", getLocs);
router.get("/:idLoc", getLoc);
router.post("/", postLoc);
router.put("/:idLoc", updateLoc);
router.post("/acts", addAct);
router.delete("/:idLoc", deleteLoc);

export { router };

