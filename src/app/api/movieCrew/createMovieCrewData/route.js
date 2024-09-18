

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {MovieCrew} from "@/models/movieCrewModel.js"
import {Movie} from "@/models/movieModel.js"
import { writeFile } from "fs/promises";
import  path from 'path'
connect()

export async function POST(NextRequest){
        try{

            
            const reqBody = await NextRequest.formData();

            const personName=reqBody.get('personName');
            const personRole=reqBody.get('personRole');
            const moviename=reqBody.get('movieName');

            const file=reqBody.get('personImage') ;
            
            console.log('createMovieCrewData --> ',reqBody);

            const bytes=await file.arrayBuffer()
            const buffer = Buffer.from(bytes);
           
                // Define the path where the image will be saved
            const uploadDir = path.join(process.cwd(),'/public/images/crewMembers');
            const filePath = path.join(uploadDir, file.name);
           
            await  writeFile(filePath,buffer);
            //check if user already exists
            const fetchMovieId = await Movie.findOne({moviename})
            console.log('fetchMovieId --> ',fetchMovieId);

            let tempFilePath='/images/crewMembers/'+file.name;//later take from cloudinary
            const newMovieCrew = new MovieCrew({
                personName,
                personImage:tempFilePath,//filePath,
                personRole,
                movieId:fetchMovieId
                
            })
            console.log('newMovieCrew created--',newMovieCrew);
    
            const savedMovieCrew = await newMovieCrew.save()
            console.log('savedMovieCrew --',savedMovieCrew);
            
            return NextResponse.json({
                message: "Movie Crew created successfully",
                success: true,
                data:savedMovieCrew
            })
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}