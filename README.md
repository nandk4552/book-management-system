# Claw Full Stack Developer Intern Interview Task

## Project Overview

This project is a full-stack web application that allows users to manage a collection of books. It includes both front-end and back-end components, built using React.js, Node.js, MongoDB, and REST APIs.

### Features

1.  **Book Management Interface (Front-End):**

    - All Books are visible in the home page
    - Each user can add, view, edit, and delete books on their books.
    - Each book has the following fields: title, author, genre, and year published.
    - The application is responsive and works well on different screen sizes.

2.  **Integration with Back-End (Node.js, Express):**

    - API calls are made to the back-end to fetch, add, update, and delete book data.
    - Axios or the Fetch API is used to handle HTTP requests.

3.  **API Endpoints (Back-End):**

    - RESTful API endpoints are set up:
      _Authentication Routes_

           - REGISTER USER || POST || `api/v1/auth/register`
           - LOGIN USER|| POST || `api/v1/auth/login`

           _User Routes_

           - GET USER || POST || api/v1/user/get-user
           - GET ALL USERS || POST || api/v1/user/all-users
           - UPDATE USER || POST || api/v1/user/update-user
           - UPDATE PASSWORD || POST || api/v1/user/update-user
           - RESET USER PASSWORD || POST || api/v1/user/reset-password
           - DELETE USER || POST || `api/v1/user/delete-user`

           _Book Routes_

            - GET ALL BOOKS || GET || `/api/v1/books`
            - GET ALL BOOKS BY LOGGED IN USER ID || GET || `/api/v1/books/get-by-user`
            - GET BOOK BY ID || GET || `/api/v1/books/:id`
            - CREATE A NEW BOOK || POST || `/api/v1/books`
            - UPDATE A BOOK BY ID || PUT || `/api/v1/books/:id`
            - DELETE A BOOK BY ID || DELETE ||  `/api/v1/books/:id`
            - FILTER FOR BOOK GENRES || GET || `/api/v1/books/filter/genres`
            - FILTER FOR BOOK AUTHORS || GET ||` /api/v1/books/filter/authors`
            - FILTER FOR BOOK TITLES || GET ||` /api/v1/books/filter/titles`

4.  **Data Validation and Error Handling (Back-End):**

    - Incoming data for book fields is validated.
    - Errors are handled gracefully, returning appropriate HTTP status codes and messages.

5.  **Database Integration (MongoDB):**
    - MongoDB is used to store book data and user data.
    - Mongoose models define data schema and interaction.

## Getting Started

1. Clone this repository to your local machine.
2. Install dependencies for both the front-end and back-end:
   - Front-End (React.js): Navigate to the `client` directory and run `npm install`.
   - Back-End (Node.js): Navigate to the `server` directory and run `npm install`.
3. Set up your MongoDB database and configure the connection in the back-end.
4. Run the application:
   - Front-End: In the `client` directory, run `npm run dev`.
   - Back-End: In the `server` directory, run `npm run server`.
   - To run both applications run `npm run dev` in the root directory i.e book-management-system.

## Bonus Task

implemented the following features for additional points:

- User authentication (e.g., using JWT) to protect certain API endpoints.
- Search and filter functionality for books.
- Pagination for the list of books using ant design Table component.

## Task Submission

Provided a links to postman API used, Live project links and my GitHub repository containing the source code for both the front-end and back-end. Additionally, include instructions on how to set up and run the application locally.
- Frontend Link: https://b00kflow.netlify.app/
- Backend Link: https://book-management-system-silk.vercel.app/
- GitHub Link: https://github.com/nandk4552/book-management-system
- POSTMAN API's: https://www.postman.com/grey-station-125149-1/workspace/claw-full-stack-internship-nandk4552-gmail-com/collection/21207467-008baac2-f8ff-497b-b6ac-4a9354f182ba?action=share&creator=21207467

## Contact Details
```
Name: DEVARLA NAND KISHORE
Email: nandk4552@gmail.com
LinkedIn: https://www.linkedin.com/in/nandk4552/ 
Twitter: https://x.com/nandk_1
```
