# Authentication-Server
A server used for authentication of users

Routes

GET
/users -> home

;nbsp;nbsp;nbsp

GET
/users/usersList -> list of all registered users in the database

;nbsp;nbsp;nbsp

POST
/users/register -> register user to databsae

e.g.

{


  "username": "your-username",


  "email": "your-email",


  "password": "your-password"

  
}


;nbsp;nbsp;nbsp

POST
/users/login -> login user to database

e.g.

{


  "email": "your-email",


  "password": "your-password"


}
