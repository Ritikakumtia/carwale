const express = require('express');
const connection  = require('./database/database');
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const brandRoutes = require('./routes/brandRoutes')
const carRoutes = require('./routes/carRoutes')
const cors = require('cors')
const app = express();

app.use(cors());

app.use(express.json())
dotenv.config()

connection();

app.use(express.static('uploads/'));

app.use('/api/user',userRoutes);
app.use('/api/brand',brandRoutes);
app.use('/api/car',carRoutes);

// Temporary seed route for easy database seeding after deployment
// Remove this route after seeding your database
app.get('/seed-data', async (req, res) => {
    try {
        const { seedDatabase } = require('./scripts/seedData');
        await seedDatabase();
        res.json({ 
            success: true,
            message: 'Database seeded successfully with sample data!',
            data: {
                brands: 10,
                cars: 10
            }
        });
    } catch (error) {
        console.error('Seeding error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to seed database',
            error: error.message 
        });
    }
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: '🚗 Carwale API is running!',
        status: 'healthy',
        endpoints: {
            brands: '/api/brand/getAll-brand',
            cars: '/api/car/getAll-car',
            seed: '/seed-data'
        }
    });
});

app.listen(process.env.PORT,() => {
    console.log('Car Running on port 5000');
})
