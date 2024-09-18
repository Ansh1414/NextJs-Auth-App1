import mongoose,{Schema} from "mongoose";

const movieSchema=new Schema({
    personName:{
        type:String,
        required: true,
        lowecase: true,
        trim: true, 
        index: true
    },
    personImage:{
        type:String
    },
    personRole:{
        type:String
    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movie',
        required: true
    }
})
console.log('----Movie Crew model schema---');

const MovieCrew=mongoose.models.MovieCrew || mongoose.model("MovieCrew",movieSchema);


export {MovieCrew}