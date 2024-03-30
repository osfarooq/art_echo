import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM artecho.users WHERE id = ?;";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const getAllUsers = (req, res) => {
  //const userId = req.params.userId;
  const q = "SELECT * FROM artecho.users;";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data;
    return res.json(info);
  });
};

export const getPendingUsers = (req, res) => {
  //const userId = req.params.userId;
  const q = "SELECT * FROM artecho.users WHERE status = 'pending'";
 
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);

  });
};

export const deleteUser = (req, res) => {
  const userId = req.params.userId;
  const q = "DELETE FROM artecho.users WHERE id = ?;";

  db.query(q, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "User deleted successfully" });
  });
};

export const approveUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid.");
    const userId = req.params.id; // assuming you pass artworkId through URL params
    console.log('userid' + userId)
    const q =
      `UPDATE artecho.users SET status = 'approved' WHERE id = ${userId}`;

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User approved!");
    });
  });
};

// export const uploadArt = (req, res) => {
//   const token = req.cookies.accessToken;
//   if (!token) return res.status(401).json("Not logged in");

//   jwt.verify(token, "secretKey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token not valid.");



//     const userId = req.params.id; // assuming you pass artworkId through URL params
//     console.log('userid' + userId)
//     const q =
//       `UPDATE artecho.users SET picturePath = ? WHERE id = ${userId}`;

//     db.query(q, [userId], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.status(200).json("User approved!");
//     });
//   });
// };

export const uploadArt = (req, res) => {
  // const token = req.cookies.accessToken;
  // if (!token) return res.status(401).json("Not logged in");

  // jwt.verify(token, "secretKey", (err, userInfo) => {
  //   if (err) return res.status(403).json("Token not valid.");

    const userId = req.params.id;
    const picPath = req.body.picturePath;

    const q = `UPDATE artecho.users SET picturePath = ? WHERE id = ?`;
    const values = [picPath, userId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Uploaded!");
    });
  //});
};


// export const updateUser = (req, res) => {
//   const token = req.cookies.accessToken;
//   if (!token) return res.status(401).json("Not logged in");

//   jwt.verify(token, "secretKey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token not valid.");

//     const q =
//       "UPDATE users SET `name` = ?, `username` = ?, `city` = ?, `profilePicture` = ?, `coverPicture` = ? WHERE id = ?";

//       db.query(q, [
//         req.body.name,
//         req.body.username,
//         req.body.city,
//         req.body.profilePicture,
//         req.body.coverPicture,
//         userInfo.id
//       ], (err, data) => {
//         if(err) res.status(500).json(err)
//         if(data.affecyedRows > 0) return res.json("Updated Successfuly")
//         return res.status(403).json("You can update only your own posts!")
//       });
//   });
// };
