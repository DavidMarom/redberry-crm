import { setUserProfile, setIsLogged, setStoreUser } from "@/store/user";
import { googleSignup, googleSignOut } from "@/services/auth";
import { setToStorage } from '@/utils/utils';
import http from "@/services/http";
import { sendWelcomeEmail } from '@/services/mailchimp';

export const clearUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("contacts");
    localStorage.removeItem("notes");
    setUserProfile(false);
    setIsLogged(false);
}

export const signupHandler = async () => {
    const res = await googleSignup();
    if (res) {
        // Save the google user info to local storage and store
        setToStorage("user", res);
        setStoreUser(res ?? "");
        setIsLogged(true);

        // Check if DB has the user
        http.get(`users/${res.uid}`).then((response: any) => {
            if (!response.data) {
                // If not, add the user to DB and send welcome email
                http.post('users', res)
                    .then((response: any) => { console.log(response) })
                    .catch((error: any) => { console.log(error) })
                sendWelcomeEmail(res.mail, res.name)
            }
        })
        setIsLogged(true);
    }
}
