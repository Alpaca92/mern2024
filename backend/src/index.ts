import express from 'express';

const app = express();

// app.use(express.json());

app.post('/hello', (req, res, next) => {
  console.log(req.body);

  return res.send('Hello World');
});

app.listen(5000, () => console.log('Server is running on port 5000'));
