# Notification Service API

---

## This Notification Service API revolves around accepting notification requests for sending mails asynchronously to the given recipientMails.

## Features

---

- This Notification Service API revolves around accepting notification requests for sending mails to the given recipientMails and  sending the notification tracking id as response back so later the requester can know the status of notification request.
- Also , a scheduler has been implemented(that will run after every predefined interval passed) , so for each notification having unsent status, mail will be sended to each recipient.

### Code organisation in the repository-

---

The whole code base is arranged in multiple directories and files.
Project follows Models, Controllers, Routes (MCR Architecture Pattern), to arrange the code.

1. Models directory contain files dealing with the defining the database Schemas.
2. Controllers directory contain files dealing with handling the core business logic.
3. Routes directory contain the files managing with the routes.
4. Middlewares directory to define all middlewares(generally related for validating incoming requests).
5. Utils directory contains the files that have reusable code(functions).
6. Configs directory for all configs file to configure all the configurations realted to server,database and authentication.
7. Notifier directory contains the file that have logic realted to emailService Notifier for sending the email.
8. Scheduler directory contains the file that have the logic to scehdule email sending event.
9. The main startup file is "server.js".

### Tech

---

Notification Service API, uses a number of open source projects (all are npm packages) to work properly:

- [Express](https://www.npmjs.com/package/express)- Express is a web framework for node. Using it to create a server and managing dofferent routes.
- [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv to load environment variables from a .env file into process.env
- [mongoose](https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- [node-cron](https://www.npmjs.com/package/node-cron) - The node-cron module is tiny task scheduler in pure JavaScript .Here ,using it to schedule email sending event.
- [node-mailer](https://www.npmjs.com/package/nodemailer) - To Send emails from Node.js environment with ease.
- [nodemon](https://www.npmjs.com/package/nodemon) -Dev Dependency,Used as tool that helps developing Node.js based applications by automatically restarting the node application when file changes in the directory are detected. Can skip the devDepedency by changing the scripts properties values in package.json file.
- this app requires Node.js(Runtime Environment) v16+ and mongodb v5+(Database, for persistance of data) to run.

#### Install the dependencies and devDependencies by following instructions.

```sh
cd notificationServiceAPI
npm install
```

#### Before running the app locally, ensure to copy env.sample file and change it to .env and rewrite all your configuration variables value over there.Incase running in production,ensure to configre those variables first in production and change the scripts property value under package.json file accordingly.

#### IMPORTANT NOTE-This App uses SMTP server for sending mail, so ensure to configure SMTP realted configuration in the .env config file before running the app.

### Installation

---

- To make notificationServiceAPI is up and running in your machine, follow the below steps after all configuration and related dependecies installation done.

```sh
cd notificationServiceAPI
npm start
```

Express application,notificationServiceAPI will up and running on configured port.

### Different REST endpoints available ---

### 1.Notification Request (Creation)

---

```sh
POST /notificationService/api/v1/notifications
Headers :
 Content-Type:application/json
Sample request body :
{
    "recipientEmails":["sample@email.com","another@email.com"],
    "content":"Content is fine",
    "subject":"Subject is too descriptive."
}
Sample response body : 
{
    "success": true,
    "message": "Request has been accepted.",
    "trackingId": "62ed5924c6d92449652012fe"
}
```

Details about the JSON structure (Request Body)

- content : Mandatory
- subject : Manadatory
- recipientEmails : Manadatory and ArrayType containing all valid emails.

#### NOTE-

For each notification request sent, status property will be added by default with value UN_SENT , which gets updated to SENT status , after scheduler runs and notifier sends the email successfully. Middleware will check the incoming request and validate them, and only after validation pass to the next function in the request processing pipeline.

### 2. Get the Notification Request Status through notification trackingId

---

```sh
GET /notificationService/api/v1/notifications/:id

GET /notificationService/api/v1/notifications/62ed5924c6d92449652012fe  (EXAMPLE)
Sample request body : <Empty>
Sample response body : 
{
    "success": true,
    "data": {
        "_id": "62ed5924c6d92449652012fe",
        "recipientEmails": [
            "sample@email.com",
            "another@email.com"
        ],
        "subject": "Subject is too descriptive.",
        "content": "Content is fine",
        "status": "SENT",
        "createdAt": "2022-08-05T17:53:40.944Z",
        "updatedAt": "2022-08-05T17:53:56.372Z"
    }
}
```

#### 3. Any request of anytype on invalid endpoint , that doesnt exists, will send response status 404 NOTFOUND with proper response message

---

```sh
GET|POST|PUT|DELETE  /InvalidEndPoint

GET /notificationService/api/v1/ (Example)
Sample request body : <EMPTY>
Sample response body : 
{
    "success": "false",
    "message": "The requested endpoint doesn't exists."
}
```
