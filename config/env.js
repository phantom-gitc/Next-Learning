import dotenv from 'dotenv';

dotenv.config();

// Validate required environment variables

if(!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
}

// Create immutable environment object 

const env = Object.freeze({

    MONGO_URI: process.env.MONGO_URI,
})

export default env;