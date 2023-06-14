<h1 align="center"> Health Center Page and Booking System (Under development) </h1>

<h4 align="center">Welcome to the Health Center Page repository! <br><br> This project is an ongoing application designed for a health center. It features a React frontend and a C# backend utilizing Entity Framework for database management, with MS SQL as the chosen database technology. Authentication and authorization are implemented using JWT tokens. The main functionality of the application is the appointment booking system, which allows users to schedule appointments with doctors, view their upcoming appointments, and cancel booked appointments if necessary. <br><br><br>


# Features & Technologies
Appointment Booking System: The core feature of the application is the appointment booking system. Users can schedule appointments with doctors, view their upcoming appointments, and cancel booked appointments if necessary. This functionality provides convenience and ease of use for both users and health center staff.

React Frontend: The frontend of the application is developed using **React**, a popular JavaScript library for building user interfaces. React enables a smooth and intuitive user experience, ensuring a seamless interaction with the application's features.

C# Backend with Entity Framework: The backend of the application is built using **C#**, leveraging the capabilities of **Entity Framework** for efficient database management and interaction. This combination allows for seamless integration between the frontend and the database.

MS SQL Database: The application employs **MS SQL** as the database technology. MS SQL provides a robust and scalable solution for storing and retrieving appointment-related data, ensuring data integrity and security.

Authentication and Authorization: **JWT tokens** are utilized for secure authentication and authorization. This ensures that only authenticated users can access the appointment booking system and perform relevant actions, maintaining data privacy and security.

# Getting Started
To get started with the Health Center Page application, follow the instructions below:

Clone the repository


Install the required dependencies for the frontend by navigating to the frontend directory and running:
```powershell
npm install
```
Set up the backend by navigating to the backend directory and configuring the connection string in the appsettings.json file with your MS SQL database credentials.


Run the backend application by executing this command in the backend directory:
```powershell
dotnet run
```

Run the frontend application by executing this command npm start in the frontend directory:
```powershell
npm start
```

Access the application by opening a web browser and navigating to http://localhost:3000.
