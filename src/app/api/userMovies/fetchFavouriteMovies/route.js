
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {UserMovie} from "@/models/userMovieModel.js"
import mongoose from 'mongoose';
connect()

export async function POST(NextRequest){
        try{
            
           console.log('inside fetched user movies route--');
           const reqBody = await NextRequest.json()
            const {loggedInUserId} = reqBody
            console.log('inside fetched loggedInUserId movies route--',reqBody);
            //check if movies exists
            
            //const movies = await UserMovie.find({}).select('-videos')
            const userMovies = await UserMovie.find({ userId: loggedInUserId })
            if(!userMovies){
                console.log('no favourite movies yet');
                return NextResponse.json({error: "userMovies dont exists",status:400})
            }
            

          
            const response = NextResponse.json({
                message: "userMovies fetched successfully",
                userMoviesData:userMovies,
                success: true,
                status:200
                
            })
            return response
            
            
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}