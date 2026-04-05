import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./config.js";

export const loginUser = async (login, password) => {
    const email = login.includes('@') ? login : `${login.toLowerCase()}@wirtualnysystemrp.pl`;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true };
    } catch (error) {
        return { success: false };
    }
};

export const logoutUser = () => signOut(auth);
