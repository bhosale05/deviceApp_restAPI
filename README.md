# deviceApp_restAPI

## Installation Setps
    - git clone https://github.com/bhosale05/deviceApp_restAPI.git
    - npm Install

## Executation setps
    - npm start 

## Config Details
    - port get from config.json file, but in device app ui use 3000 
    - user want to change port then need to update port on config.json file and also update in vue code 

## List Of API hit on Postman For Add new User 
    1.Add New User
        Method : Post
        URl :  localhost:3000/adduser
        Payload : {
                    "username" : "joy",
                    "mobile" : "9665275196",
                    "email":"joy@gmail.com",
                    "password":"joy@123"
                }
    
    2. Login user: 
        Method : put
        URL :  localhost:3000/adddevice
        Payload : {
                    "device":"Moto G",
                    "os":"Android 4.3",
                    "manufacturer":"Motorola",
                    "ischeckedout" : false,
                    "lastcheckedoutby" : "joy"
                }

    4.Add New Device
        Method : Post
        URl :  localhost:3000/adduser
        Payload : {
                    "username" : "joy",
                    "mobile" : "9665275196",
                    "email":"joy@gmail.com",
                    "password":"joy@123"
                }
    4.Get All Device
        Method : Get
        URl :  localhost:3000/getdevice

    5. Remove Device By ID : 
        Method : Delete
        URl :  localhost:3000/remove/:id like localhost:3000/remove/60b3d237e14b632cbc4ca20a
        
    5. Update Device By ID : 
        Method : Put
        URl :  localhost:3000/update/:id like localhost:3000/update/60b3d237e14b632cbc4ca20a
        Payload : {
            "ischeckedout" : false,
            "lastcheckedoutby" : "joy",
            "lastcheckedoutdate" : "01-07-2021:21:19:55"
        }

        Note : user update device details i.e. checkout in between 09:00:00 AM to 17:00:00 PM
    
     5. Logout : 
        Method : Get

        Note: destory session