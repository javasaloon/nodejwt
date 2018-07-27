# nodejwt
nodejs jwt express pug demo

start server
DEBUG=myapp:* npm start





https://medium.com/@patrykcieszkowski/jwt-authentication-in-express-js-ee898b87a60

login:

POST http://localhost:3000/users/login
{
"email":"jacky@sap.com",
"password": "pass"
}

check protected api:
GET http://localhost:3000/users/1

Header 
name: Authorization   
value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiamFja3lAc2FwLmNvbSJ9LCJpYXQiOjE1MzI2Nzc0MjQsImV4cCI6MTUzMjY4MTAyNH0.KpSUigKynckN84y9M7XcgKSsH01Dt23yam6E4UDdSU8

