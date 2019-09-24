const { http } = require('./server');
const port = process.env.PORT || 3000;
http.listen(port, () => console.log(`Listening on port ${port}`));
