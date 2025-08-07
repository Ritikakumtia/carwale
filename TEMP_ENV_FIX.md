# 🔧 Fix Braintree Configuration Error

## **Quick Solution**

Update your `server/.env` file with these values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (use local MongoDB for now)
MONGO=mongodb://localhost:27017/carwale

# JWT Secret Key
JWT_SECRET=carwale_super_secret_jwt_key_2024_ritika_kumtia_secure_token

# Braintree Payment Gateway (Sandbox - Safe for Testing)
BRAINTREE_MERCHANT_ID=sandbox_merchant_id_placeholder
BRAINTREE_PUBLIC_KEY=sandbox_public_key_placeholder
BRAINTREE_PRIVATE_KEY=sandbox_private_key_placeholder
```

## **Alternative: Skip Braintree for Now**

If you want to focus on deployment first, we can temporarily disable Braintree:

### **Option 1: Use Placeholder Values (Recommended)**
Copy the .env content above - this will allow the server to start without payment functionality.

### **Option 2: Comment Out Braintree Code**
In `server/controllers/carController.js`, comment out lines 16-21:

```javascript
// var gateway = new braintree.BraintreeGateway({
//     environment: braintree.Environment.Sandbox,
//     merchantId: process.env.BRAINTREE_MERCHANT_ID,
//     publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//     privateKey: process.env.BRAINTREE_PRIVATE_KEY
// });
```

## **For Production: Get Real Braintree Keys**

When you're ready for payment functionality:

1. Go to [Braintree](https://www.braintreepayments.com/)
2. Create sandbox account
3. Get credentials from Settings > API
4. Replace placeholder values in .env