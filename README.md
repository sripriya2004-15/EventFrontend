🎉 Event Management Frontend

A React frontend for the Event Management project, providing a user-friendly interface to browse events, register, and log in. This frontend interacts with a backend API to fetch and manage event data.

🚀 Live Demo

Frontend (Netlify): https://6943f5b6cea61e00aa8e4871--shimmering-yeot-a02324.netlify.app/

💡 Features & Functionalities

User Authentication: Registration and login functionality with JWT-based secure authentication.

Event Listing: Users can view a list of events with details.

Event Interaction: Participate in events and view details dynamically.

Responsive UI: Fully responsive interface built with React and Bootstrap.

API Integration: Connects to backend services via Axios for dynamic data fetching.

Routing: Multi-page navigation implemented using React Router.

Local Storage: Stores authentication tokens for persistent sessions.

🧪 Running Locally
1️⃣ Install dependencies
npm install
# or
yarn

2️⃣ Start the development server
npm start
# or
yarn start


Runs the app locally at:

http://localhost:3000

⚙️ Environment Variables

Create a .env file in the project root (do not push to GitHub):

REACT_APP_API_URL=https://<your-backend-on-render>


Use it in your code:

axios.get(`${process.env.REACT_APP_API_URL}/api/events`)

🌍 Deployment (Netlify)

Push your frontend code to GitHub

Go to Netlify → Add new site → Import from GitHub

Select your repository (EventFrontend)

Set build settings:

Build Command: npm run build

Publish Directory: build

Add environment variable:

REACT_APP_API_URL = https://<your-backend-on-render>

Click Deploy

👩‍💻 Author

Sripriya
B.Tech CSE Student
Frontend & MERN Stack Developer
