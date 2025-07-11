import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import githubRouter from "./routes/github.js";
import contestRouter from "./routes/contests.js";
import leetcodeRouter from "./routes/leetcode.js";
dotenv.config();

const app = express();
app.use(cors());
app.use("/api/github", githubRouter);
app.use("/api/leetcode", leetcodeRouter);
app.use("/api/contests", contestRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
