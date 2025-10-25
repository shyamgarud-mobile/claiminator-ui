# 🎯 Claiminator UI

A modern, responsive web application for efficient claims management and processing built with React and Vite.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Build for Production](#build-for-production)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

Claiminator UI is a comprehensive frontend application designed to streamline the claims management process. It provides an intuitive interface for users to submit, track, and manage insurance or service claims efficiently. Built with modern web technologies, it ensures a fast, responsive, and user-friendly experience.

## ✨ Features

- 📝 **Claim Submission** - Easy-to-use forms for submitting new claims
- 📊 **Dashboard** - Comprehensive overview of all claims and their statuses
- 🔍 **Advanced Search** - Filter and search claims by various criteria
- 📈 **Analytics** - Visual representation of claims data and trends
- 👤 **User Management** - Role-based access control for different user types
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🔔 **Real-time Updates** - Live notifications for claim status changes
- 📄 **Document Management** - Upload and manage claim-related documents
- 🎨 **Modern UI/UX** - Clean and intuitive interface design
- ⚡ **Fast Performance** - Built with Vite for optimal loading speeds

## 📸 Screenshots

### Dashboard
![Dashboard Screenshot](https://github.com/shyamgarud-mobile/claiminator-ui/blob/main/screenshots/Screenshot%201.png)
*Main dashboard showing claims overview and statistics*

### Claim Submission Form
![Claim Form Screenshot](https://github.com/shyamgarud-mobile/claiminator-ui/blob/main/screenshots/Screenshot%202.png)
*Intuitive claim submission interface*


### Claim Details
![Claim Details Screenshot](https://github.com/shyamgarud-mobile/claiminator-ui/blob/main/screenshots/Screenshot%203.png)
![Claim Details Screenshot](https://github.com/shyamgarud-mobile/claiminator-ui/blob/main/screenshots/Screenshot%204.png)
*Detailed view of individual claim information*


## 🛠️ Tech Stack

- **Frontend Framework:** React 18.x
- **Build Tool:** Vite 5.x
- **Languages:** JavaScript/JSX
- **Styling:** CSS3 / CSS Modules
- **State Management:** React Hooks / Context API
- **Routing:** React Router (if applicable)
- **HTTP Client:** Fetch API / Axios
- **Development:**
  - ESLint for code linting
  - Hot Module Replacement (HMR) for fast development
  - Modern JavaScript features (ES6+)

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm** (version 9.0.0 or higher) or **yarn** (version 1.22.0 or higher)
  - npm comes with Node.js
  - Verify npm: `npm --version`
  - Or install yarn: `npm install -g yarn`

- **Git** (for cloning the repository)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

## 🚀 Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/shyamgarud-mobile/claiminator-ui.git

# OR using SSH
git clone git@github.com:shyamgarud-mobile/claiminator-ui.git

# Navigate to the project directory
cd claiminator-ui
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

### 3. Set Up Environment Variables (if required)

Create a `.env` file in the root directory:

```bash
# Copy the example environment file (if it exists)
cp .env.example .env

# OR create a new .env file
touch .env
```

Add necessary environment variables:

```env
# Example environment variables
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Claiminator
VITE_APP_VERSION=1.0.0
```

## 🏃‍♂️ Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

The application will be available at:
- Local: `http://localhost:5173`
- Network: `http://[your-ip]:5173`

### Preview Mode

Preview the production build locally:

```bash
# Build the project first
npm run build

# Then preview
npm run preview
```

## 🏗️ Build for Production

Create an optimized production build:

```bash
# Using npm
npm run build

# OR using yarn
yarn build
```

The build artifacts will be stored in the `dist/` directory. These files are ready to be deployed to any static hosting service.

### Deployment Options

Deploy the `dist/` folder to any of these platforms:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **AWS S3**: Upload to S3 bucket with CloudFront
- **Traditional Hosting**: Upload `dist` contents via FTP

## 📁 Project Structure

```
claiminator-ui/
├── 📁 public/              # Static assets
│   └── vite.svg           # Vite logo
├── 📁 src/                # Source code
│   ├── 📁 assets/         # Images, fonts, etc.
│   ├── 📁 components/     # Reusable React components
│   ├── 📁 pages/          # Page components
│   ├── 📁 hooks/          # Custom React hooks
│   ├── 📁 utils/          # Utility functions
│   ├── 📁 services/       # API service functions
│   ├── 📁 styles/         # Global styles
│   ├── App.css            # App-specific styles
│   ├── App.jsx            # Main App component
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── 📄 .eslintrc.cjs       # ESLint configuration
├── 📄 .gitignore          # Git ignore file
├── 📄 index.html          # HTML template
├── 📄 package.json        # Project dependencies
├── 📄 package-lock.json   # Locked dependencies
├── 📄 README.md           # Project documentation
└── 📄 vite.config.js      # Vite configuration
```

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm test` | Run test suite (if configured) |

## 🔧 Environment Variables

The application supports the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000/api` |
| `VITE_APP_NAME` | Application name | `Claiminator` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |
| `VITE_ENABLE_MOCK` | Enable mock data | `false` |

## 🤝 Contributing

We welcome contributions to the Claiminator UI project! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

## 🐛 Troubleshooting

### Common Issues

**1. Port 5173 is already in use**
```bash
# Kill the process using the port
# On macOS/Linux:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**2. Module not found errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. Build fails**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

## 📞 Support

For support, please:
- Create an issue in the [GitHub repository](https://github.com/shyamgarud-mobile/claiminator-ui/issues)
- Contact the development team
- Check the [documentation](https://github.com/shyamgarud-mobile/claiminator-ui/wiki)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Shyam Garud** - [shyamgarud-mobile](https://github.com/shyamgarud-mobile)
- **Dipak Shinde**  - [Dipak782-hash](https://github.com/Dipak782-hash)
