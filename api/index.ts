import { Request, Response } from "express";
import express from "express";
require("dotenv").config();
const app = express();

app.use(express.static("public"));

const users = [{ name: "win", email: "min@min" }];

const myhtml = `
<html>
  <body>
  <h1>ha</h1>
    <script>
     localStorage.setItem("win", '${process.env.API_URL}');
     window.location.href="/"
    </script>
  </body>
</html>

`;

app.get("/userHome", (req: Request, res: Response) => {
  res.send(myhtml);
});

app.get("/users", (req: Request, res: Response) => {
  res.send(users);
});

app.listen(3000);
