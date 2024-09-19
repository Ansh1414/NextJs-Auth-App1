

import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";//fetch images from cloudinary
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken";
import {User} from "@/models/userModel.js"
connect()
export async function POST(NextRequest){
        try{
            console.log('==in fetchUserId route---');
            const reqBody = await NextRequest.json()
            const {name} = reqBody
            const cookieStore = cookies()
            const token = cookieStore.get(name)
            const decodeToken =  jwt.verify(token.value, process.env.TOKEN_SECRET);
            const UserId=decodeToken.id;

            //const user = await User.findOne({UserId})
            const user = await User.findById(UserId).select('avatar');
            console.log('avatar---',user);
            const response = NextResponse.json({
                message: "fetched userId successfully",
                success: true,
                userData:user,

                status:200
                
            })
            return response            
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}