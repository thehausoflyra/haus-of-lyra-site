const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression for better performance/SEO
app.use(compression());

// Serve static assets (images, CSS, JS) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the Seniors Page
app.get('/seniors', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'seniors.html'));
});

// Custom 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} to test locally.`);
});
