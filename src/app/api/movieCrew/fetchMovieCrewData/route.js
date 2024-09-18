

import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {Movie} from "@/models/movieModel.js";
import mongoose from 'mongoose'
connect()

export async function POST(NextRequest){
        try{
            const reqBody = await NextRequest.json();

            console.log('inside fetched Movies with crew Members --',reqBody);
            
          
           const movieId = reqBody.movieId;//reqBody.movieId;

           
            const movieWithCrew = await Movie.aggregate([
              // Match the movie by movieId
              { $match: { _id: new mongoose.Types.ObjectId(movieId) } },
              // Lookup to find crew members associated with this movie
              {
                $lookup: {
                  from: 'moviecrews',               // The collection to join (MovieCrew collection name)
                  localField: '_id',                // Field from the Movie schema (movieId)
                  foreignField: 'movieId',          // Field from the MovieCrew schema
                  as: 'crewMembers'                 // Alias for the joined results
                }
              },
            // Project to only include fields that you want in the final result
              {
                $project: {
                  _id: 1,                          // Include the movie ID
                  moviename: 1,                    // Include the movie name
                  movieInformation: 1,             // Include the release year
                  coverImage: 1, 
                  crewMembers: 1,                  // Include the crew members (already populated in the previous $lookup)
                }
              }
            ]);
            console.log('inside fetched Movies with crew Members ',movieWithCrew);
            // If no movie is found, log a message
            if (!movieWithCrew || movieWithCrew.length === 0) {
              return NextResponse.json({error: 'no movie found'}, {status: 500})
            }
        
            // Output the combined result (movie details with crew members)
            console.log('Movie with Crew:', movieWithCrew[0]);
            return NextResponse.json({
                message: "Movie with Crew fetched successfully",
                success: true,
                data:movieWithCrew[0]
            })
        
          } catch (error) {
            return NextResponse.json({error: error.message}, {status: 500})
          }

}