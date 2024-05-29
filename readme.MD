# Blood Donation Website

Welcome to the Blood Donation Website project! This platform is built to facilitate blood donation activities, allowing users to register, search for donors, request blood, and manage donations. It also includes administrative capabilities for managing users and publishing blogs.

## Live Demo

[Live Demo Link](https://life-drops-server.vercel.app/) 

## Features

- **User Registration and Login**: Secure user registration and login with JWT authentication.
- **Role-Based Access Control**: Three roles - User, Admin, and Super Admin with varying access levels.
- **Search Donors**: Users can search for blood donors.
- **Request Blood**: Users can request blood from donors, who can then accept or reject the requests.
- **Blog Management**: Admins can publish and manage blog posts.
- **User Management**: Super Admins can change user statuses and roles.

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: bcrypt, JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- PostgreSQL
- npm or yarn

### Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/yourusername/blood-donation-website.git
    cd blood-donation-website
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

    or

    ```sh
    yarn install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add your configuration variables.

    ```env
    DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
    JWT_SECRET=your_jwt_secret
    ```

4. **Run database migrations**:

    ```sh
    npx prisma migrate dev
    ```

5. **Start the server**:

    ```sh
    npm run dev
    ```

    or

    ```sh
    yarn dev
    ```

The server should now be running at `http://localhost:3000`.

## API Endpoints

### User Routes

- `GET /all-donors`: Retrieve all donors.
- `GET /all-donors/:donorId`: Retrieve a single donor by ID.
- `POST /register`: Register a new user.
- `PUT /edit-profile`: Edit user profile (Authenticated).
- `POST /user-status/:id`: Change user status (Admin/Super Admin).
- `POST /user-role/:id`: Change user role (Super Admin).

### Auth Routes

- `POST /login`: User login.
- `GET /my-profile`: Get logged-in user profile (Authenticated).
- `POST /change-password`: Change user password (Authenticated).
- `POST /refresh-token`: Refresh authentication token.

### Donation Routes

- `GET /received-donation-request`: Get received donation requests (Authenticated).
- `GET /sent-donation-request`: Get sent donation requests (Authenticated).
- `POST /donation-request`: Create a blood donation request (Authenticated).
- `PUT /donation-request/:requestId`: Update donation request status (Authenticated).

### Blog Routes

- `GET /`: Retrieve all blogs.
- `GET /:id`: Retrieve a single blog by ID.
- `POST /add-blog`: Add a new blog post (Admin).

## Author

- **Your Name** - [Your GitHub Profile](https://github.com/kamrulhasandev)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
