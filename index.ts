import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://cookie-testing-g10l.onrender.com", //for local testing use http://localhost:3000, you can use other ports as well.
    credentials: true,
  })
);
app.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.cookie("test", "12345", {
    // httpOnly: true, -> for local developement keep it true.
    secure: true,
    domain: "https://cookie-testing-g10l.onrender.com",
    path: "/",
  });
  return res.json({ message: "Cookies sent, check the network tab", email });
});

app.listen(PORT, () => {
  console.log("Server is up and running on port " + PORT);
});
