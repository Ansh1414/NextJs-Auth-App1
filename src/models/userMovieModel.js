import mongoose,{Schema} from 'mongoose';

const userMovieSchema=new Schema({
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movie'
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
})

const userMovie=mongoose.Model("userMovie",userMovieSchema);

export {userMovie}