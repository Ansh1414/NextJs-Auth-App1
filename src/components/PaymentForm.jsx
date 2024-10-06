// components/PaymentForm.js
"use client"
import { useState } from 'react';
import axios from 'axios';
import RightNav from './UI/rightNav'
const PaymentForm = () => {
    const [amount, setAmount] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [param1, setParam1] = useState('');
    const [param2, setParam2] = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/payment/initiate', {amount});

            if (response.data.redirectUrl) {
                window.location.href = response.data.redirectUrl; // Redirect to PhonePe payment page
            } else {
                console.error('Error initiating payment:', response.data.error);
            }
        } catch (error) {
            console.error('Error initiating payment:', error.response?.data || error.message);
        }
    };

    return (
        // <form onSubmit={handlePayment} >
       
        //     <div className="py-2">
        //         <label>Mobile Number</label>
        //         <input
        //         className="text-black "
        //             type="text"
        //             value={mobileNumber}
        //             onChange={(e) => setMobileNumber(e.target.value)}
        //             required
        //         />
        //     </div>
        //     <div className="py-2">
        //         <label>Param1</label>
        //         <input
        //         className="text-black "
        //             type="text"
        //             value={param1}
        //             onChange={(e) => setParam1(e.target.value)}
        //         />
        //     </div>
        //     <div className="py-2">
        //         <label>Param2</label>
        //         <input
        //         className="text-black "
        //             type="text"
        //             value={param2}
        //             onChange={(e) => setParam2(e.target.value)}
        //         />
        //     </div>
            
        // </form>
        <>
       
        <div className="border-2 h-screen content-center">
        <RightNav/>
                 <div className="py-2">
                <label>Amount</label>
                <input
                className="text-black "
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <button className="align-middle text-center bg-blue-500" type="button" onClick={handlePayment}>Pay Now</button>
        </div>
        
        </>
    );
};

export default PaymentForm;
