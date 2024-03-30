//creating express server
import express from "express";

const app = express();
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import marketRoutes from "./routes/markets.js";
import artworkRoutes from "./routes/artworks.js"

import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import path from "path";

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(express.json());
app.use(cookieParser());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post(
  "/api/upload",
  upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
  })

  // Download file route
app.get("/api/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = "../client/public/upload/"+ filename;
  res.download(filePath, (err) => {
    if (err) {
      console.log("Error downloading file:", err);
    }
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/markets", marketRoutes);
app.use("/api/artworks", artworkRoutes);

app.listen(8800, () => {
  console.log("API Connected & Working!");
});
