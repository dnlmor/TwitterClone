import React from 'react';

const Tweet = ({ tweet }) => {
  return (
    <div className="tweet">
      <h3>{tweet.username}</h3>
      <p>{tweet.content}</p>
    </div>
  );
};

export default Tweet;
