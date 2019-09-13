# Tuber

# Create a database

After installing a PostgreSQL server, create a new databases called _tuber_.

```bash
createdb tuber

# On Windows run the executable
# createdb.exe tuber
```
>NOTE:
>If testing, create a second database for testing called _tuber_test_.

# npm Commands
Running a few npm commands and scripts is neccesary to launch application.
Application will run on localhost:3000 be default without env file
```bash
npm i
npm run:seed
npm run start:dev
```

