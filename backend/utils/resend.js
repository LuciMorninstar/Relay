import {Resend} from "resend"
import "dotenv/config"
import { emailTemplate } from "./emailTemplate.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async(receiverFullName,receiverEmailId)=>{

    try {
        const emailResult = await resend.emails.send({
            from:process.env.RESEND_FROM_EMAIL,
            to:receiverEmailId,
            subject:"Welcome to Relay (Your chat app)",
            html:emailTemplate(receiverFullName)
        })

        console.log("Email sent successfully to" + receiverEmailId);

       return emailResult;


        
    } catch (error) {
        console.log("Error in the sendEmail", error);
        throw error;
        
    }

}


