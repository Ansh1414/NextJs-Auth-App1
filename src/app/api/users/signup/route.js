

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {User} from "@/models/userModel.js"
connect()

export async function POST(NextRequest){
        try{
            
            const reqBody = await NextRequest.json()
            const {username, email, password} = reqBody

            console.log('inside api/users/signup route-->',reqBody,' -- ',User);

            //check if user already exists
            const user = await User.findOne({email})

            if(user){
                console.log('existed user--');
                return NextResponse.json({error: "User already exists",status:400})
            }
            console.log('saved user--');
            const newUser = new User({
                username,
                email,
                fullName:username,
                password
            })
            console.log('newUser user--',newUser);
    
            const savedUser = await newUser.save()
            console.log('saved user--',savedUser);



            return NextResponse
            .json({
                message: "User signup successfully",
                success: true,
                status:200
                
            })
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}