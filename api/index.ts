import { Request, Response } from "express";
import express from "express";
import { v4 as uuid4 } from "uuid";
import bodyParser from "body-parser";
import { createWriteStream, mkdirSync, existsSync } from "fs";
import formidable from "formidable";

require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

const dir = __dirname + "/upload";
if (!existsSync(dir)) {
  mkdirSync(dir);
}

const users = [{ name: "win", email: "min@min" }];

const myhtml = `
<html>
  <body>
    <script>
     localStorage.setItem("win", '${process.env.API_URL}');
     window.location.href="/"
    </script>
  </body>
</html>

`;

app.get("/api", (req: Request, res: Response) => {
  res.send(myhtml);
});

app.post("/fileupload", (req: Request, res: Response) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    res.json({ fields, files });
  });
});

app.get("/users", (req: Request, res: Response) => {
  res.send(users);
});

app.listen(3000);
