// components/MovieCard.js

//import Image from 'next/image';
import {CommentForm} from './commentForm';
const MovieCard = ({ movie }) => {
    console.log('----',movie.coverImage);
    if(!movie){
        return (<></>)
    }else{

    
  return (
    <div className="w-screen h-screen flex flex-col  bg-cyan-80">
       
      <img
        className="w-11/12 h-1/2 object-cover object-top"
        src={movie.coverImage}
        alt={movie.moviename}
        
      />
      <div className="grid grid-cols-2">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-red-500">{movie.moviename}</div>
        <p className="text-white text-base">{movie.movieInformation}</p>
        <CommentForm/>
      </div>
      <div className="px-6 py-4">
        <h3 className="font-bold text-lg mb-2 text-red-500">Cast :</h3>
        <div className="grid grid-cols-12 ">
          {movie.crewMembers && movie.crewMembers.map((member) => (
          
          <div key={member._id}  className=" flex flex-col items-center relative group">
            <img
              className="w-10 h-10 rounded-full transition-transform duration-200 ease-in-out hover:scale-150"
              src={member.personImage}
              alt={member.personName}
              
            />
            <div className=" mt-4 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 text-center">
              <p className="font-semibold text-blue-500">{member.personName}</p>
              <p className="text-gray-600 text-sm">{member.personRole}</p>
            </div>
          </div>
         
        ))}
         </div>
         <h3 className="font-bold text-lg mb-2 text-red-500">Producers :</h3>
         <div className="grid grid-cols-12 ">
          {movie.crewMembers && movie.crewMembers.map((member) => (
          
          <div key={member._id}  className=" flex flex-col items-center relative group">
            <img
              className="w-10 h-10 rounded-full transition-transform duration-200 ease-in-out hover:scale-150"
              src={member.personImage}
              alt={member.personName}
              
            />
            <div className="mt-8 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 text-center">
              <p className="font-semibold text-blue-500">{member.personName}</p>
              <p className="text-gray-600 text-sm">{member.personRole}</p>
            </div>
          </div>
         
        ))}
         </div>
      </div>
      </div>
    </div>
  );
        }
};

export default MovieCard;
