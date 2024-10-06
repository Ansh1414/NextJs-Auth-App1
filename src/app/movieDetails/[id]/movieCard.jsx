// components/MovieCard.js
import Modal from '@/components/UI/Modal';
import { useState } from 'react';
//import Image from 'next/image';
import {CommentForm} from './commentForm';
import {handleAddPayment} from '@/helpers/addPayment.js'
const MovieCard = ({ movie,userId }) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [designatedProfit, setDesignatedProfit] = useState('');
    const [amount, setAmount] = useState(10);
    const [showMinNumberError,setShowMinNumberError]=useState(false);
    const options = ['50-100 cr - 85%', '100-150 cr - 75%', '150-200 cr - 65%'];
  
    console.log('----',movie.coverImage);
    const handleSelect = (value) => {
      setSelectedOption(value);
      setDesignatedProfit(value.split(' - ')[1]);
      console.log('Selected option:', value);
    };

    if(!movie){
        return (<></>)
    }else{
      
    
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
            
                            <h2 className="text-xl font-semibold text-white bg-black">{movie.moviename} Movie</h2>
                            <p className="mt-2 text-red-600">Select what you think this movie can achieve?</p>
                            <select
                                  onChange={(e) => handleSelect(e.target.value)}
                                  className="border border-gray-300 rounded p-2 mb-4 text-black w-1/2"
                                >
                                  <option value="">-- Choose an option --</option>
                                  {options.map((option, index) => (
                                    <option key={index} value={option}>
                                      {option}
                                    </option>
                                  ))}
                            </select>
                            <input
                                className="text-white bg-black w-1/2 h-[2.5rem] border-2 border-blue-500"
                                placeholder='Enter Amount'
                                type="number"
                                min="10"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    setShowMinNumberError(false);
                                }
                                }
                                required
                            />
                            <span className={`left-0 top-full bg-black text-white rounded ${showMinNumberError?'block':'hidden'}`}>
                                Minimum number is 10
                            </span>
                            <button type="button" className="bg-blue-500 rounded-lg p-2"
                            onClick={async ()=>{
                              const response=await handleAddPayment({amount});
                            }}>
                                {designatedProfit} Profit</button>
                            
                            
      </Modal>      
    <div className='flex'>
      <div className="w-10/12 h-screen flex flex-col  bg-cyan-80">
       
      <img
        className="h-1/2 object-cover object-top"
        src={movie.coverImage}
        alt={movie.moviename}
        
      />
      <div className="grid grid-cols-2">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-red-500">{movie.moviename}</div>
        <p className="text-white text-base">{movie.movieInformation}</p>
        <CommentForm movieId={movie._id} userId={userId}/>
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
      <div className="fixed right-2 w-2/12 h-screen flex flex-col  bg-cyan-80 content-center align-middle text-center justify-center">
        <span className='text-white border-2 border-white h-[4rem] justify-center content-center align-middle'>Ah <span className="bg-orange-300 text-black px-2" > {movie.moviename}</span> really promising. What you wanna do?</span>
        <div className='flex h-[2rem]'>
          <button type="button" className="bg-green-800 border-white border-2 text-white w-1/2" onClick={openModal}>Call</button>
          <button type="button" className="bg-orange-500 border-white border-2 text-black w-1/2">Hold</button>
        </div>
        
      </div>
    </div>
    </>
  );
        }
};

export default MovieCard;
