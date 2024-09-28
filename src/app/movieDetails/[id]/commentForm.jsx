import React,{useEffect} from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import Loader from '@/components/Loader.js';
import Comments from '../paginationComments.jsx';
function CommentForm({movieId}) {
    const [userData,setUserData]=useState({})
    const [comment, setComment] = useState(' ');
    const [commentsData,setCommentsData] = useState([])
    const [showLoader,setShowLoader]=useState(false);
    const [showComments,setShowComments]=useState(false);
    const [maxPages,setMaxPages]=useState(0)
    
    async function getCookieByName() {
        try{
          setShowLoader(true);const cookieName={};
          const response = await axios.post("/api/users/fetchUserId", cookieName);
          console.log("Login success", response.data);
          
          setUserData(response.data.userData)
        }catch(error){
          console.log('error in dashboard--',error)
        }
        finally{
          setShowLoader(false);
        }
        
    }
    const handleCommentSubmit = async (event) => {
        event.preventDefault()
        try {
            setShowLoader(true);
            const commentInfo={message:comment,userId:userData.userId,movieId}
            console.log('--Entered Comment--');
            const response = await axios.post('/api/Comments/createComments',commentInfo )
              
            

            if (response.status!=200) {
                throw new Error('Failed to submit comment');
            }
           
             if(commentsData.length>0){
                commentsData.push({ message: commentInfo.message,owner:[{avatar:userData.picture}]})
             }
             setComment('')
            
        } catch (error) {
           
            console.log(error.reponse.data);
            toast.error('error in verify User Email');
        }
        finally{
            setShowLoader(false);
        }
    };
    const viewAllComments = async () => {
        
        try {
            setShowLoader(true);
            
            console.log('--Entered Comment--');
            const response = await axios.post('/api/Comments/fetchComments',{movieId} )
              
            

            if (response.status!=200) {
                throw new Error('Failed to submit comment');
            }
            if(response.data.movieCommentWithUserInfo.length>0){
                setCommentsData(response.data.movieCommentWithUserInfo[0].comments);
            }
            //setComments((prevComments) => [...prevComments, { text: newComment, avatar: '/images/userProfiles/ankush.png' }]);
        } catch (error) {
           
            console.log(error.reponse.data);
            toast.error('error in verify User Email');
        }
        finally{
            setShowLoader(false);
        }
    };
    const handleEmoticonClick = (emoticon) => {
        setComment((prev) => prev + emoticon); // Append the emoticon to the comment
    };

    useEffect(()=>{
        
        getCookieByName().then(()=>{  //fetch cookies first to get userId
            console.log('loggedIn user in commentForm');
        }).catch((error)=>{
          console.log('error---',error);
        })
        
      },[])

      useEffect(()=>{
        viewAllComments();
      },[movieId])

  return (
    <div>
    <Loader showLoading={showLoader}/>
    <form onSubmit={handleCommentSubmit}>
            <div>
                <h2 onClick={(()=>{setShowComments(prev=>!prev)})}>{showComments?'Hide':'Show'} All Comments </h2>
                
                {showComments?
                    <>
                        <Comments commentsData={commentsData}/>
                    </>:<></>
                }
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                        <img
                            src={userData.picture}
                            alt=""
                            className="flex z-0 w-16 h-16 rounded-lg object-cover p-1"
                        />
                        <span className="p-2 flex-1">
                            <textarea
                                className="w-11/12 rounded-lg p-2 resize-none focus:outline-none border border-blue-500 blinking-cursor bg-black text-white"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment..."
                                rows="2"
                                maxLength={255} // Set max character limit here
                                required
                            />
                            <button type="submit" className="text-blue-600 hover:text-white pl-2">Post</button>
                            <div style={{ marginTop: '5px' }}>
                                <button type="button" onClick={() => handleEmoticonClick('😊')} style={{ marginRight: '5px' }}>😊</button>
                                <button type="button" onClick={() => handleEmoticonClick('👍')} style={{ marginRight: '5px' }}>👍</button>
                                <button type="button" onClick={() => handleEmoticonClick('❤️')} style={{ marginRight: '5px' }}>❤️</button>
                                <button type="button" onClick={() => handleEmoticonClick('😂')} style={{ marginRight: '5px' }}>😂</button>
                            </div>
                            
                        </span>
                    </li>
                </ul>
                
                
            </div>

        
    </form>
    
</div>
)
}

export {CommentForm}