import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      //frontend domain array
      "https://cookie-testing-g10l.onrender.com",
      "https://cookie-testing-frontend-teal.vercel.app",
    ], //for local testing use http://localhost:3000, you can use other ports as well.
    credentials: true,
  })
);

app.get("/", async (req: Request, res: Response) => {
  return res.send("Working");
});

app.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.cookie("test", "12345", {
    // httpOnly: true, -> for local developement keep it true.
    secure: true,
    // sameSite: "none",
    // domain: "https://cookie-testing-g10l.onrender.com", //for local development use localhost
    domain: "cookie-testing-frontend-teal.vercel.app", //-> use a custom domain bro, then you can turn this domain option on. this is the frontend domain obviously.
    path: "/",
  });
  return res.json({ message: "Cookies sent, check the network tab", email });
});

app.listen(PORT, () => {
  console.log("Server is up and running on port " + PORT);
});
