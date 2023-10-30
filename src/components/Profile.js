import React, { useState, useEffect } from "react";
import './Profile.css';
import { collection, getDoc, updateDoc } from 'firebase/firestore';
import { database } from './FirebaseConfig';

function Profile() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Track if user data is loaded

  const profileCompletionPercentage = 64;

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  useEffect(() => {
    // Function to retrieve user data from Firebase using ID token
    const getUserDataFromFirebase = (idToken) => {
      // Construct the request payload for getAccountInfo
      const requestData = {
        idToken: idToken,
      };

      // Make the HTTP POST request to get user data
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.users && data.users.length > 0) {
            const userData = data.users[0];
            setFullName(userData.displayName);
            setPhotoUrl(userData.photoUrl || ""); // Use the photo URL if available
            setIsDataLoaded(true);
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    };

    // Retrieve the user's ID token from wherever it's stored (e.g., localStorage)
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      // Fetch user data from Firebase using the user's ID token
      getUserDataFromFirebase(userToken);
    }
  }, []);

  const handleUpdateProfile = () => {
    // Update the user's profile in Firebase and localStorage
    const userRef = collection(database, 'users').doc('user-id');
    updateDoc(userRef, {
      fullName,
      photoUrl,
    })
      .then(() => {
        console.log('Profile updated in Firebase successfully');
        // Save user data to localStorage
        localStorage.setItem("userFullName", fullName);
        localStorage.setItem("userPhotoUrl", photoUrl);
      })
      .catch((error) => {
        console.error('Error updating profile in Firebase:', error);
      });
  };

  return (
    <div>
      <h3>Winners never quit, Quitters never win.</h3>
      <p>
        Your Profile is {isDataLoaded ? profileCompletionPercentage : 0}% completed. A complete Profile has higher chances of landing a job.
        <a href="#" onClick={toggleContactForm}> Complete now</a>
      </p>

      {showContactForm && (
        <div>
          <h4>Contact Details</h4>
          <form>
            <label>Full Name: <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} /></label>
            <label>Profile Photo URL: <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} /></label>
            <button type="button" className="update-button" onClick={handleUpdateProfile}>Update</button>
            <button type="button" className="cancel-button" onClick={toggleContactForm}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Profile;
