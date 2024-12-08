import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import uploadRoutes from './routes/uploadRoutes';
import peopleRoutes from './routes/peopleRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://yassinbehery:xzc5XbWCCWmuSVIE@cluster0.rwvwq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url} Content-Type: ${req.headers['content-type']}`);
    next();
});

// Apply body-parser only for specific routes or HTTP methods
app.use('/api/upload', bodyParser.json());
app.use('/api/upload', bodyParser.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    const dbState = mongoose.connection.readyState; // 1 = connected
    res.status(200).json({
        status: 'OK',
        server: 'Running',
        database: dbState === 1 ? 'Connected' : 'Disconnected',
    });
});

app.use(cors());

// API routes
app.use('/api/upload', uploadRoutes);
app.use('/api/people', peopleRoutes);

// Catch-all for undefined routes
app.use((req, res) => {
    console.error(`Route not found: ${req.method} ${req.url}`);
    res.status(404).json({ error: 'Route not found' });
});

// Start the server and connect to the database
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });
