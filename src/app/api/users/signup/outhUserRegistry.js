import { connect } from "@/dbConfig/dbConfig";
import {User} from "@/models/userModel.js"
export const OuthUserRegister=async (profile,token)=>{
    console.log('---signup route OuthUserRegister--',profile)
    try{
        connect()
        if(!profile){
            return token;
        }
        const email=profile.email;
        const password=profile.at_hash;
        const file=profile.picture;
        console.log(password,'---signup route OuthUserRegister--',email,'==',file);
        const user = await User.findOne({email})

        if(user){
            console.log('existed user--',user._id);
            token.userId=user._id;
            return token;
        }
        const newUser = new User({
            username:email,
            email,
            fullName:email,
            password,
            avatar:file
        })
        console.log(' outhUserRegistry newUser user--',newUser);

        const savedUser = await newUser.save()
        console.log('outhUserRegistry saved user--',savedUser);
        token.userId=savedUser._id;
        return token;        
    }catch(error){
        console.log('---signup error OuthUserRegister--',error)
            return null;
        }
    
}