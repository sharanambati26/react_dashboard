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

// Default Categories
const categories = [
    { name: 'Executive Dashboard', widgets: [] },
    { name: 'CWPP Dashboard', widgets: [] },
    { name: 'Registry Scan', widgets: [] },
];

const insertCategories = async () => {
    try {
        const existingCategories = await Category.find({}).exec();
        if (existingCategories.length > 0) {
            console.log('Categories already exist. No need to insert.');
            return;
        }
        await Category.insertMany(categories);
        console.log('Categories inserted successfully');
    } catch (err) {
        console.error('Error inserting categories:', err);
    } 
};

// Run the insertCategories function
insertCategories();