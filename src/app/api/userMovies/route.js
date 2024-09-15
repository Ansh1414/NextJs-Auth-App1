

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {UserMovie} from "@/models/userMovieModel.js"

connect()

export async function POST(NextRequest){
        try{

            
            const reqBody = await NextRequest.json();
            const {userId,movieId}=reqBody;
            const newUserMovie = new UserMovie({
                movie:movieId,
                user:userId
            })
            console.log('newUserMovie created--',newUserMovie);
    
            const savedUserMovie = await newUserMovie.save()
            console.log('savedUserMovie --',savedUserMovie);
            
            return NextResponse.json({
                message: "newUserMovie created successfully",
                success: true,
                data:savedUserMovie
            })
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}