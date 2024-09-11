

import { NextRequest, NextResponse } from "next/server";

export async function POST(NextRequest){
        try{
            
            const reqBody = await NextRequest.json()
            const {username, email, password} = reqBody

            console.log('inside api/users/signup route-->',reqBody);
            return NextResponse
            .json({
                message: "User login successfully",
                success: true,
                status:200
                
            })
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}