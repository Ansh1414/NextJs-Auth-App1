import mongoose,{Schema} from 'mongoose';

const userMovieSchema=new Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required: true
    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movie',
        required: true
    },
    isSelected: {
        type: Boolean,
        default: false
      }

})

const UserMovie=mongoose.models.userMovie || mongoose.model("userMovie",userMovieSchema);

export {UserMovie}