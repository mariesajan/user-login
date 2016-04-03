## UserLogin

An example project done as part of learning **node js, passport** and **jade.**

Registration and login functionalities are done using [passport.js](http://passportjs.org/) which is an authentication middleware

### Installation

1. Install node.js

2. Install [MongoDB](https://www.mongodb.org/downloads#production)

3. Save in MongoDB/bin/`mongobatch.bat`.

    ````
    // Replace mongoDBPath with your local MongoDB path
    mongod --directoryperdb --dbpath mongoDBPath\data\db --logpath mongoDBPath\log\mongodb.log --logappend --rest –install
    ````
4.  Run `mongobatch` and mongoDB client

    ```
    $ mongobatch
    $ mongod
    ```

5. Open mongo shell to execute mongo commands.

    ```
    $ mongo
    ```

6. Copy files in repository

7. Install dependencies

    ```
    $ npm install
    ```

8. Start server

    ```
    $ npm start
    ```

9. Open [localhost:3000](localhost:3000)
