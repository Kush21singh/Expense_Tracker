import React, { useState } from "react";
import './Profile.css';
import db from './FirebaseConfig'; // Import your Firebase configuration

function Profile() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const profileCompletionPercentage = 64;

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const handleUpdateProfile = () => {
    // Construct the request payload
    const requestData = {
      idToken: 'user-id-token', // You should provide a valid user's ID token here
      displayName: fullName,
      photoUrl: photoUrl,
    };

    // Make the HTTP POST request to update the user's profile
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (response.ok) {
          // Profile update successful
          console.log('Profile updated successfully');
        } else {
          // Profile update failed
          console.error('Profile update failed');
        }
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <div>
      <h3>Winners never quit, Quitters never win.</h3>
      <p>
        Your Profile is {profileCompletionPercentage}% completed. A complete Profile has higher chances of landing a job.
        <a href="#" onClick={toggleContactForm}> Complete now</a>
      </p>

      {showContactForm && (
        <div>
          <h4>Contact Details</h4>
          <form>
            <label>Full Name: <input type="text" onChange={(e) => setFullName(e.target.value)} /></label>
            <label>Profile Photo URL: <input type="text" onChange={(e) => setPhotoUrl(e.target.value)} /></label>
            <button type="button" className="update-button" onClick={handleUpdateProfile}>Update</button>
            <button type="button" className="cancel-button" onClick={toggleContactForm}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Profile;
