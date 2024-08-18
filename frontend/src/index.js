import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import { ListStreaming } from './components/ListStreaming';

// Define the router with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "Login", // Make sure this path matches the URL
    element: <Login />
  },
  {
    path: "Home", // Make sure this path matches the URL
    element: <Home />
  },
  {
    path: "List", // Make sure this path matches the URL
    element: <ListStreaming />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
