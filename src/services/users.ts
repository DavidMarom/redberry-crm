import http from '@/services/http';

export function getUser(userId: string) {
    return http.get(`users/${userId}`)
        .then((res) => res.data)
        .catch((error) => error);
}

export function updateUser(userId: string, user: object) {
    return http.patch(`users`, { uid: userId, ...user })
        .then((res) => res.data)
        .catch((error) => error);
}
