import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseConfig } from "@/hooks/firebase-config";

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  // 重新導向
  signInWithRedirect(auth, provider);
};

export const showGoogleLogin = (callback) => {
  const auth = getAuth();
  let loginStatus = { success: false, data: null, error: null };

  // Result from Redirect auth flow.
  getRedirectResult(auth)
    .then(async (result) => {
      if (result) {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(token);
        console.log(user);

        // 準備要發送的資料
        const userData = {
          token,
          uid: user.uid,
          providerId: user.providerId,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        try {
          const response = await fetch(
            "http://localhost:3005/api/google-login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            }
          );
          const data = await response.json();
          console.log(data);
          // 處理後端回應
          // Call the callback function with the user data
          callback(data);
        } catch (error) {
          console.error("Error sending user data to backend:", error);
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  // Listening for auth state changes.
  onAuthStateChanged(auth, (user) => {});
};
