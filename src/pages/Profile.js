import React, { useState, useEffect } from 'react';
import { db, collection, query, where, getDocs, addDoc } from '../firebase';
import './Profile.css';

const Profile = ({ userId, currentUserId }) => {
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const userQuery = query(collection(db, 'users'), where('id', '==', userId));
      const userDoc = await getDocs(userQuery);
      setProfile(userDoc.docs[0].data());
    };

    const fetchPosts = async () => {
      const postsQuery = query(collection(db, 'tweets'), where('userId', '==', userId));
      const postsSnapshot = await getDocs(postsQuery);
      const fetchedPosts = postsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    };

    const checkFollowing = async () => {
      const followingQuery = query(collection(db, 'follows'), where('followerId', '==', currentUserId), where('followedId', '==', userId));
      const followingSnapshot = await getDocs(followingQuery);
      setIsFollowing(!followingSnapshot.empty);
    };

    fetchProfile();
    fetchPosts();
    checkFollowing();
  }, [userId, currentUserId]);

  const handleFollow = async () => {
    if (isFollowing) {
      // Unfollow logic
    } else {
      await addDoc(collection(db, 'follows'), {
        followerId: currentUserId,
        followedId: userId
      });
      setIsFollowing(true);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img className="profile-picture" src={profile.profilePicture} alt="Profile" />
        <h2>{profile.username}</h2>
        <p>{profile.bio}</p>
        {userId !== currentUserId && (
          <button onClick={handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>
      <div className="profile-feed">
        {posts.map(post => (
          <div key={post.id} className="tweet">
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="Tweet" />}
            {/* Add like and comment functionality here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
