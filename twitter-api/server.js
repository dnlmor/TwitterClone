const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let tweets = [
  { id: 1, username: 'User1', content: 'This is a tweet!' },
  { id: 2, username: 'User2', content: 'Hello world!' },
];

// Fetch all tweets
app.get('/tweets', (req, res) => {
  res.json(tweets);
});

// Post a new tweet
app.post('/tweets', (req, res) => {
  const { content } = req.body;
  const newTweet = { id: tweets.length + 1, username: 'User', content };
  tweets.unshift(newTweet);
  res.json(newTweet);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
