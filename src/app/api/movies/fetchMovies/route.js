

import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {Movie} from "@/models/movieModel.js";

connect()

export async function POST(NextRequest){
        try{
            
           console.log('inside fetched movies route--');
           

            //check if movies exists
            const movies = await Movie.find({}).select('-videos')

            if(!movies){
                console.log('no movies yet');
                return NextResponse.json({error: "movies dont exists",status:400})
            }
            

          
            const response = NextResponse.json({
                message: "Movie fetched successfully",
                moviesData:movies,
                success: true,
                status:200
                
            })
            return response
            
            
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}