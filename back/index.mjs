import express, { json } from "express";
import cors from "cors"
import fs from "fs";

const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());
// const user = [
//     {
//         name: "tuwshuu",
//         age: 17
//     },
//     {
//         name: "bata",
//         age: 20
//     }]
//app.get("/user", (req, response) => {
//  const { name } = req.params;
//  const you =user.filter((user) => user.name==name)[0]
//  response.json("you");
//});
// app.post("/user/", (req, response) => {
//     const {name,age} =req.body;
//     user.push({name,age})
//     response.json({user: user});

//    // user.push(req.body)
//     //response.json(user)
// });

app.get("/user", (request, response) => {
  const body = request.body;
  console.log(body);
  fs.readFile("./back-end/user.json", (readError, data) => {
    if (readError) {
      response.json({
        status: "read file error",
      });
    }
    let savedata = JSON.parse(data);
    const newUser = {
      id: Date.now().toString(),
      username: body.name,
      age: body.age,
    };
    savedata.push(newUser);
    fs.writeFile(
      "./back-end/user.json",
      JSON.stringify(savedata),
      (writeError) => {
        if (writeError) {
          response.json({
            stateus: "failed",
            data: savedata,
          });
        } else {
          response.json({
            stateus: "success",
            data: savedata,
          });
        }
      }
    );
  });
});
app.patch("/:id", (req, response) => {
  const body = req.body;
  const { id } = req.params;
  fs.readFile("./back-end/user.json", "utf-8", (writeError, data) => {
    if (writeError) {
      response.json({
        stateus: "failed",
        data: savedata,
      });
    }
    let datachange = JSON.parse(data);
    let jsonparse = datachange.filter((x) => x.id == id);
    console.log(Object.keys(jsonparse[0]));
    Object.keys(body).map((x) => {
      Object.keys(jsonparse[0]).map((y) => {
        if (x == y) {
          datachange.map((vare) => {
            if (vare.id == id) {
              vare[y] = body[x];
              console.log(datachange);
            }
          });
        }
      });
    });

    fs.writeFile(
      "./back-end/user.json",
      JSON.stringify(datachange),
      (error) => {
        if (error) {
          response.send("failed");
        } else {
          response.send(datachange);
        }
      }
    );
  });
});

app.listen(port, () => {
  console.log("server is running on http://localhost:" + port);
});
