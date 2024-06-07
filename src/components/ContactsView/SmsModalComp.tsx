import React from 'react';
import { Button } from "@nextui-org/react";
import { Card01, Popup } from "@/components";
import { sendSMS } from "@/services/sms";
import { useRouter } from 'next/navigation';


const SmsModalComp = (props: any) => {
    const router = useRouter();
    const [smsText, setSmsText] = React.useState('' as string);

    const convertPhoneToWhatsapp = (phone: any) => {
        if (phone.charAt(0) === '+') return phone;
        const updatedPhone = phone.replace(/^0|[^0-9]/g, '')
        return `+972${updatedPhone}`;
    }

    return <Popup>
        <Card01 width={"450px"} height="400px" justifycontent="space-between">

            <h2>Send SMS to {convertPhoneToWhatsapp(props.selectedSMS)}</h2>

            <textarea
                onChange={(e) => setSmsText(e.target.value)}
                name="message" id="message" placeholder='Your message' style={{ width: "100%", height: "200px" }}></textarea>
            <Button color="primary" onClick={() => {
                sendSMS(convertPhoneToWhatsapp(props.selectedSMS), smsText);
                alert('SMS sent');
                setSmsText('');
                props.setShowSmsModal(false);
                router.push('/Contacts')

            }}>
                Send
            </Button>
            <Button onClick={() => props.setShowSmsModal(false)}>Close</Button>

        </Card01>
    </Popup>
}

export default SmsModalComp;
