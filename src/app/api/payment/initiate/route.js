// pages/api/payment/initiate.js
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import axios from 'axios';
import sha256 from "crypto-js/sha256";
import { getToken,decode } from "next-auth/jwt";
export async function POST(NextRequest) {
    const OAuthTokenJWT = await getToken({ req:NextRequest, secret: process.env.NEXTAUTH_SECRET });
    const userId=OAuthTokenJWT?.userId;
        const { amount, mobileNumber, param1, param2 } = await NextRequest.json();
        
        console.log('param3  ----',amount);
       

        const transactionid = "Tr-"+uuidv4().toString(36).slice(-6);
        // Prepare the payload
        //const transactionId = uuidv4(); // Generate a unique transaction ID
        const callbackUrl = `http://localhost:3000/api/payment/status?param1=${encodeURIComponent(userId || '')}&param2=${encodeURIComponent(userId || '')}`;

        const payload = {
            merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
            merchantTransactionId: transactionid,
            merchantUserId: 'MUID-'+uuidv4().toString(36).slice(-6),
            amount: amount*100,
            redirectUrl: callbackUrl,
            redirectMode: "POST",
            callbackUrl: callbackUrl,
            mobileNumber: '9999999999',
            param1: 'default_value_1',
            param2: 'default_value_2',
            paymentInstrument: {
              type: "PAY_PAGE",
            },
          };
        
          console.log(payload);
          //return false;
          const dataPayload = JSON.stringify(payload);
          console.log(dataPayload);
          
          const dataBase64 = Buffer.from(dataPayload).toString("base64");
          console.log(dataBase64);
    
    
      const fullURL =
            dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
         const dataSha256 = sha256(fullURL);
    
          const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
          console.log("c====",checksum);
    
    
    
        const UAT_PAY_API_URL =
        "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
    try{

            // Send the request to PhonePe
            
                const response = await axios.post(
                  UAT_PAY_API_URL,
                  {
                    request: dataBase64,
                  },
                  {
                    headers: {
                      accept: "application/json",
                      "Content-Type": "application/json",
                       "X-VERIFY": checksum,
                    },
                  }
                );
             console.log('response.data.status----',response.data.status);
            console.log('response----',response);
            console.log('response.data.data.instrumentResponse.redirectInfo.url----',response.data.data.instrumentResponse.redirectInfo.url);
            
            // Handle the response from PhonePe
            
            
            if (response.data && response.data.success) {
                //return res.status(200).json({ redirectUrl: response.data.redirectUrl });
                return NextResponse.json({
                    message: "Movie fetched successfully",
                    redirectUrl: response.data.data.instrumentResponse.redirectInfo.url,
                    success: true,
                    status:200
                    
                })
            } else {
                return NextResponse.json({
                    error: 'Payment initiation failed',
                    success: false,
                    status:500
                    
                })
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            return NextResponse.json({
                error,
                success: false,
                status:500
                
            })
        }
    
}
