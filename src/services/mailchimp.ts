import http from '@/services/http';

export const sendWelcomeEmail = async (mail: string | null, name: string | null) => {
    if (!mail || !name) return;
    http.post('sendwelcommail', { mail: mail, name: name }
    ).then((response: any) => { console.log(response) })
        .catch((error: any) => { console.log(error) });
}
