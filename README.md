# 🚀 NASA API Explorer

This project is a fullstack React + Express.js application that allows users to explore various NASA APIs such as Astronomy Picture of the Day, Mars Rover Photos, EPIC Earth Imagery, Near-Earth Objects, and the NASA Image and Video Library.

## 🗂 Folder Structure
```
nasa-api-explorer/
│
├── frontend/                       # React frontend
│   ├── public/                     # Static assets
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/                        # React components & styles
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       ├── index.css
│       ├── App.test.js
│       ├── setupTests.js
│       └── reportWebVitals.js
│   └── package.json
│
├── backend/                        # Express.js backend
│   ├── index.js                    # API routes and server logic
│   ├── index.test.js               # Backend test file (Jest)
│   └── package.json
│   └── .env.example                # Example environment variables
│
├── package.json                    # Root-level script runner
├── README.md                       # Project documentation
└── .env                            # Environment variables (backend API key)
```

## 🚧 Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- [NASA API Key](https://api.nasa.gov/) (Free)

## 📦 Software Requiremenets
- [Node.js](https://nodejs.org/en) (version 16 or higher)
- Code Editor (e.g., [Visual Studio Code](https://code.visualstudio.com/))
- [Postman](https://www.postman.com/) (optional, for testing API endpoints)
- [Git](https://git-scm.com/) (to clone the repository)
- Go to the [NASA API documentation](https://api.nasa.gov/) to understand the endpoints parameters and obtain your API key.

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Akashdip-N/NASA-API-Explorer.git
cd nasa-api-explorer
```

### 2. Add Your NASA API Key
 * Create a `.env` file in the `backend/` directory.
 * Add your NASA API key to the `.env` file in the following format:

```plaintext
NASA_API_KEY=your_api_key_here
```

### 3. Running the Application
Go to the `nasa-api-explorer` directory and run the following commands:
```bash
npm install && npm start
```
This will start both the frontend and backend servers concurrently.

### 4. Access the Application
Open your web browser and navigate to `http://localhost:3000` to access the application.

## 🧪 Running Tests
To run tests for both the frontend and backend, use the following commands:

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
* Uncomment some lines in the `backend/index.js` file to enable testing.

* Then run the following command:
```bash
cd backend
npm test
```

##  Common Issue Error Codes
### 1. 111 Error Code
This error code indicates that there is an issue with the API key or the request to the NASA API. Ensure that:
- Your API key is valid and correctly set in the `.env` file.
- The `.env` file is properly configured and located in the `backend/` directory.

### 2. 222 Error Code
This error code means that the `port number` of the backend server is already in use. To resolve this:
- Check if another instance of the backend server is running.
- If so, change the `PORT` variable in both the `backend/index.js` file and the `frontend/App.js` file to a different port number.

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing
Contributions are welcome!
Please fork the repository, create a new branch, and submit a pull request with your changes.

## View the Project Live
You can view the live version of this project at [NASA API Explorer](https://versal-project-deployment.vercel.app/).

