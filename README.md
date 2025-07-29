# Table of Contents

1)Introduction

2)Tech Stack

3)Folder Structure

4)Installation

5)Usage

6)Contributing

# Introduction

CureNet is a modern health web application designed to streamline patient engagement, health record management, and wellness education. The system empowers users to schedule appointments, access curated content, and interact with their healthcare data securely.


# Tech Stack

FrontEnd

-React

-TypeScript

-JavaScript XML

-React Router v7

-CSS

BackEnd

-Node.js

-Express.js


Frameworks/Technologies

-Supabase

# Folder Structure

FrontEnd

    CureNet-Frontend/
    ├── app/
    │   ├── routes/
    │   │   ├── About.jsx
    │   │   ├── Dashboard.tsx
    │   │   ├── home.tsx
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── profile.jsx
    │   └── app.css
    ├── welcome/
    │   ├── welcome.tsx
    │   ├── logo-light.svg
    │   └── logo-dark.svg
    ├── Images/
    ├── public/
    ├── Dockerfile
    ├── package.json
    └── react-router.config.ts



BackEnd

    CURENET_API/
     ├── node_modules/
     ├── main/
     ├── src/
     │   ├── middleware/
     │   ├── auth.js
     │   ├── dashboard.js
     │   ├── diagnosesRoutes.js
     │   ├── profileroutes.js
     │   ├── supabase.js
     │   ├── test.js
     │   └── main.js
     ├── .env
     ├── package.json
     ├── package-lock.json
     └── README.md


# Installation
1)Clone the repository

     git clone https://github.com/yourusername/CureNet.git
     cd CureNet

2)Install dependencies

     npm install


3)Start the frontend

    npm run dev

4)Clone for the backend

    git clone https://github.com/molomojc/CureNet_API

5)Install the dependencies

    npm install

6)Start the backend

    node main.js

# Usage

Once launched locally, CureNet is accessible at http://localhost:portNumber on a specific port number. From there, users can:
- Register/login
- View their dashboard
- Access profile and health summaries


### UNIT TESTING 
testing- for connection with supabase (fetching the environment variables)
<img width="1142" height="290" alt="image" src="https://github.com/user-attachments/assets/01cd5720-2006-4098-bf25-50bbd7903cc7" />
testing the profile
this fails but works on the front-end given enough time we shall debug it
<img width="900" height="290" alt="image" src="https://github.com/user-attachments/assets/dfc99689-9291-4708-bdb4-7e4e608a078c" />
testing the register and login but also works in front-end we also shall debug it
<img width="1174" height="298" alt="image" src="https://github.com/user-attachments/assets/a4b48734-94b7-4cc3-be3d-6762cec64e12" />




## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
