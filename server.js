// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In production, move this to an environment variable
const SECRET_KEY = '_tXoU-W_HBxgsDr5fuwRrWPTWKh3Ech-SEzIHqs2pqo';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to generate Intercom user JWT
app.post('/generate-intercom-jwt', (req, res) => {
  const { user_id, name, email } = req.body;
  if (!user_id || !name || !email) {
    return res.status(400).json({ error: 'Missing required fields: user_id, name, email' });
  }

  const payload = {
    user_id,
    name,
    email,
    role: 'user', // optional, can add any Intercom claims
  };

  const token = jwt.sign(payload, SECRET_KEY, { algorithm: 'HS256', expiresIn: '1h' });

  res.json({ intercom_user_jwt: token });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
