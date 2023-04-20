import { Types } from "mongoose";
import { Location } from "../interfaces/location.interface";
import LocationModel from "../models/location";

const getLocation = async(id: string) => {
    const responseItem = await LocationModel.findOne({_id: id});
    return responseItem;
};

const getLocations = async(page: number, limit: number) => {
    const options = {
        page: page,
        limit: limit
    };
    const responseItem = await LocationModel.paginate({}, options);
    return responseItem;
};

const postLocation = async(item: Location) => {
    const responseInsert = await LocationModel.create(item);
    return responseInsert;
};

const updateLocation = async (id: string, data: Location) => {
    const responseItem = await LocationModel.findOneAndUpdate({_id: id}, data,{new: true});
    return responseItem;
}

const deleteLocation = async(id: string) => {
    const responseItem = await LocationModel.findOneAndRemove({_id: id});
    return responseItem;
}

const addActs = async(idLoc: string, idAct: string) => {
    const responseInsert = await LocationModel.findOneAndUpdate(
        {_id: idLoc},
        {$addToSet: {acts: new Types.ObjectId(idAct)}},
        {new: true}
    ); // ).populate('acts');
    return responseInsert;
};

export { getLocation, getLocations, postLocation, updateLocation, deleteLocation, addActs };

