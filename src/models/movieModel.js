import mongoose,{Schema} from "mongoose";

const movieSchema=new Schema({
    name:{
        type:String,
        required: true,
        lowecase: true,
        trim: true, 
        index: true
    },
    coverImage:{
                type:String
            },
    movieInformation:{
                    type:String
                }
})
console.log('----Movies model schema---');

const Movie=mongoose.model("Movie",movieSchema);

export {Movie}