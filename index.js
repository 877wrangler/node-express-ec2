import express from 'express';

const app = express();

app.listen(5001, () => console.log('API running on port 5001'));

app.get('/', (req, res) => {
  const data = {
    message: 'My API running'
  };
  res.json(data);
});
