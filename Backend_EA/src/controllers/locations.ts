import { Request, Response } from "express";
import { addActs, deleteLocation, getLocation, getLocations, postLocation, updateLocation } from "../services/locations";
import { handleHttp } from "../utils/error.handle";

const getLoc = async({params}:Request,res:Response) => {
    try {
        const {idLoc} = params;
        const response = await getLocation(idLoc);
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_GET_LOC");
    }
};

const getLocs = async(req:Request,res:Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const response = await getLocations(page, limit);
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_GET_LOCS");
    }
};

const postLoc = async({body}:Request,res:Response)=>{
    try{
        const responseLocation=await postLocation(body);
        res.send(responseLocation);
    }catch(e){
        handleHttp(res,"ERROR_POST_LOC");
    }
};

const updateLoc = async({params,body}:Request,res:Response) => {
    try {
        const {idLoc} = params;
        const response = await updateLocation(idLoc,body);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_UPDATE_LOC");
    }
};

const deleteLoc = async({params}:Request,res:Response) => {
    try {
        const {idLoc} = params;
        const response = await deleteLocation(idLoc);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_DELETE_LOC");
    }
};

const addAct = async({body}:Request,res:Response)=>{
    try{
        const {idLoc, idAct} = body;
        const responseLocation=await addActs(idLoc, idAct);
        res.send(responseLocation);
    }catch(e){
        handleHttp(res,"ERROR_POST_ACT");
    }
};

export { addAct, getLoc, getLocs, postLoc, updateLoc, deleteLoc };

