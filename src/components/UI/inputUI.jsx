import React,{useState} from 'react'

function InputUI({handleAddMoney}) {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const handleAmountUpdate=(e)=>{
        setAmount(e.target.value);
    }
    const addMoney=async ()=>{
        try{const data=await handleAddMoney(amount);
            setMessage(`Successfully added ${data.amount} to your wallet!`);
        }catch(error){
            setMessage(error.message);
        }
    }
  return (
    <>
    <span className="px-2">INR</span><input
                className='text-black'
                type="number"
                value={amount}
                onChange={handleAmountUpdate}
                placeholder="Enter amount"
            />
    <button type="button" className='bg-orange-500 text-black' onClick={addMoney}>Add Money</button>
    {message && <p>{message}</p>}
    </>
    
  )
}

export default InputUI