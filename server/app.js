import cookieSession from "cookie-session";
import cors from "cors";
import express, { json, urlencoded } from "express";
// import { role, sequelize } from "./src/models";
import { default as authRoute } from "./src/routes/auth.routes.js";
import { default as userRoute } from "./src/routes/user.routes.js";

const app = express();

// const Role = role;

app.use(
  cors()
);


// sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    // keys: ['key1', 'key2'],
    // keys: [/* secret keys */],
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to users management application." });
});

// routes
// routes
// require('./src/routes/auth.routes.js').default(app);
authRoute(app);
// require('./src/routes/user.routes.js').default(app);
userRoute(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });

//   Role.create({
//     id: 2,
//     name: "admin"
//   });
// }