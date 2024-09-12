

import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {User} from "@/models/userModel.js"
import bcryptjs from "bcryptjs"
connect()

export async function POST(NextRequest){
        try{
            console.log('==in changePassword route---');
            const reqBody = await NextRequest.json()
            const {email,oldpassword,newPassword} = reqBody

            
            console.log('in changePassword route reqBody--',reqBody);
            //check if user already exists
            const user = await User.findOne({email}).select('-videos')

            if(!user){
                console.log('doesnt know user--');
                return NextResponse.json({error: "User dont exists",status:400})
            }
            

            //check if password is correct
            const validPassword = await user.isPasswordCorrect(oldpassword);
            if(!validPassword){
                return NextResponse.json({error: "old password is not correct"}, {status: 400})
            }
            console.log(' in changePassword route user._Id -- ',user._id);
            const hashedNewPassword = await bcryptjs.hash(newPassword, 10)
            console.log(' in changePassword route hashedNewPassword  -- ',hashedNewPassword);

            const update = {password:hashedNewPassword};
            const savedUser=await User.findByIdAndUpdate(user._id,update )
            console.log('savedUser in changePassword route  -- ',savedUser);
            
            
            const response = NextResponse.json({
                message: " Password changed successfully",
                success: true,
                status:200
                
            })
            return response
            
            
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}