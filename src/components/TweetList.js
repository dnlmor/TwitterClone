import React from 'react';
import './TweetList.css';

const TweetList = ({ tweets, likeTweet }) => {
  return (
    <div className="tweet-list">
      {tweets.map(tweet => (
        <div key={tweet.id} className="tweet">
          <h3>{tweet.username}</h3>
          <p>{tweet.content}</p>
          {tweet.image && <img src={tweet.image} alt="Tweet" />}
          <div className="tweet-actions">
            <button onClick={() => likeTweet(tweet.id)}>Like ({tweet.likes})</button>
            <button>Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TweetList;
