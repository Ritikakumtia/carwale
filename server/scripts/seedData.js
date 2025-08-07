const mongoose = require('mongoose');
const dotenv = require('dotenv');
const brandModel = require('../models/carBrand');
const carModel = require('../models/carModel');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to MongoDB for seeding');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

// Read JSON files
const loadBrands = () => {
    try {
        const brandsPath = path.join(__dirname, '../data/brands.json');
        const brandsData = fs.readFileSync(brandsPath, 'utf-8');
        return JSON.parse(brandsData);
    } catch (error) {
        console.error('Error loading brands data:', error);
        return [];
    }
};

const loadCars = () => {
    try {
        const carsPath = path.join(__dirname, '../data/cars.json');
        const carsData = fs.readFileSync(carsPath, 'utf-8');
        return JSON.parse(carsData);
    } catch (error) {
        console.error('Error loading cars data:', error);
        return [];
    }
};

// Seed brands
const seedBrands = async () => {
    try {
        console.log('Seeding brands...');
        
        // Clear existing brands
        await brandModel.deleteMany({});
        
        const brands = loadBrands();
        const createdBrands = {};
        
        for (const brandData of brands) {
            const brand = new brandModel({
                name: brandData.name,
                slug: slugify(brandData.name, { lower: true }),
                brandPictures: brandData.brandPictures,
                carInvoleInThisBrand: []
            });
            
            const savedBrand = await brand.save();
            createdBrands[brandData.slug] = savedBrand._id;
            console.log(`Created brand: ${brandData.name}`);
        }
        
        return createdBrands;
    } catch (error) {
        console.error('Error seeding brands:', error);
        throw error;
    }
};

// Seed cars
const seedCars = async (brandIds) => {
    try {
        console.log('Seeding cars...');
        
        // Clear existing cars
        await carModel.deleteMany({});
        
        const cars = loadCars();
        const createdCars = [];
        
        for (const carData of cars) {
            const brandId = brandIds[carData.brand];
            
            if (!brandId) {
                console.warn(`Brand not found for car: ${carData.name}`);
                continue;
            }
            
            const car = new carModel({
                name: carData.name,
                slug: slugify(carData.name, { lower: true }),
                description: carData.description,
                price: carData.price,
                fuelType: carData.fuelType,
                transmission: carData.transmission,
                engineSize: carData.engineSize,
                mileage: carData.mileage,
                safetyrating: carData.safetyrating,
                warranty: carData.warranty,
                seater: carData.seater,
                size: carData.size,
                fuelTank: carData.fuelTank,
                brand: brandId,
                productPictures: carData.productPictures,
                shipping: carData.shipping
            });
            
            const savedCar = await car.save();
            createdCars.push(savedCar);
            
            // Update brand to include this car
            await brandModel.findByIdAndUpdate(
                brandId,
                { $push: { carInvoleInThisBrand: savedCar._id } }
            );
            
            console.log(`Created car: ${carData.name}`);
        }
        
        return createdCars;
    } catch (error) {
        console.error('Error seeding cars:', error);
        throw error;
    }
};

// Main seeding function
const seedDatabase = async () => {
    try {
        await connectDB();
        
        console.log('Starting database seeding...');
        
        // Seed brands first
        const brandIds = await seedBrands();
        console.log(`Created ${Object.keys(brandIds).length} brands`);
        
        // Seed cars
        const cars = await seedCars(brandIds);
        console.log(`Created ${cars.length} cars`);
        
        console.log('Database seeding completed successfully!');
        
        // Display summary
        const totalBrands = await brandModel.countDocuments();
        const totalCars = await carModel.countDocuments();
        
        console.log('\n=== SEEDING SUMMARY ===');
        console.log(`Total Brands: ${totalBrands}`);
        console.log(`Total Cars: ${totalCars}`);
        console.log('========================\n');
        
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    }
};

// Run seeding if called directly
if (require.main === module) {
    seedDatabase();
}

module.exports = {
    seedDatabase,
    seedBrands,
    seedCars,
    loadBrands,
    loadCars
};