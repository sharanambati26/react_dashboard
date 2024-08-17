# React Dashboard

This project features a React frontend with a Node.js backend connected to MongoDB Atlas.

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/sharanambati26/react_dashboard.git
   cd react_dashboard
   ```

2. **Frontend Setup**

   ```bash
   npm install
   npm start
   ```

3. **Backend Setup**

   ```bash
   cd node-backend
   npm install
   node server.js
   ```

## Requirements

- **Node.js**: Version 18
- **MongoDB Atlas**: For database management

## MongoDB Atlas Configuration

1. **Log in to MongoDB Atlas**: Visit [MongoDB Atlas](https://cloud.mongodb.com/) and sign in.

2. **Navigate to Database Access**:
   - Click on **Database Access** in the left sidebar.

3. **Add IP Address**:
   - Scroll down to the **Network Access** section.
   - Click **Add IP Address**.
   - Choose **Add Current IP Address** to add your current IP address automatically, or enter the IP address manually and click **Confirm**.
     
4. **Add Connection String**:
   - Edit db.js in node-backend:
   - Replace [username], [password], and [database] with your MongoDB Atlas credentials in the connection string:

---
