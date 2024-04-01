# Ajargh-Kreation

## Table of Contents
- Installation
- Usage
- API Endpoints
- Authentication

## Installations

1. Clone the repository:
    - git clone https://github.com/xeroxPanda32/Ajargh-Kreation.git

2. Install dependencies:
    - cd ajargh
    - npm install

3. Set up environment variables:
    - Create a .env file in the root directory.
    - Add the following environment variables: 
      - PORT=3000
      - MONGO_URI=your-mongodb-uri
      - SECRET_KEY=your-secret-key

4. Start the server:
    - npm start


## Usage
 Once the server is running, you can access the application at http://localhost:3000

 ## API Endpoints
  ### Listings
  - GET /listings: Retrieve all listings.
  - POST /listings: Create a new listing.
  - PUT /listings/:id: Update an existing listing.
  - DELETE /listings/:id: Delete a listing.

  ### Reviews
  - GET /reviews/:listingId: Retrieve reviews for a specific listing.
  - POST /reviews/:listingId: Create a new review for a listing.
  - PUT /reviews/:id: Update a review for a - listing.
  - DELETE /reviews/:id: Delete a review for a listing.
  - PUT /reviews/respond/:listingId: Respond to a review for a listing.

  ## Users
  - GET /users: Retrieve all users.
  - PUT /users/:id: Update a user's information.
  - DELETE /users/:id: Delete a user.


For detailed request and response formats, refer to the API documentation or the source code.

### Authentication

The API endpoints require authentication using JSON Web Tokens (JWT). To authenticate, include a valid JWT token in the Authorization header of your requests.

- Authorization: Bearer your-jwt-token
