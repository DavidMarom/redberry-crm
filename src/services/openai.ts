import http from '@/services/http';

export function getRecommendation(array: any) {
    return http.post(`openai`, { notesArray: array })
        .then((response: any) => response.data)
        .catch((error: any) => error)
}
