# Tuber
# Install dependencies
After installing `npm` and forking this repo, run the following command.
```
npm i
```

# Create a database
After installing a PostgreSQL server, create a new databases called *tuber*. 

```bash
createdb tuber

# On Windows run the executable
# createdb.exe tuber

#If testing, create a testing database
createdb tuber_test
```

# Testing
If testing, run the appropriate script in the `package.json` file. For linux-like machines run:
```
npm run test
```

# Start Server
To start building the Express app on a server run:

```bash
npm run start # to start the program
npm run start:dev # to watch as you develop
```