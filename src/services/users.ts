import http from '@/services/http';

export function updateUser(userId: string, user: object) {
    return http.patch(`users`, { uid: userId, ...user })
        .then((res) => res.data)
        .catch((error) => error);
}
