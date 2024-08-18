# Angelcam Video Management System

This project provides a video management system using the Angelcam API. It includes a backend developed with Django and Django REST Framework for handling authentication and API requests, and a frontend developed with React for user interaction.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Frontend Usage](#frontend-usage)
- [License](#license)

## Project Overview

This system allows users to authenticate via a Personal Access Token and access shared cameras through the Angelcam API. The backend handles user authentication, token management, and interaction with the Angelcam API. The frontend provides a user-friendly interface for logging in and viewing camera feeds.

## Features

- **User Authentication**: Users authenticate using a Personal Access Token.
- **Token Management**: Secure handling of access and refresh tokens with JWT.
- **Camera Viewing**: View live video feeds from shared cameras.
- **Secure API Endpoints**: Only authenticated users can access the camera feeds.

## Technologies Used

- **Backend**: Django, Django REST Framework, JWT Authentication, requests
- **Frontend**: React, HTML5, CSS3
- **Database**: SQLite (default, can be configured to other databases)
- **Deployment**: Local development server (can be configured for production)

## Setup and Installation

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MuhammadHassan1998/angelcam-video-management.git
   cd angelcam-video-management
   ```

2. **Create and activate a virtual environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install the required packages:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply database migrations:**

   ```bash
   python manage.py migrate
   ```

5. **Run the development server:**

   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install the required packages:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm start
   ```

## Usage

### API Endpoints

- **Login**: `/api/login/` - Authenticates the user and returns JWT tokens.
- **Shared Cameras**: `/api/angelcam/shared-cameras/` - Retrieves the list of shared cameras.
- **Camera Details**: `/api/angelcam/shared-cameras/<camera_id>/` - Retrieves details of a specific camera.

### Frontend Usage

- **Login Page**: Users enter their Personal Access Token to authenticate.
- **Camera Page**: Displays a list of shared cameras. Users can click on a camera to view the live feed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
