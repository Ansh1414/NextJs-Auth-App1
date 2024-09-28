

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {Comment} from "@/models/commentsModel.js"


connect()

export async function POST(NextRequest){
        try{
            const reqBody = await NextRequest.json()
            const {message,userId,movieId} = reqBody

            
            console.log('in createComments route reqBody--',reqBody);
            //check if user already exists
           

            const newComment = new Comment({
                message,
                userId,
                movieId
            })
            console.log('newComment --',newComment);
    
            const savedComment = await newComment.save()
            console.log('savedComment --',savedComment);
            
            //send verification email

            return NextResponse.json({
                message: "Comment created successfully",
                success: true
            })
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}