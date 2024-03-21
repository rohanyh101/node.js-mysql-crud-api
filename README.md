# Simple CRUD API using MySQL2 in NodeJS

## Instructions for Running...

### Setting Up MySQL Server Via Docker
- ``` docker run -p 3306:3306 --name <server_name> -e MYSQL_ROOT_PASSWORD=<db_password> -e MYSQL_DATABASE=<db_name> -d mysql ```
- ``` docker exec -it <server_name> mysql -u root -p ```
- create a table with the name `Users`
- create table credentials such as,
```
CREATE TABLE (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  u_name VARCHAR(20) NOT NULL,
  age INTEGER NOT NULL,
  email VARCHAR(30) NOT NULL,
  u_password VARCHAR(50) NOT NULL
);
```

1. Run the MySQL Server locally via docker as explained above or download the MySQL Server from the official website
2. Run `npm install`
3. Run `npm run start:app`

### Some CURL commands you can Run In PowerShell
 - "/getusers" =>
```curl --location --request GET '127.0.0.1:3000/api/v1/getusers' `
--header 'Content-Type: application/json'```

 - "/getuser/:id" =>
```curl --location --request GET '127.0.0.1:3000/api/v1/getuser/2' `
--header 'Content-Type: application/json'```

 - "/getuserbyep" =>
```   
curl --location --request GET '127.0.0.1:3000/api/v1/getuserbyep' `
--header 'Content-Type: application/json' `
--data '{ "email": "charan@gmail.com", "password": "1234" }' 
```
- "/adduser" =>
```
curl --location --request POST '127.0.0.1:3000/api/v1/adduser' `
>> --header 'Content-Type: application/json' `
>> --data '{ "name":"demo","age":33,"email":"demo@gmail.com","password":"demo" }'
```

- "/deleteuser/:id" =>
```
curl --location --request DELETE '127.0.0.1:3000/api/v1/deleteuser/4' --header 'Content-Type: application/json'
```

- "/updateuser/:id" =>
```
curl --location --request PUT '127.0.0.1:3000/api/v1/updateuser/8' `
>> --header 'Content-Type: application/json' `
>> --data '{ "name":"charan","age":24,"email":"charan@gmail.com","password":"1234" }'
```
