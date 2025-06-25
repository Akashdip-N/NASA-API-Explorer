# 🚀 NASA API Explorer

This project is a fullstack React + Express.js application that allows users to explore various NASA APIs such as:-
* Astronomy Picture of the Day
* Mars Rover Photos
* EPIC Earth Imagery
* FInding the Near-Earth Objects speed.
* Searching the NASA Image and Video Library.

## 🗂 Folder Structure
```
nasa-api-explorer/
│
├── frontend/                               # React frontend
│   ├── public/                             # Static assets
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/                                # Source code
│       ├── components/                     # Reusable components
│       │   ├── ContactUs.js                # Contact Us form
│       │   ├── Footer.js                   # Footer component
│       │   ├── Instructions.js             # Instructions for using the app
│       │   ├── Playground.js               # The main section for API exploration
│       │   ├── RateUs.js                   # Rate Us component
│       │   ├── TopNav.js                   # Top navigation bar
│       │   └── ViewModeToggle.js           # Toggle between light and dark mode
│       │
│       ├── css_files/                      # CSS files for styling
├       │   ├── ContactUs.css               # Styles for Contact Us form
│       │   ├── Footer.css                  # Styles for Footer component
│       │   ├── Instructions.css            # Styles for Instructions component
│       │   ├── Playground.css              # Styles for Playground component
│       │   ├── RateUs.css                  # Styles for Rate Us component
│       │   └── TopNav.css                  # Styles for Top Navigation bar
│       │
│       ├── icons_assets/                   # Icons and images
│       │   ├── logo.png                    # Logo for the application
│       │   ├── nasa_dark_mode.jpg          # Dark mode image
│       │   └── nasa_light_mode.jpg         # Light mode image
│       │
│       ├── App.js                          # Main application entry point
│       ├── App.css                         # Main CSS file for the application
│       ├── index.js                        # ReactDOM rendering
│       ├── App.test.js                     # Frontend test file (Jest)
│       ├── setupTests.js                   # Setup for Jest tests
│       └── reportWebVitals.js              # Web Vitals reporting
|
│   └── package.json
│
├── backend/                                # Express.js backend
│   ├── index.js                            # API routes and server logic
│   ├── index.test.js                       # Backend test file (Jest)
│   ├── .env                                # Environment variables (API keys)
│   ├── .env.example                        # Example environment variables file
│   └── package.json
│
├── .gitignore                              # Git ignore file
├── package.json                            # Root-level script runner
├── README.md                               # Project documentation
└── LICENSE                                 # License file
```

## 🚧 Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- [NASA API Key](https://api.nasa.gov/) (Free)
- [Google Account](https://accounts.google.com/signup) (optional, for Google sheet integration)

## 📦 Software Requiremenets
- [Node.js](https://nodejs.org/en) (version 16 or higher)
- Code Editor (e.g., [Visual Studio Code](https://code.visualstudio.com/))
- [Postman](https://www.postman.com/) (optional, for testing API endpoints)
- [Git](https://git-scm.com/) (to clone the repository)
- [Vercel](https://vercel.com/) (optional, for backend deployment)
- [Render.com](https://render.com/) (optional, for frontend deployment)

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

### 3. Integrate Google Sheets (Optional)
If you want to integrate Google Sheets, follow these steps:
1. Create two Google Sheets:
   - One for storing the ratings given by users.
   - Another for storing user feedback.
2. Create a Google Cloud Platform project and enable the Google Sheets API.
3. Use the Google Sheets API ULS to connect your application to the Google Sheets you created.
4. Add the `ratings sheet URL` to the `FEEDBACK_SHEET_URL` variable and the `feedback sheet URL` to the `CONTACT_US_URL` variable in the `.env` in the following format:

```plaintext
FEEDBACK_SHEET_URL=<your_feedback_sheet_url_here>
CONTACT_US_URL=<your_contact_us_url_here>
```

### 4. Running the Application
Go to the `nasa-api-explorer` directory and run the following commands:
```bash
npm install && npm start
```
This will start both the frontend and backend servers concurrently.

### 5. Access the Application
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
This error code means that the `port number` of the backend server is already in use or the `PORT` variable in the file is different from the one in the backend.

To resolve this follow these steps:
- Check if another instance of the backend server is running.
- If so, change the `PORT` variable in both the `backend/index.js` file and for the following files as well in the `frontend/src/components/` directory:
  - `ContactUs.js`
  - `Playground.js`
  - `RateUs.js`

## Deployment (Optional)
- To deploy the application, you can use platforms like [Vercel](https://vercel.com/) for the frontend and [Render](https://render.com/) for the backend.
- To do that follow these steps:
  1. Create an account on [Vercel](https://vercel.com/) and [Render](https://render.com/).
  2. Create two seperate repostories for `Vercel` and `Render` to host the `frontend` and `backend` respectively.
  3. Create a new project on `Vercel` and `Render.com` and link it to the respective `backend` and `frontend` repositories.
  4. Set the environment variables `Render.com` for the backend:
     - `NASA_API_KEY`
     - `FEEDBACK_SHEET_URL`
     - `CONTACT_US_URL`
  5. After the backend is deployed, set the `API_URL` variable with the backend URL for all of the following files in the `frontend/src/components/` directory:
     - `ContactUs.js`
     - `Playground.js`
     - `RateUs.js`
  6. Deploy the frontend on `Vercel` and it should work seamlessly.

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing
Contributions are welcome!
Please fork the repository, create a new branch, and submit a pull request with your changes.

## View the Project Live
You can view the live version of this project at [NASA API Explorer](https://versal-project-deployment.vercel.app/).