import nodemailer from 'nodemailer';
import {User} from "@/models/userModel.js"
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        console.log('hashedToken--',hashedToken);
        let foundUser;
        //const filter = { userId };
        const update = {verifyToken: hashedToken,verifyTokenExpiry:Date.now() + 3600000};
        if (emailType === "VERIFY") {
            
            console.log('emailType--',emailType);
            foundUser=await User.findByIdAndUpdate(userId,update )
            console.log('foundUser--',foundUser);
        } else if (emailType === "RESET"){
            user=await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
            service:'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER, // your Gmail address
                pass: process.env.GMAIL_APP_PASS  // your Gmail password or app-specific password
                // Make sure to add these credentials to your .env file
            }
          });
          

        const mailOptions = {
            from: 'movies@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
     
        console.log('foundUser1--',foundUser);
       return Response.json({message:mailresponse})
    } catch (error) {
        throw new Error(error.message);
    }
}