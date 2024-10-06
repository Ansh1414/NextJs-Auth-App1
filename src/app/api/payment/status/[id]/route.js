import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {PaymentTransaction} from "@/models/paymentTransactionModel.js"
import { getToken,decode } from "next-auth/jwt";
import sha256 from "crypto-js/sha256";
import axios from "axios";

connect()

export async function POST(NextRequest) {
  console.log('payment status route body inside--');
  
      
  //const OAuthTokenJWT = await getToken({ req:NextRequest, secret: process.env.NEXTAUTH_SECRET });
  
  
  const param1 = url.searchParams.get('param1');
  const param2 = url.searchParams.get('param2');
  console.log('==in payment status  route param1  ---',param1);
  console.log('==in payment status  route param2  ---',param2);
  // Access a specific cookie by its name
  const data=await NextRequest.formData();
  console.log('==in payment status  route formData ---',data);
  const status = data.get("code");
  const merchantId = data.get("merchantId");
  const transactionId = data.get("transactionId");
  const amount=data.get("amount")/100;
  const providerReferenceId=data.get("providerReferenceId");
  const st =
    `/pg/v1/status/${merchantId}/${transactionId}` +
    process.env.NEXT_PUBLIC_SALT_KEY;
  // console.log(st)
  const dataSha256 = sha256(st);

  const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
  console.log(checksum);




  const options = {
    method: "GET",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };
  


  const url = new URL(NextRequest.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  // return NextResponse.redirect(`${baseUrl}/payment/postPayment/success`, {
  //   status: 301,
  // });
  // CHECK PAYMENT STATUS
  const response = await axios.request(options);
  console.log("r===", response);

  //saving transaction data to database
      const newPaymentTransaction = new PaymentTransaction({
        userId:param1,
        code:status,//filePath,
        merchantId,
        transactionId,
        amount,
        providerReferenceId
        
      })
      console.log('newPaymentTransaction created--',newPaymentTransaction);

      const savedPaymentTransaction = await newPaymentTransaction.save()
      console.log('savedPaymentTransaction --',savedPaymentTransaction);
//end saving data


  if (response.data.code == "PAYMENT_SUCCESS")
  return NextResponse.redirect(`${baseUrl}/`,{
    status: 301,
  });
else return NextResponse.redirect(`${baseUrl}/payment/postPayment/failure`,{
  // a 301 status is required to redirect from a POST to a GET route
  status: 301,
});


}