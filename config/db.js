const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const dbConnecct = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected Successfully ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database failed to connect ${error.message}`);
        process.exit(1)
    }
}