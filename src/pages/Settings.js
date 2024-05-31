import React, { useState } from 'react';
import { db, collection, doc, updateDoc, query, where, getDocs } from '../firebase';
import './Settings.css';

const Settings = ({ currentUserId }) => {
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [bio, setBio] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, 'users', currentUserId);
    await updateDoc(userDoc, {
      username,
      profilePicture,
      bio,
    });
    // Additional logic to handle the update
  };

  const checkFollowing = async (userId) => {
    const followingQuery = query(collection(db, 'follows'), where('followerId', '==', currentUserId), where('followedId', '==', userId));
    const followingSnapshot = await getDocs(followingQuery);
    return !followingSnapshot.empty;
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Profile Picture URL</label>
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </div>
        <div>
          <label>Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Settings;
