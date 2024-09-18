

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {Movie} from "@/models/movieModel.js"
import { writeFile } from "fs/promises";
import  path from 'path'
connect()

export async function POST(NextRequest){
        try{

            
            const reqBody = await NextRequest.formData();
            const moviename=reqBody.get('moviename');
            const movieInformation=reqBody.get('movieInformation');
            const file=reqBody.get('coverImage') ;
            console.log('inside api/movies/createMoviesData route File000-->',reqBody.get('FormData'));
            const bytes=await file.arrayBuffer()
            const buffer = Buffer.from(bytes);
            console.log('inside api/movies/createMoviesData route process.cwd()-->',process.cwd());
                // Define the path where the image will be saved
            const uploadDir = path.join(process.cwd(),'/public/images/MoviesCoverImage');
            const filePath = path.join(uploadDir, file.name);
           
            await  writeFile(filePath,buffer);
            //check if user already exists
            const existingMovieData = await Movie.findOne({moviename})

            if(existingMovieData){
                console.log('existing Movie Data--');
                return NextResponse.json({error: "existing Movie Data--",status:400})
            }
            let tempFilePath='images/MoviesCoverImage/'+file.name;
            const newMovie = new Movie({
                moviename,
                coverImage:tempFilePath,//filePath,
                movieInformation,
                
            })
            console.log('newMovie created--',newMovie);
    
            const savedMovie = await newMovie.save()
            console.log('savedMovie --',savedMovie);
            
            return NextResponse.json({
                message: "newMovie created successfully",
                success: true,
                data:savedMovie
            })
        }
        catch(error){
            return NextResponse.json({error: error.message}, {status: 500})
        }

}