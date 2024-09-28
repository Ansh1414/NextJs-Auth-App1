

import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";//fetch images from cloudinary
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken";
import {User} from "@/models/userModel.js"
import { getToken } from "next-auth/jwt";
connect()
export async function POST(NextRequest){
        try{
            const OAuthTokenJWT = await getToken({ req: NextRequest, secret: process.env.NEXTAUTH_SECRET });
  
            console.log('==in fetchUserId route new ---',OAuthTokenJWT);
            
            //const reqBody = await NextRequest.json()
            //const {name} = reqBody
            //const cookieStore = cookies()
            //const token = cookieStore.get(name)!=null?cookieStore.get(name).value:'';
            //console.log('==in fetchUserId route new --- token--',token);
           // let decodeToken={};
            /*if(token!=''){
                 //decodeToken =  jwt.verify(token, process.env.NEXTAUTH_SECRET);
                 //decodeToken= await decode({ token, secret: process.env.NEXTAUTH_SECRET });
  
            //console.log('---decodeOAuthTokenJWT--',decodeToken)
            
            }*/
            
            
            
            const response = NextResponse.json({
                message: "fetched userId successfully",
                success: true,
                userData:OAuthTokenJWT,

                status:200
                
            })
            return response            
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}