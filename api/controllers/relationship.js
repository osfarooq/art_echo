import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
  const q = "SELECT followerUserId FROM artecho.relationships WHERE followedUserId = ?";

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((relationship) => relationship.followerUserId));
  });
};


export const getFriends = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid.");

    const q = "SELECT followedUserId FROM artecho.relationships WHERE followerUserId = ?";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

     const friendIds = data.map((relationship) => relationship.followedUserId);
      console.log(friendIds);
      return res.status(200).json(friendIds);
    });
  });
};


export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid.");

    const q = "INSERT INTO artecho.relationships(`followerUserId`, `followedUserId`) VALUES (?, ?);";
    const values = [userInfo.id, req.body.userId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following!");
    });
  });
};

export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid.");

    const q = "DELETE FROM artecho.relationships WHERE `followerUserId` = ? AND `followedUserId` = ?;";

    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollowed.");
    });
  });
};
