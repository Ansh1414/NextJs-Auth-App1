import { Comment } from "@/models/commentsModel";
import {Movie} from "@/models/movieModel.js"
import {connect} from "@/dbConfig/dbConfig"
import mongoose from 'mongoose'
import { NextResponse } from "next/server";
connect();

export async function POST(request) {
        
    try {
        const reqBody=await request.json();
        const {movieId} = reqBody;
        console.log('fetch Comments data--',movieId);
        const movieCommentWithUserInfo=await Movie.aggregate([
            
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(movieId)
                }
            },{
    
                $lookup:{
                        from:'comments',
                        localField:'_id',
                        foreignField:'movieId',
                        as:'comments',
                        pipeline:[
                            {
                              $lookup:{
                                from:'users',
                                localField:'userId',
                                foreignField:'_id',
                                as:'owner',
                                pipeline: [
                                        {
                                            $project: {
                                                avatar: 1,
                                                username:1
                                            }
                                        }
                                    ]
                              }
                             
                              
                            }
                            
                          ]
                }
          },{
            $project: {
                _id: 1,
                comments:1
            }
        }
        
        
        ])
        console.log('comment data--',movieCommentWithUserInfo);
        return NextResponse.json({movieCommentWithUserInfo,success:true},{status:200});
    
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}

