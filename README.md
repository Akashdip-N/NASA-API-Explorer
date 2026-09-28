# 🚀 NASA API Explorer

This project is a full-stack React + Express.js application that allows users to explore various NASA APIs, such as:-
</br>1️⃣ Astronomy Picture of the Day
</br>2️⃣ Mars Rover Photos
</br>3️⃣ EPIC Earth Imagery
</br>4️⃣ Finding the Near-Earth Objects' speed.
</br>5️⃣ Searching the NASA Image and Video Library.

## 🗂 Folder Structure
```
nasa-api-explorer/
│
├── frontend/                               # React frontend
│   ├── public/                             # Static assets
│   │   ├── index.html                      # Main HTML file
│   │   ├── manifest.json                   # Web app manifest
│   │   └── robots.txt                      # Robots.txt file
│   │
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
│       │   ├── ContactUs.css               # Styles for Contact Us form
│       │   ├── Footer.css                  # Styles for Footer component
│       │   ├── Instructions.css            # Styles for the Instructions component
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
│
│   │── .env                                # Frontend environment variables file
│   │── .env.example                        # Example frontend environment variables file
│   └── package.json                        # Frontend package file
│
├── backend/                                # Express.js backend
│   ├── index.js                            # API routes and server logic
│   ├── index.test.js                       # Backend test file (Jest)
│   ├── .env                                # Backend environment variables file
│   ├── .env.example                        # Example backend environment variables file
│   └── package.json                        # Backend package file
│
├── .gitignore                              # Git ignore file
├── package.json                            # Root-level script runner
├── README.md                               # Readme file, containing project details
└── LICENSE                                 # License file
```

## 🚧 Prerequisites
Ensure you have the following installed:
</br>✅ **Node.js** (v16+ recommended)
</br>✅ **npm** or **yarn**
</br>✅ [NASA API Key](https://api.nasa.gov/) (Free)
</br>✅ [Google Account](https://accounts.google.com/signup) (optional, for Google sheet integration)

## 📦 Software Requiremenets
✅ [Node.js](https://nodejs.org/en) (version 16 or higher)
</br>✅ Code Editor (e.g., [Visual Studio Code](https://code.visualstudio.com/))
</br>✅ [Postman](https://www.postman.com/) (optional, for testing API endpoints)
</br>✅ [Git](https://git-scm.com/) (to clone the repository)
</br>✅ [Vercel](https://vercel.com/) (optional, for backend deployment)
</br>✅ [Render.com](https://render.com/) (optional, for frontend deployment)

## ⚙️ Setup Instructions

### 1. Clone the Repository
Run the following command in your terminal to clone the repository:

```bash
git clone https://github.com/Akashdip-N/NASA-API-Explorer.git
cd nasa-api-explorer
```

### 2. Add your NASA API Key to the backend
 1. A sample `.env.example` file is provided in the `backend/` directory.
 2. Copy the `.env.example` file to `.env` in the `backend/` directory using the following command:
```bash
cp backend/.env.example backend/.env
```
 3. Open the `.env` file in a text editor.
 4. Replace the placeholder `your_api_key_here` with your actual NASA API key obtained from [NASA API](https://api.nasa.gov/).
 <br>For example, your api key is `abcdefghijklmnopqrstuvwxyz`, then your `.env` file should look like this:
```plaintext
NASA_API_KEY=abcdefghijklmnopqrstuvwxyz
```

   5. Save the `.env` file.

### 3. Setting Up the Frontend
   1. A sample `.env.example` file is provided in the `frontend/` directory.
   2. Copy the `.env.example` file to `.env` in the `frontend/` directory using the following command:
```bash
cp frontend/.env.example frontend/.env
```

### 4. Integrate Google Sheets (Optional)
If you want to integrate Google Sheets, follow these steps:
1. Create two Google Sheets:
   - One for storing the ratings given by users.
   - Another for storing user feedback.
2. Create the following columns in the respective Google Sheets:
   - **Ratings Sheet**: `Rating`, `Feedback`, `Date`, `Time`
   - **Feedback Sheet**: `Name`, `Email`, `Given_message`, `Date`, `Time`
3. For both Google Sheets, create a Google Cloud Platform project and enable the Google Sheets API.
4. Use the Google Sheets API ULS to connect your application to the Google Sheets you created.
5. Go to the `backend/` directory and change the `.env` file variable `RATINGS_SHEET_URL` to the URL of the Google Sheets where you want to store the ratings.
6. Change the `.env` file variable `CONTACT_US_URL` to the URL of the Google Sheets where you want to store the feedback.
7. Make sure to save the `.env` file.

### 4. Running the Application
Inside the `nasa-api-explorer` directory, run the following commands:
```bash
npm install && npm start
```
This will start both the frontend and backend servers concurrently.

### 5. Access the Application
Open your web browser and navigate to `http://localhost:3000` to access the application.

## 🧪 Running Tests
* There are tests available for both the frontend and backend.
### Frontend Testing
 * The frontend tests are written using Jest and React Testing Library.
 * To run tests for the frontend, run the following command inside the `frontend/` directory:
```bash
npm test
```

### Backend Testing
 * The backend tests are written using Jest and Supertest.
 * To run the `backend` test, perform the following steps:
 * Uncomment some lines in the `backend/index.js` file to enable testing.
 * Then run the following command inside the `backend/` directory:
```bash
npm test
```

## 🌐 Backend API Endpoints
The backend provides the following API endpoints:
- **GET** `/api/nasa/epic`: Fetches EPIC Earth Imagery.
- **GET** `/api/nasa/rover`: Fetches Mars Rover Photos.
- **GET** `/api/nasa/apod`: Fetches Astronomy Picture of the Day.
- **GET** `/api/nasa/neo`: Fetches Near-Earth Objects data.
- **GET** `/api/nasa/nasa_image`: Searches the NASA Image and Video Library.
- **POST** `/api/contact`: Submits user's contact form data.
- **POST** `/api/rating`: Submits user ratings and feedback.

## ⚠️ Error Codes and their Solutions
This project may throw some error codes during the development or deployment process.
</br>Below are the common error codes and their solutions:

```plaintext
111 - API Key Error
222 - Port Number Error
```

### 1. 111 Error Code
This error code indicates an issue with the API key or the request to the NASA API.
<br>Ensure that:</br>
✅ Your API key is valid and correctly set in the `.env` file.</br>
✅ The `.env` file is properly configured and located in the `backend/` directory.

### 2. 222 Error Code
This error code means that the `port number` of the backend server is already in use, or the `PORT` variable in the file is different from the one in the backend.

To resolve this, follow these steps:
</br>✅ Check if another instance of the backend server is running. </br>
✅ If so, first change the `PORT` variable in the `backend/.env` file. For example, change it to `5000` like this:
```plaintext
PORT=5000
```
✅ Then, open the `frontend/.env` file and you will see something like this:
```plaintext
REACT_APP_API_URL=http://localhost:2000/
```
✅ Change the `2000` value with the new `port number` you set in the `backend/.env` file, e.g. `5000`, so it should look like this:
```plaintext
REACT_APP_API_URL=http://localhost:5000/
```
✅ Save the changes in both `.env` files and restart the application.

‼️ Important Note: Please make sure that the `PORT` variable in the `backend/.env` file is never set to `3000` as it is the default port for the React frontend. If you set it to `3000`, it will conflict with the frontend server and cause issues. ‼️

## 🚀 Deployment (Optional)
✅ To deploy the application, you can use platforms like [Vercel](https://vercel.com/) for the frontend and [Render](https://render.com/) for the backend.

⚠️ Important Note:- Before starting the steps below, make sure to fork the repository to your own GitHub account and deselect the option `Copy the main branch only` while forking.

### Hosting the backend (Render.com)
   ✅ Create an account on [Render](https://render.com/).
   </br>✅ Create a new `Web Service` project on `Render.com` for the backend.
   </br>✅ Either copy the `GitHub` repository link or use the forked repository and link it to the `Render` project.
   </br>✅ Make sure to select the correct branch, i.e. `Backend-deployment`, and copy all the environment variables from the `.env` file in the `backend/` directory from your local deployed settings and paste them into the `Render` project environment variables section.
   </br>✅ Set the `Start Command` to `node index.js` if it is not set automatically in the Render project settings.
   </br>✅ Click on the `Deploy Web Service` button to deploy the backend.
   </br>✅ After the backend is deployed, you will get a URL for the backend; copy that URL, as you will need it for the frontend deployment.

   ### Hosting the frontend (Vercel.com)
   ✅ Create an account on [Vercel](https://vercel.com/).
   </br>✅ Create a new project on `Vercel` for the frontend using the forked repository.
   </br>✅ Choose the `Import Project` option and select the forked repository.
   </br>✅ Make sure to choose the correct directory, i.e. `frontend/`, and press continue.
   </br>✅ In the `Environment Variables` section, set the `API_URL` variable to the URL of the deployed backend, e.g., `https://your-backend-url.onrender.com`.
   </br>✅ Click on the `Deploy` button to deploy the frontend.
   </br>✅ After the frontend is deployed, you will get a URL for the frontend, which you can use to access the application.

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing
✅ Contributions are welcome!
</br>✅ Please fork the repository, create a new branch, and submit a pull request with your changes.

## 💻 View the Project Live
You can view the live version of this project at [NASA API Explorer](https://nasa-api-explorer-dusky.vercel.app/).

📝 A small note: Since the application's backend is hosted using the free tier of `Render`, it might take one or two minutes to wake up. Sorry for the inconvenience caused.
