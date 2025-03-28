import express from "express";
import cloudinary from "../lib/cloudinary.js";
import middleware from "../middleware/auth.middleware.js";

const router = express.Router();

// router
router.post("/", middleware, async (req, res) => {
  try {
    let userID = req.userID;
    // console.log(userID);

    let { title, caption, img, rating } = req.query;
    if (!title || !caption || !img || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // upload the image to cloudinary
    let uploadResponse = await cloudinary.uploader.upload(img);
    let imgUrl = uploadResponse.secure_url;
    // save the image to the database

    // save the details to the database
    const newImage = await Image.create({
      title,
      caption,
      image: imgUrl,
      rating: parseInt(rating),
      //   user: req.user.id,
    });

    res.status(201).json(newImage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

export default router;
