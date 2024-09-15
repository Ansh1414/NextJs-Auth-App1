import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"

const userSchema=new Schema(
    {
        username: {
            type:String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
            index: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        password:{
            type:String,
            required:[true,'Password is required']
        },
        email:{
            type:String
        },
        avatar:{
            type:String
        },
        refreshToken: {
            type: String
        },
        verifyToken:{
            type:String
        },
        verifyTokenExpiry:{
            type:Date
        },
        isVerfied: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
           
        
    },
    {
        timestamps: true
    }
)
console.log('----user model schema---');
//check password is modified before saving into database
userSchema.pre("save", async function (next) {
    console.log('----user model schema pre("save")---',this.isModified("password"));

    if(!this.isModified("password")) return next();
    console.log('----user model schema 001---',this.isModified("password"));
    this.password = await bcryptjs.hash(this.password, 10)
    //const salt = await bcryptjs.genSalt(10)
    //this.password  = await bcryptjs.hash(this.password, salt)

    console.log('----user model schema this.password---',this.password);
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcryptjs.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
//const User = mongoose.model("User", userSchema)
const User = mongoose.models.users || mongoose.model("users", userSchema);

export {User}