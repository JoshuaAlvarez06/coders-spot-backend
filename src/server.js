const app = require("./app");
const { PORT = 5001 } = process.env;

const listener = () => console.log(`Listening on PORT: ${PORT}`);

app.listen(PORT, listener);
