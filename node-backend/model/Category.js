import mongoose, { Schema } from "mongoose";

const widgetSchema = new mongoose.Schema({
    id: String,
    name: String,
    content: String,
    isActive: Number,
    created: {
        type: Date,
        default: Date.now
    }
});

const categorySchema = new mongoose.Schema({
    name: String,
    widgets: [widgetSchema],
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Category", categorySchema);