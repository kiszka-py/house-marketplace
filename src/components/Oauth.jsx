import React from "react";
import googleIcon from "../assets/svg/googleIcon.svg";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Oauth() {
  const navigate = useNavigate();
  const location = useLocation();

  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      //   Check is user already exists
      if (!docSnap.exists()) {
        // Create user
        const userData = {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        };
        await setDoc(docRef, userData);
      }

      console.log({ user });
      console.log({ credential });

      //   Navigate to home page
      navigate("/");
    } catch (error) {
      toast.error("Could not authorize with Google.");
      console.error(error);
    }
  }

  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="Google" />
      </button>
    </div>
  );
}

export default Oauth;
