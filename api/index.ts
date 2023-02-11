import { Request, Response } from "express";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import bodyParser from "body-parser";
import { createWriteStream, mkdirSync, existsSync, renameSync } from "fs";
import formidable, { Fields, Files } from "formidable";

require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

const dir = __dirname + "/../image";
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

app.get("/api/route", (req: Request, res: Response) => {
  res.send(myhtml);
});

app.post("/api/fileupload", (req: Request, res: Response) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields: Fields, files: Files) => {
    console.log(err, fields, files);
    let myfiles = JSON.parse(JSON.stringify(files.uploadFiles));

    if (!Array.isArray(myfiles)) {
      let myfile = JSON.parse(JSON.stringify(files.uploadFiles));
      let tempPath = myfile.filepath;
      let newPath =
        __dirname + "/../image/" + uuidv4() + myfile.originalFilename;
      console.log(myfile.size);
      renameSync(tempPath, newPath);
    } else {
      myfiles.forEach((file) => {
        let tempPath = file.filepath;
        let newPath =
          __dirname + "/../image/" + uuidv4() + file.originalFilename;
        console.log(file.filepath, file.originalFilename);
        renameSync(tempPath, newPath);
      });
    }

    res.json({ message: "success" });
  });
});

app.get("/api/users", (req: Request, res: Response) => {
  res.send(users);
});

app.listen(3000);
