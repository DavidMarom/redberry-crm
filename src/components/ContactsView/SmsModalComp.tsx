import React from 'react';
import { Button } from "@nextui-org/react";
import { Card01, Popup } from "@/components";

const SmsModalComp = (props: any) => {
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
                fetch('/api/sms', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: smsText,
                        toPhone: convertPhoneToWhatsapp(props.selectedSMS)
                    })
                })
                setSmsText('');
                props.setShowSmsModal(false);
            }}>
                Send
            </Button>
            <Button onClick={() => props.setShowSmsModal(false)}>Close</Button>

        </Card01>
    </Popup>
}

export default SmsModalComp;
