import React from 'react';
import { Button } from "@nextui-org/react";
import { Card01, Popup } from "@/components";
import { sendSMS } from "@/services/sms";
import { useRouter } from 'next/navigation';
import { convertPhoneToGlobal } from '@/utils/contactsUtils';

const SmsModalComp = (props: any) => {
    const router = useRouter();
    const [smsText, setSmsText] = React.useState('' as string);

    const submitHandler = () => {
        sendSMS(convertPhoneToGlobal(props.selectedSMS), smsText);
        alert('SMS sent');
        setSmsText('');
        props.setShowSmsModal(false);
        router.push('/Contacts')
    }

    return <Popup>
        <Card01 width={"450px"} height="400px" justifycontent="space-between">
            <h2>Send SMS to {convertPhoneToGlobal(props.selectedSMS)}</h2>
            <textarea
                onChange={(e) => setSmsText(e.target.value)}
                name="message" id="message" placeholder='Your message' style={{ width: "100%", height: "200px" }}></textarea>
            <Button color="primary" onClick={submitHandler}>Send</Button>
            <Button onClick={() => props.setShowSmsModal(false)}>Close</Button>
        </Card01>
    </Popup >
}

export default SmsModalComp;
