import http from '@/services/http';

export const sendWelcomeEmail = (mail: string | null, name: string | null) => {
    if (!mail || !name) return;
    http.post('sendwelcommail', { mail: mail, name: name }
    ).then((response: any) => { console.log(response) })
        .catch((error: any) => { console.log(error) });
}

export const sendEmail = (mail: string | null, recName: string | null, fromName: string | null, subject: string | null, body: string | null) => {
    if (!mail || !recName || !fromName || !subject || !body) return;
    http.post('sendmail', { mail: mail, recName: recName, fromName: fromName, subject: subject, body: body }
    ).then((response: any) => { console.log(response) })
        .catch((error: any) => { console.log(error) });
}
