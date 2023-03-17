import express from 'express';
import cors from 'cors';

const app = express();

// Allow requests from all domains
app.use(cors());

// Listen for requests
app.listen(5001, () => console.log('API running on port 5001'));

// Handle requests to the root URL
app.get('/', (req, res) => {
  const data = {
    message: 'My API running'
  };
  res.json(data);
});
