import mongoose,{Schema} from "mongoose";

const commentSchema=new Schema({
    message:{
        type:String,
        required: true,
        trim: true
       
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required: true
    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movie',
        required: true
    }
})
console.log('----comment Schema model---');

const Comment=mongoose.models.Comment || mongoose.model("Comment",commentSchema);


export {Comment}