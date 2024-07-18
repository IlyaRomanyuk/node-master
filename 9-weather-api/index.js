import express from 'express';
import bodyParser from 'body-parser';
import { weatherRouter } from './routes/weather.js';

const port = 3001;
const app = express();

app.use(bodyParser.json());

app.use('/weather', weatherRouter);

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server is started on ${port} port`);
});
