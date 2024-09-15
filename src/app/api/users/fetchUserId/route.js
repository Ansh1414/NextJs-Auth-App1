

import { NextResponse } from "next/server";
//import { connect } from "@/dbConfig/dbConfig";//fetch images from cloudinary
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken";
export async function POST(NextRequest){
        try{
            console.log('==in fetchUserId route---');
            const reqBody = await NextRequest.json()
            const {name} = reqBody
            const cookieStore = cookies()
            const token = cookieStore.get(name)
            const decodeToken =  jwt.verify(token.value, process.env.TOKEN_SECRET);
            const response = NextResponse.json({
                message: "fetched userId successfully",
                success: true,
                userId:decodeToken.id,
                status:200
                
            })
            return response            
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}