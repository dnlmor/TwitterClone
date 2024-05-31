import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, addDoc, onSnapshot } from '../firebase';
import TweetList from '../components/TweetList';
import './Home.css';

const Home = ({ currentUserId }) => {
  const [tweetContent, setTweetContent] = useState('');
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const tweetsSnapshot = await getDocs(collection(db, 'tweets'));
      const fetchedTweets = tweetsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(fetchedTweets);
    };

    fetchTweets();

    const unsubscribe = onSnapshot(collection(db, 'tweets'), (snapshot) => {
      const updatedTweets = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(updatedTweets);
    });

    return () => unsubscribe();
  }, []);

  const handleTweetSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'tweets'), {
      userId: currentUserId,
      content: tweetContent,
      createdAt: new Date(),
    });
    setTweetContent('');
  };

  return (
    <div className="home-page">
      <div className="main-content">
        <form onSubmit={handleTweetSubmit}>
          <textarea
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            placeholder="What's happening?"
          />
          <button type="submit">Tweet</button>
        </form>
        <TweetList tweets={tweets} />
      </div>
    </div>
  );
};

export default Home;
