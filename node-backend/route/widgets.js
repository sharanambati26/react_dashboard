import express from 'express';
import { addWidget, getWidgets, removeWidget, hideWidgets } from '../controller/widget.controller.js';

const router = express.Router();

router.get("/widgets", getWidgets);
router.post("/addWidget", addWidget);
router.post("/removeWidget", removeWidget);
router.post("/hideWidgets", hideWidgets);

export default router;