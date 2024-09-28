

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {User} from "@/models/userModel.js"
import jwt from "jsonwebtoken";
import { encode } from "next-auth/jwt";

connect()

export async function POST(NextRequest){
        try{
            
            const reqBody = await NextRequest.json()
            const {username, email, password} = reqBody

            console.log('inside api/users/login route-->',reqBody,' -- ',User);

            //check if user already exists
            const user = await User.findOne({email}).select('-videos -fullName')

            if(!user){
                console.log('doesnt know user--');
                return NextResponse.json({error: "User dont exists",status:400})
            }
            console.log('user login route-->',user);

            //check if password is correct
            const validPassword = await user.isPasswordCorrect(password);
            if(!validPassword){
                return NextResponse.json({error: "Invalid password"}, {status: 400})
            }
            console.log('Valid password -- ',validPassword);
            

            const tokenData = {
                userId: user._id,
                picture:user.avatar
            }
            //create token
            /*const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})
            console.log('token info--',token);
            */
            const tokenOptions={
                httpOnly: true, 
                secure:true
            }
            const encodedOAuthTokenJWT = await encode({ token: tokenData, secret: process.env.NEXTAUTH_SECRET });
  
            console.log('---encodedOAuthTokenJWT--',encodedOAuthTokenJWT)
            
            
            
            const response = NextResponse.json({
                message: "User login successfully",
                userData:{userId:user._id,picture:user.avatar},
                success: true,
                status:200
                
            })
            response.cookies.set("next-auth.session-token", encodedOAuthTokenJWT, tokenOptions)

            return response
            
            
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}