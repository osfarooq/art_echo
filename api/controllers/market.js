import { db } from "../connect.js";

export const getMarketItems = (req, res) => {
    //const userId = req.params.userId;
    const q = "SELECT * FROM artecho.marketplace;";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      const { password, ...info } = data;
      return res.json(info);
    });
  };


  export const uploadMarketItem = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");
  
    jwt.verify(token, "secretKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token not valid.");
  
      const q =
        "INSERT INTO artecho.marketplace (`title`, `description`, `userId`, `price`, `availability`, `picture`, `createdAt`) VALUES (?, ?, ?, ?, ?, ?, ?);";
      const values = [
        req.body.title,
        req.body.description,
        userInfo.id,
        req.body.price,
        req.body.availability,
        req.body.picture,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ];
  
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Artwork Uploaded!");
      });
    });
  };