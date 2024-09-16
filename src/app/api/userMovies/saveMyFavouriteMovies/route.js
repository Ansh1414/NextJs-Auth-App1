

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {UserMovie} from "@/models/userMovieModel.js"

connect()

export async function POST(NextRequest){
        
            try{
                const reqBody = await NextRequest.json();

                console.log('in save my favourite movies',reqBody.userFavMovies);
                // Perform the bulk insert
                
                // try {
                //     const result = await UserMovie.insertMany(reqBody.userFavMovies);
                //     return NextResponse.json({
                //         message: "userMovies added successfully",
                //         success: true,
                //         data:result
                //     })
                // } catch (error) {
                //     return NextResponse.json({
                //         message:error,
                //         success: false
                //     })
                // }
                try {
                    const bulkOps = reqBody.userFavMovies.map(update => ({
                      updateOne: {
                        filter: { userId: update.userId, movieId: update.movieId },
                        update: { $set: { isSelected: update.isSelected } },
                        upsert: true  // Create if no document matches
                      }
                    }));
                
                    const result = await UserMovie.bulkWrite(bulkOps);
                    console.log('Bulk update or create result:', result);
                    return NextResponse.json({
                                message: "userMovies added successfully",
                                success: true,
                                data:result
                            })
                  } catch (err) {
                    console.error('Error performing bulk update or create:', err);
                  }
               
                
            } catch (error) {
                console.error('Error performing bulk insert:', error);
                return NextResponse.json({error: error.message}, {status: 500})
                
            } 
        }
        

