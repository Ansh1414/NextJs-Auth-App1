
import {PaymentTransaction} from "@/models/paymentTransactionModel.js"
import { getToken,decode } from "next-auth/jwt";
import mongoose from "mongoose";
export async function POST(NextRequest) {
    const OAuthTokenJWT = await getToken({ req:NextRequest, secret: process.env.NEXTAUTH_SECRET });
    console.log('==in wallet fetch balance OAuthTokenJWT.userId ---',OAuthTokenJWT.userId);
  
   // const { amount } = await request.json();
   // console.log('received Amount',amount);
    // Here you would normally update the user's wallet in the database
    // For example:
    // const userId = getUserIdFromSession(); // Get the current user ID from session
    // await updateUserWallet(userId, amount);
    
    const userWallets = await PaymentTransaction.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(OAuthTokenJWT.userId), // Filter for the specific user ID
            },
        },
        {
            $group: {
                _id: '$userId',
                totalAmount: { $sum: '$amount' },
            },
        },
    ]);
    console.log('==in wallet fetch balance userWallets ---',userWallets);
    return new Response(JSON.stringify({ userWallets }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}