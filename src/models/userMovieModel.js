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

const UserMovie=mongoose.models.userMovie || mongoose.Model("userMovie",userMovieSchema);

export {UserMovie}