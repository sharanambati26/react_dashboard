import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; 

// Get all widgets
export const getWidgets = () => axios.get(`${API_URL}/widgets`);

// Add a new widget
export const addWidget = (widget) => axios.post(`${API_URL}/addWidget`, widget);

// Remove a widget
export const deleteWidget = (widget) => axios.post(`${API_URL}/removeWidget`, widget);


// hide widget 
export const hideWidgets = (data) => axios.post(`${API_URL}/hideWidgets`, data);