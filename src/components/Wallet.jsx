"use client"
import { useEffect, useState } from 'react';
import {handleAddPayment} from '@/helpers/addPayment.js'
import axios from 'axios'



const Wallet = () => {
   // const [amount, setAmount] = useState(0);
    
   const [fetchedBalance,setFetchedBalance]=useState('')
  
   const [isMainWalletOpen, setIsMainWalletOpen] = useState(false);
   const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
   const [amount, setAmount] = useState(10);
   const [showMinNumberError,setShowMinNumberError]=useState(false);
    console.log("wallet success");
    const toggleMainWalletMenu = () => {
        setIsAddMoneyOpen(false);
        setIsMainWalletOpen(!isMainWalletOpen);
    };
    const toggleAddMoneyMenu = () => {
        setIsMainWalletOpen(!isMainWalletOpen);
         setIsAddMoneyOpen(!isAddMoneyOpen);
    };
    
    
    const handleDisplayBalance = async () => {
        let displayAmt={}
        const response = await axios.post("/api/wallet/fetchBalance", { displayAmt });

        console.log("wallet success", response.data.userWallets[0].totalAmount.$numberDecimal);
        if (response.status==200) {
            setFetchedBalance(response.data.userWallets[0].totalAmount.$numberDecimal)
            
        } else {
            throw new Error('Failed to add money.');
        }

    };
    
    useEffect(() => {
    handleDisplayBalance().then((resp)=>{
            console.log('disp',resp);
        }).catch((err)=>{
            console.log('err',err);
        })

    }, []);
    return (
    <>
        
                      
                        <div className="float-right mt-12 cursor-pointer" >
            {/* <InputUI handleAddMoney={handleAddMoney}/> */}
            <div>
                <span className="text-white font-bold p-2 bg-amber-700 rounded-xl border-2 text-center hover:bg-blue-500 text-2xl" onClick={toggleMainWalletMenu}><span className="text-2xl">💎</span> ₹{fetchedBalance}</span>
            </div>

            {
                isMainWalletOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-200 rounded-md shadow-lg z-10 ">
                    <ul className="py-2">
                        <span className='text-2xl hover:border-slate-100 px-3 transform transition-transform duration-200 hover:scale-105 ' onClick={()=>(setIsMainWalletOpen(!isMainWalletOpen))}>{'⬅️'}</span>
                        <li className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer" onClick={toggleAddMoneyMenu}>Deposit</li>
                        <li className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-not-allowed opacity-50">Transactions</li>
                    </ul>
                </div>
                
            )}
            {
                isAddMoneyOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black text-white border border-gray-200 rounded-md shadow-lg z-10">
                    <ul className="py-2">
                        <span className=' text-2xl px-3 transform transition-transform duration-200 hover:scale-105'  onClick={toggleAddMoneyMenu}>{'⬅️'}</span>
                        <li className="border-2 border-black text-black">
                            <input
                                className="text-white bg-black w-full border-2 border-blue-500"
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
                        </li>
                        <li> <button className="align-middle p-2 mt-2 text-center bg-blue-500 w-1/2   text-white rounded-xl border-2 border-black" type="button" 
                        onClick={async ()=>{
                            const response=await handleAddPayment({amount});
                            setShowMinNumberError(!response);
                            }}>
                                Pay Now</button></li>
                        </ul>
                </div>
                
            )}
        </div>
        
        
    </>
    );
};

export default Wallet;
