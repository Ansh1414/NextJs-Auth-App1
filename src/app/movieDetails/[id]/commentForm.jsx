import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
function CommentForm() {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const handleCommentSubmit = async (newComment) => {
        try {

            const commentInfo={message:comment,userId:'66ec520c01a246245fe06322',movieId:'66eaabaa428a590ef674855d'}
            console.log('--Entered Comment--');
            await axios.post('/api/Comments/createComments',commentInfo )
              
             

            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }

            setComments((prevComments) => [...prevComments, { text: newComment, avatar: '/images/userProfiles/ankush.png' }]);
        } catch (error) {
           
            console.log(error.reponse.data);
            toast.error('error in verify User Email');
        }
    };
    const handleEmoticonClick = (emoticon) => {
        setComment((prev) => prev + emoticon); // Append the emoticon to the comment
    };
  return (
    <div>
    <form onSubmit={handleCommentSubmit}>
    <div>
                <h2>All Comments</h2>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {comments.map((comment, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <ProfileIcon avatarUrl={comment.avatar} />
                            <span>{comment.text}</span>
                        </li>
                    ))}
                </ul>
                <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write your comment..."
                                rows="2"
                                required
                            />
            </div>

        <button type="submit">Submit Comment</button>
    </form>
    <div>
        <button onClick={() => handleEmoticonClick('😊')}>😊</button>
        <button onClick={() => handleEmoticonClick('👍')}>👍</button>
        <button onClick={() => handleEmoticonClick('❤️')}>❤️</button>
        <button onClick={() => handleEmoticonClick('😂')}>😂</button>
    </div>
</div>
)
}

export {CommentForm}