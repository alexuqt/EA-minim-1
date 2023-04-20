import { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Location } from "../interfaces/location.interface";

interface PaginatedLocationModel<T> extends PaginateModel<T> {};

const LocationSchema = new Schema<Location>(
    {
        name:{
            type: String,
            required:true,
        },
        city:{
            type: String,
            required:true,
        },
        population:{
            type: Number,
            required:true,
        },
        latitude:{
            type: Number,
            required:true,
        },
        longitude:{
            type: Number,
            required:true,
        },
        acts:{
            type: [Schema.Types.ObjectId],
            ref:'acts',
          },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

LocationSchema.plugin(mongoosePaginate);

const LocationModel: PaginatedLocationModel<Location> = model<Location, PaginatedLocationModel<Location>>('locations', LocationSchema);

export default LocationModel;