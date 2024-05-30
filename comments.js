// Create web server
// 1. Require express
// 2. Create an express app
// 3. Create an endpoint for GET /comments
// 4. Create an endpoint for POST /comments
// 5. Create an endpoint for DELETE /comments
// 6. Listen on port 3000
// 7. Read the comments from the file comments.json and serve them as a response to GET /comments
// 8. Append the new comment to the file comments.json and send a response to the client
// 9. Delete a comment by id from the file comments.json and send a response to the client
// 10. Add error handling
// 11. Add validation

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(bodyParser.json());

const COMMENTS_FILE = 'comments.json';

app.get('/comments', (req, res) => {
  fs.readFile(COMMENTS_FILE, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred while reading the comments file');
      return;
    }

    try {
      const comments = JSON.parse(data);
      res.send(comments);
    } catch (error) {
      res.status(500).send('An error occurred while parsing the comments file');
    }
  });
});

app.post('/comments', [
  check('author').isString(),
  check('text').isString(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send(errors.array());
    return;
  }

  fs.readFile(COMMENTS_FILE, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred while reading the comments file');
      return;
    }

    try {
      const comments = JSON.parse(data);
      const newComment = {
        id: comments.length + 1,