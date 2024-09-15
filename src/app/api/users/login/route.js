

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {User} from "@/models/userModel.js"
import jwt from "jsonwebtoken";
connect()

export async function POST(NextRequest){
        try{
            
            const reqBody = await NextRequest.json()
            const {username, email, password} = reqBody

            console.log('inside api/users/login route-->',reqBody,' -- ',User);

            //check if user already exists
            const user = await User.findOne({email}).select('-videos')

            if(!user){
                console.log('doesnt know user--');
                return NextResponse.json({error: "User dont exists",status:400})
            }
            console.log('login route-->',user);

            //check if password is correct
            const validPassword = await user.isPasswordCorrect(password);
            if(!validPassword){
                return NextResponse.json({error: "Invalid password"}, {status: 400})
            }
            console.log('Valid password -- ',validPassword);
            

            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email
            }
            //create token
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})
            console.log('token info--',token);
            const tokenOptions={
                httpOnly: true, 
                secure:true
            }
            
            const response = NextResponse.json({
                message: "User login successfully",
                userId:user._id,
                success: true,
                status:200
                
            })
            response.cookies.set("token", token, tokenOptions)

            return response
            
            
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}