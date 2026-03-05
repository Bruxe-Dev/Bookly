require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected Successfully ${conn.connection.host}`);
        console.log(`Databse: ${conn.connection.name}`)
    } catch (error) {
        console.error(`Database failed to connect ${error.message}`);
        process.exit(1);
    }
};

module.exports = dbConnect