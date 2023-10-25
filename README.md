# Africom microservice

Backend API for managing ticket creation, booking, reservation and payment system.

### Technologies

<div align="center">

<a href="">![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)</a>
<a href="">![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)</a>
<a href="">![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)</a>

</div>
<div align="center">

<a href="">![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)</a>
<a href="">![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)</a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
<a href="">![Node-Nats-Streaming](https://img.shields.io/badge/Node_Nats-%23F05033.svg?style=for-the-badge&logo=node&logoColor=white)</a>

</div>
<br/>
<br/>
### Requirements

##### 1. Docker Daemon
##### 2. Visual Studio
<br/><br/><br/>

### Installation

Firstly, you need to clone the repository into your local machine

```javascript
$ git clone https://github.com/raphdoo/Africom-microservices.git
```
<br/><br/>
Secondly, change directory into the project file

```
$ cd Africom-microservices
```
<br/><br/>
Next, you need to update the hosting route to 'ticketing.dev'
#### MacOS/Linux
```javascript
$ /etc/hosts
```

#### Windows
```javascript
$ C:\Windows\System32\Drivers\etc\hosts
```
<br/>
You then add "127.0.0.1 ticketing.dev" to the opened file. This sets a new localhost route of ticketing.dev
<br/><br/>
Next, you need to create jwt-secret in kubernetes. Ensure to have a running docker Daemon
```javascript
$ kubectl create secret generic jwt-secret --from-literal=jwt=mysecret
```
<br/><br/>
Thirdly, you need to start the pods using skaffold

```javascript
$ skaffold dev
```
<br/><br/><br/>
### Testing

To run the test

```java
$ npm run test
```
<br/><br/>
### Base URL

http://localhost:3000

<br/><br/><br/>
- Response

```java
  * 200: success
  * 400: error || BadRequest Error/Request Validation Error
  * 401: error || Not Authorized Error
  * 404: error || Not Found Error
  * 500: error || Server/Database Error

```
