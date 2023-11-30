# TODO

# TASK
#### Create a API for managing To-Do items.
#### Implement CRUD operations (Create, Read, Update, Delete) for To-Do items.
#### Include Swagger documentation for the API. 

# Technologies Used
#### - Node js
#### - TypeScript
#### - Mocha
#### - PostgreSQl
#### - Express
#### - TypeORM

# Reasons For Using The Mentioned Technologies
#### I opted to use Node.js because of it's non-blocking, event-driven architecture suitable for handling concurrent requests. 
#### TypeScript was used for the backend as well, ensuring a consistent and type-safe codebase throughout the application. 
#### TypeORM was chosen as the ORM to simplify database interactions and provide a seamless TypeScript integration.

## Database:
#### The decision to use PostgreSQL (PG) as the database was based on its reputation for reliability, ACID compliance, and support for complex queries. 
#### PostgreSQL aligns well with the project requirements, offering a robust solution for data storage and retrieval.


## Features:
#### - Display a list of To-Do items.
#### - Add a new To-Do item.
#### - Edit an existing To-Do item.
#### - Delete a To-Do item.
#### - Mark a To-Do item as completed.


### Project Setup:
```bash
git clone git@github.com:Codehouze/TODO_BE.git
 - cd TODO_BE
 - yarn install
 - create .env file and update it with the configurations from the mail..
 - yarn run dev
```

# Swagger documentation:
- This can be located at http://localhost:5000/api-docs/
