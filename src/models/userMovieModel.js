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
        unique: [true,'Movie already added as your favourite'],
        required: true
    },
    isSelected: {
        type: Boolean,
        default: false
      }

})

const UserMovie=mongoose.models.userMovie || mongoose.model("userMovie",userMovieSchema);

export {UserMovie}