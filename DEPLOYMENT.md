# 🚀 Carwale Deployment Guide

This guide provides step-by-step instructions for deploying the Carwale application on Render.com with MongoDB Atlas.

## 📋 Prerequisites

Before deploying, ensure you have:

1. **GitHub Repository**: Your code should be pushed to a GitHub repository
2. **MongoDB Atlas Account**: For cloud database hosting
3. **Google Drive API Credentials**: For image storage
4. **Braintree Account**: For payment processing
5. **Render Account**: For hosting services

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new account or sign in
3. Create a new cluster (choose the free tier)
4. Wait for cluster creation (5-10 minutes)

### Step 2: Configure Database Access

1. In your cluster, go to **Database Access**
2. Click **Add New Database User**
3. Create a user with **Read and write to any database** permissions
4. Note down the username and password

### Step 3: Configure Network Access

1. Go to **Network Access**
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (0.0.0.0/0)
4. Confirm the changes

### Step 4: Get Connection String

1. In your cluster, click **Connect**
2. Choose **Connect your application**
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `carwale`

## 🔑 Google Drive API Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google Drive API**

### Step 2: Create Service Account

1. Go to **IAM & Admin** > **Service Accounts**
2. Click **Create Service Account**
3. Fill in the details and create
4. Click on the created service account
5. Go to **Keys** tab > **Add Key** > **Create New Key**
6. Choose **JSON** format and download the file
7. Rename the file to `cred.json`

### Step 3: Create Google Drive Folders

1. Create two folders in Google Drive:
   - One for car images
   - One for brand logos
2. Share both folders with the service account email (from cred.json)
3. Give **Editor** permissions
4. Note down the folder IDs from the URLs

## 💳 Braintree Setup

### Step 1: Create Braintree Account

1. Go to [Braintree](https://www.braintreepayments.com/)
2. Sign up for a sandbox account
3. Complete the verification process

### Step 2: Get API Credentials

1. In Braintree Dashboard, go to **Settings** > **API**
2. Note down:
   - Merchant ID
   - Public Key
   - Private Key

## 🌐 Render Deployment

### Step 1: Prepare Your Repository

1. Ensure your code is pushed to GitHub
2. Make sure you have the following files:
   - `server/.env.example`
   - `server/controllers/cred.json.example`
   - `render.yaml` (deployment configuration)

### Step 2: Deploy Backend Service

1. Go to [Render Dashboard](https://render.com/)
2. Click **New** > **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `carwale-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

### Step 3: Set Environment Variables

In the Render backend service, add these environment variables:

```env
PORT=5000
MONGO=mongodb+srv://username:password@cluster0.mongodb.net/carwale?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
BRAINTREE_PUBLIC_KEY=your_braintree_public_key
BRAINTREE_PRIVATE_KEY=your_braintree_private_key
NODE_ENV=production
```

### Step 4: Upload Google Drive Credentials

1. In your server code, create `controllers/cred.json`
2. Copy the contents from your downloaded Google Drive credentials
3. Commit and push the changes (ensure cred.json is not in .gitignore for deployment)

### Step 5: Deploy Frontend Service

1. In Render, click **New** > **Static Site**
2. Connect the same GitHub repository
3. Configure the service:
   - **Name**: `carwale-frontend`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/build`

### Step 6: Set Frontend Environment Variables

Add this environment variable to the frontend service:

```env
REACT_APP_API_URL=https://your-backend-service.onrender.com
```

Replace `your-backend-service` with your actual backend service URL.

## 🌱 Seed Database

After deployment, seed your database with sample data:

1. In your backend service logs, you can run:
```bash
node scripts/seedData.js
```

Or create an endpoint to trigger seeding:

```javascript
// Add to your routes
app.get('/api/seed', async (req, res) => {
    try {
        const { seedDatabase } = require('./scripts/seedData');
        await seedDatabase();
        res.json({ message: 'Database seeded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

## 🔍 Verification Steps

### Test Backend

1. Visit your backend URL: `https://your-backend.onrender.com`
2. Test API endpoints:
   - `GET /api/brand/getAll-brand`
   - `GET /api/car/getAll-car`

### Test Frontend

1. Visit your frontend URL: `https://your-frontend.onrender.com`
2. Verify all pages load correctly:
   - Home page
   - Brands page
   - Cars page
   - Car detail pages

### Test Features

1. **Authentication**: Try registering and logging in
2. **Admin Features**: Test adding brands and cars (admin account needed)
3. **Cart**: Add items to cart and verify localStorage
4. **Payments**: Test Braintree integration

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check build logs in Render dashboard
   - Ensure all dependencies are listed in package.json
   - Verify file paths are correct

2. **Database Connection Issues**:
   - Verify MongoDB connection string
   - Check network access settings in MongoDB Atlas
   - Ensure database user has proper permissions

3. **Google Drive API Issues**:
   - Verify service account permissions
   - Check folder sharing settings
   - Ensure cred.json is properly formatted

4. **CORS Issues**:
   - Update CORS configuration in server
   - Verify frontend URL is whitelisted

### Debug Commands

```bash
# Check server logs
heroku logs --tail -a your-app-name

# Test database connection
node -e "require('./database/database')()"

# Test Google Drive API
node -e "require('./controllers/carController').uploadFileToGoogleDrive"
```

## 📊 Monitoring

### Performance Monitoring

1. Use Render's built-in metrics
2. Monitor response times and error rates
3. Set up alerts for downtime

### Database Monitoring

1. Use MongoDB Atlas monitoring tools
2. Track database performance and usage
3. Set up alerts for connection issues

## 🔧 Maintenance

### Regular Tasks

1. **Update Dependencies**: Keep packages updated
2. **Monitor Logs**: Check for errors regularly
3. **Backup Database**: Regular MongoDB backups
4. **Security Updates**: Keep credentials secure

### Scaling Considerations

1. **Upgrade Plans**: Move from free to paid plans for production
2. **CDN**: Consider using a CDN for static assets
3. **Caching**: Implement Redis for session management
4. **Load Balancing**: For high-traffic scenarios

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Database connection working
- [ ] Google Drive API functional
- [ ] Braintree payments working
- [ ] All routes accessible
- [ ] Frontend-backend communication working
- [ ] Error handling implemented
- [ ] Security headers configured
- [ ] HTTPS enabled
- [ ] Monitoring setup

## 📞 Support

For deployment issues:

1. Check Render documentation
2. Review application logs
3. Test locally first
4. Contact support if needed

---

**Deployment completed successfully!** 🎉

Your Carwale application should now be live and accessible to users worldwide.