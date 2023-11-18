"use client"
import { gprovider } from '@/services/firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export default function Home() {



  async function doSignup() {
    const auth = getAuth();
    signInWithPopup(auth, gprovider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken ?? null;
        const user = result.user;
        let usr = {
          name: user.displayName,
          mail: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          token: token
        }

        console.log(usr);

      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Overview</h1>
      <button onClick={doSignup}>Login with google</button>

    </div>
  )
}
