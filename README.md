# Sandesh Nepal Portfolio

This project is a complete personal portfolio website built to present my professional identity, technical work, and engineering journey in a polished and modern digital format. It combines a visually engaging front-end with a secure back-end so that visitors can explore my experience, view my projects, and get in touch with me directly.

The portfolio is currently deployed and publicly accessible on the internet at https://sandeshnepal.vercel.app. This live deployment allows anyone to visit the site, review my work, and connect with me through the available contact channels from anywhere in the world.

The goal was to create a portfolio that feels personal and professional at the same time: one that reflects creativity, technical capability, and real-world problem-solving. The result is a full-stack web application with an interactive user interface and content sections that present my professional profile in a clear, engaging, and modern way.

## What this project includes

The application is structured around a portfolio website for an engineer and developer, with the following core parts:

- A dynamic landing page with animated visuals, orbital design elements, and a modern hero section
- Professional sections for About, Experience, Projects, Gallery, and Contact
- A contact form that stores visitor messages in MongoDB
- A backend API built with Express for portfolio operations
- Cloudinary integration for image-based content management
- Logging for API activity and application errors

## Tech stack

The project is built using a MERN-style stack, with a React front-end and an Express server:

- Frontend: React, React Router, Tailwind CSS, GSAP, Framer-style motion concepts through React animation libraries, React Icons, and particle effects
- Backend: Node.js, Express, Mongoose, JWT, bcrypt, cookie-parser
- Database: MongoDB
- Media storage: Cloudinary
- API monitoring: Winston logging

## Project structure

The workspace is divided into two main parts:

- client: all front-end pages, components, styles, and assets
- server: API routes, controllers, middleware, models, and database configuration

The portfolio interface is designed to look modern and immersive, while the server side ensures that the application remains organized, secure, and maintainable.

## Features implemented

### Portfolio experience

The site includes a narrative-driven portfolio presentation that helps visitors understand my background as an Electrical & Electronics Engineer and Full-Stack Developer. It showcases:

- a professional introduction
- career experience and role progression
- projects with technology details and links
- a visual gallery
- a contact section for communication

### Contact handling

Visitors can send messages through the contact form. Those messages are validated and saved to the database so they can be reviewed and managed as part of the portfolio workflow.

### Security and reliability

The backend includes core protections and best practices such as:

- CORS configuration for local and deployment environments
- environment-based configuration for sensitive values
- logging of requests and server errors
- structured API handling for secure communication between the client and server

## Live deployment

The application is deployed and running publicly at:

```text
https://sandeshnepal.vercel.app
```

This live version is accessible to anyone on the internet and serves as the online presence for the portfolio.

## How to run the project

### 1. Install dependencies

Open two terminals and run the following commands separately:

```bash
cd client
npm install
```

```bash
cd server
npm install
```

### 2. Configure environment variables

Create a `.env` file inside the `server` folder with the required values:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=my-strong-secret-key
CLOUDINARY_CLOUD_NAME=my_cloud_name
CLOUDINARY_API_KEY=my_api_key
CLOUDINARY_API_SECRET=my_api_secret
```

If the frontend is running in production or a deployed environment, you may also set a `REACT_APP_BACKEND_URL` value in the client environment for API requests.

### 3. Start the application

In the client terminal:

```bash
npm start
```

In the server terminal:

```bash
npm start
```

The front-end will usually run on:

```text
http://localhost:3000
```

The API will run on:

```text
http://localhost:5000
```

## Notes on the project

This portfolio is more than a static personal webpage. It is a real application built to support professional presentation, clear communication, and a smooth online experience for visitors exploring my background and work.

By combining a strong design language with a functional back-end, the project represents a complete portfolio system that can serve as a digital identity for a developer or engineer while also offering practical business functionality for communication and information sharing.

## Closing statement

This project reflects a practical approach to building a modern portfolio: one that looks professional, communicates clearly, and works as a usable system rather than just a decorative website. It was created to present my work with confidence while also making it easy for people to connect with me and learn more about my experience.
