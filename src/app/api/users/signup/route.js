

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {User} from "@/models/userModel.js"
import { sendEmail } from "@/helpers/mailer.js";
import path from "path"
import { writeFile } from "fs/promises";
connect()

export async function POST(NextRequest){
        try{
            const reqBody = await NextRequest.formData();
            
            const email=reqBody.get('email');
            const password=reqBody.get('password');
            

            const file=reqBody.get('avatar') ;
            
            console.log('signup --> ',reqBody);

            const bytes=await file.arrayBuffer()
            const buffer = Buffer.from(bytes);
           
                // Define the path where the image will be saved
            const uploadDir = path.join(process.cwd(),'/public/images/userProfiles');
            const filePath = path.join(uploadDir, file.name);
           
            await  writeFile(filePath,buffer);

            
            console.log('inside api/users/signup route-->',reqBody,' -- ',User);

            //check if user already exists
            const user = await User.findOne({email})

            if(user){
                console.log('existed user--');
                return NextResponse.json({error: "User already exists",status:400})
            }
            const tempfilePath='/images/userProfiles/'+file.name;//temporary ...will come from cloudinary
            console.log('saved user--');
            const newUser = new User({
                username:email,
                email,
                fullName:email,
                password,
                avatar:tempfilePath
            })
            console.log('newUser user--',newUser);
    
            const savedUser = await newUser.save()
            console.log('saved user--',savedUser);
            
            //send verification email

            await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

            return NextResponse.json({
                message: "User created successfully",
                success: true,
                savedUser
            })
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}