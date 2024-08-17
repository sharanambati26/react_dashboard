import express from 'express';
import cors from 'cors';
import widgetsRoute from './route/widgets.js';
import connectMongoDB from './db.js';

const app = express();
app.use(cors());
app.use(express.json()); 

app.use('/api', widgetsRoute);

app.listen(5001, async () => {
    await connectMongoDB();
    console.log("Server started listening on 5001...");
})