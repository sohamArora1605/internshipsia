# 🐳 Docker Setup for Prashikshan

## Quick Start

### Production Build
```bash
# Build and run production container
docker-compose up --build

# Access at: http://localhost:3000
```

### Development Mode
```bash
# Run development container with hot reload
docker-compose --profile dev up --build

# Access at: http://localhost:5173
```

## Individual Commands

### Production
```bash
# Build image
docker build -t prashikshan-app .

# Run container
docker run -p 3000:80 prashikshan-app
```

### Development
```bash
# Build dev image
docker build -f Dockerfile.dev -t prashikshan-dev .

# Run dev container
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules prashikshan-dev
```

## Environment Variables
Create `.env` file for custom configuration:
```
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Prashikshan
```