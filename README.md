<h1 style="text-align: center">DOCUMENTATION</h1>




GET
/users -> home page


GET
/users/usersList -> list of all registered users 


POST
/users/register

e.g.

{
  
  
  "username": "your-username",
  
  
  "email": "your-email",
  
  
  "password": "your-password"


}


POST
/users/login

e.g.

{

  
  "email": "your-email",
  
  
  "password": "your-password"


}
