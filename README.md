# Project: E-Commerce App
This project is my first full stack application. This will contain all the basic features found in any e-commerce website.
> Payment section will be skipped ( This may change laten on )

## Getting started
Run command in terminal to:  
install all packages 
``` shell
$ npm install
```
To run backend server at (run this first): http://localHost:43576/
``` shell
$ npm run start
```
To run front end server: http://localhost:5173/
``` shell
$ cd views
$ npm run dev
```

## TODO List (Backend)
- ~~Setup each routes with its appropriate requests and responses~~
- Setup common middleware for all the repetative param lookups
- ~~Setup error handling in case of bad request or server issue~~
- Setup a proper structure that identifies error code for backend to database data flow
- ~~Setup hashing for user login~~
- ~~Setup authentication and authorisation~~
- ~~Setup session & cookie~~
- Setup client connection & transaction for all database related requests
- Setup user based database schema giving access to specific tables on user level (isolating each users access to database)
- Create SSL/ TLS certificate for all our connections ( backend <---> database )
- Structure backend file in a organized manner
