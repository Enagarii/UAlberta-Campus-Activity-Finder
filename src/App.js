import React, { useState } from "react";
import { auth, provider, signInWithPopup, signOut } from "./firebaseConfig";

function App() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the email is from the @ualberta.ca domain
      if (user.email.endsWith('@ualberta.ca')) {
        setUser(user); // Store user info if valid
        setErrorMessage(""); // Clear any previous error messages
      } else {
        // If email doesn't match, sign out the user and show an error message
        await signOut(auth);
        setErrorMessage("Please use your @ualberta.ca email to sign in.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user info
      setErrorMessage(""); // Clear any error messages
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <img src={user.photoURL} alt="User" width="100" />
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>Login with Google</button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
