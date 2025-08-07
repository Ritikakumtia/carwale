#!/bin/bash

# Carwale Setup Script
# This script helps set up the development environment for the Carwale project

set -e  # Exit on any error

echo "🚗 Welcome to Carwale Setup!"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if command -v node >/dev/null 2>&1; then
        NODE_VERSION=$(node --version)
        print_status "Node.js is installed: $NODE_VERSION"
        
        # Check if version is >= 14
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$MAJOR_VERSION" -lt 14 ]; then
            print_warning "Node.js version 14 or higher is recommended. Current: $NODE_VERSION"
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 14+ and try again."
        echo "Visit: https://nodejs.org/"
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    if command -v npm >/dev/null 2>&1; then
        NPM_VERSION=$(npm --version)
        print_status "npm is installed: $NPM_VERSION"
    else
        print_error "npm is not installed. Please install npm and try again."
        exit 1
    fi
}

# Install server dependencies
install_server_deps() {
    print_info "Installing server dependencies..."
    cd server
    
    if [ -f "package.json" ]; then
        npm install
        print_status "Server dependencies installed successfully"
    else
        print_error "server/package.json not found!"
        exit 1
    fi
    
    cd ..
}

# Install client dependencies
install_client_deps() {
    print_info "Installing client dependencies..."
    cd client
    
    if [ -f "package.json" ]; then
        npm install
        print_status "Client dependencies installed successfully"
    else
        print_error "client/package.json not found!"
        exit 1
    fi
    
    cd ..
}

# Create environment files
setup_env_files() {
    print_info "Setting up environment files..."
    
    # Server .env file
    if [ ! -f "server/.env" ]; then
        if [ -f "server/.env.example" ]; then
            cp server/.env.example server/.env
            print_status "Created server/.env from example"
            print_warning "Please update server/.env with your actual configuration values"
        else
            print_warning "server/.env.example not found. Creating basic .env file..."
            cat > server/.env << EOL
PORT=5000
MONGO=mongodb://localhost:27017/carwale
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
BRAINTREE_PUBLIC_KEY=your_braintree_public_key
BRAINTREE_PRIVATE_KEY=your_braintree_private_key
NODE_ENV=development
EOL
            print_status "Created basic server/.env file"
        fi
    else
        print_status "server/.env already exists"
    fi
    
    # Client .env file
    if [ ! -f "client/.env" ]; then
        cat > client/.env << EOL
REACT_APP_API_URL=http://localhost:5000
GENERATE_SOURCEMAP=false
EOL
        print_status "Created client/.env file"
    else
        print_status "client/.env already exists"
    fi
}

# Setup Google Drive credentials
setup_google_drive() {
    print_info "Setting up Google Drive credentials..."
    
    if [ ! -f "server/controllers/cred.json" ]; then
        if [ -f "server/controllers/cred.json.example" ]; then
            print_warning "Please rename cred.json.example to cred.json and add your Google Drive API credentials"
            print_info "Instructions:"
            echo "  1. Go to Google Cloud Console"
            echo "  2. Create a new project or select existing"
            echo "  3. Enable Google Drive API"
            echo "  4. Create a service account and download credentials"
            echo "  5. Replace cred.json.example content with your credentials"
            echo "  6. Rename cred.json.example to cred.json"
        else
            print_warning "Google Drive credentials template not found"
            print_info "Please create server/controllers/cred.json with your Google Drive API credentials"
        fi
    else
        print_status "Google Drive credentials file exists"
    fi
}

# Create uploads directory
setup_uploads() {
    print_info "Setting up uploads directory..."
    
    if [ ! -d "server/uploads" ]; then
        mkdir -p server/uploads
        print_status "Created server/uploads directory"
    else
        print_status "server/uploads directory already exists"
    fi
}

# Display next steps
show_next_steps() {
    echo ""
    echo "🎉 Setup completed successfully!"
    echo "=================================="
    echo ""
    print_info "Next steps:"
    echo "1. Update server/.env with your actual configuration values:"
    echo "   - MongoDB connection string"
    echo "   - JWT secret key"
    echo "   - Braintree credentials (optional)"
    echo ""
    echo "2. Set up Google Drive API credentials:"
    echo "   - Create server/controllers/cred.json with your service account credentials"
    echo ""
    echo "3. Start the development servers:"
    echo "   Backend:  cd server && npm run dev"
    echo "   Frontend: cd client && npm start"
    echo ""
    echo "4. (Optional) Seed the database with sample data:"
    echo "   cd server && npm run seed"
    echo ""
    print_info "For detailed setup instructions, see DEPLOYMENT.md"
    echo ""
    print_status "Happy coding! 🚗💨"
}

# Main setup process
main() {
    echo "Starting setup process..."
    echo ""
    
    # Check prerequisites
    check_node
    check_npm
    
    echo ""
    
    # Install dependencies
    install_server_deps
    install_client_deps
    
    echo ""
    
    # Setup configuration
    setup_env_files
    setup_google_drive
    setup_uploads
    
    # Show next steps
    show_next_steps
}

# Handle script interruption
trap 'echo -e "\n${RED}Setup interrupted by user${NC}"; exit 1' INT

# Run main function
main