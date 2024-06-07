import http from '@/services/http';

export const sendSMS = (
    toPhone: string | null,
    message: string | null
) => {
    if (!toPhone || !message) return;
    http.post('sms', { message, toPhone }
    )
}