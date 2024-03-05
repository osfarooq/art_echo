import { db } from "../connect.js";
import moment from "moment/moment.js";
import jwt from "jsonwebtoken";

export const uploadArt = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid.");
    console.log("artworkControlle" + req.body.picturePath);
    const q =
      "INSERT INTO artecho.artwork (`picturePath`, `ownerId`, `status`) VALUES (?, ?, ?);";
    const values = [req.body.picturePath, userInfo.id, "pending"];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post Uploaded!");
    });
  });
};

// Function to get artwork items with status 'pending'
export const getPendingArtwork = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid.");

    const q =
      "SELECT * FROM artecho.artwork WHERE status = 'pending'";
    const ownerId = userInfo.id;

    db.query(q, [ownerId], (err, data) => {
      if (err) return res.status(500).json(err);
      console.log(data);
      return res.status(200).json(data);
    });
  });
};

// Function to get artwork items with status 'approved'
export const getApprovedArtwork = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid.");

    const q =
      "SELECT * FROM artecho.artwork WHERE status = 'approved' AND ownerId = ?";
    const ownerId = userInfo.id;

    db.query(q, [ownerId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

// Function to change items' status from 'pending' to 'approved'
export const approveArtwork = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid.");
    const artworkId = req.params.id; // assuming you pass artworkId through URL params
    console.log('artworkd' + artworkId)
    const q =
      `UPDATE artecho.artwork SET status = 'approved' WHERE id = ${artworkId}`;

    db.query(q, [artworkId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Artwork approved!");
    });
  });
};
