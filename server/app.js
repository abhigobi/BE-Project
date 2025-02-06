const express = require('express');
const cors = require("cors");
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// handling cors polices
const corsOptions = {
    origin: ["http://localhost:5173", "http://192.168.0.101:5173"],
    methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Admin Routes
app.use('/api/admin', adminRoutes);

// Student Routes
app.use('/api/student', studentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});