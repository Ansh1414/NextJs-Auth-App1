import axios from 'axios'
export const handleAddPayment = async ({amount}) => {
    console.log('--- handleAddPayment ---');
    if (amount < 10) {
       return false;
    }
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
