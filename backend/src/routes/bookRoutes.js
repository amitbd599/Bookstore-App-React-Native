import express from "express";
import cloudinary from "../lib/cloudinary.js";
import middleware from "../middleware/auth.middleware.js";
import Book from "../models/Book.js";

const router = express.Router();

// router
router.post("/", middleware, async (req, res) => {
  try {
    let userID = req.userID;
    console.log(userID);

    let { title, caption, image, rating } = req.body;
    console.log({ title, caption, image, rating });

    if (!title || !caption || !image || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // upload the image to cloudinary
    let uploadResponse = await cloudinary.uploader.upload(image);
    let imgUrl = uploadResponse.secure_url;
    // save the image to the database

    // save the details to the database
    const book = await Book.create({
      title,
      caption,
      image: imgUrl,
      rating: parseInt(rating),
      user: userID,
    });

    res.status(201).json(book);
  } catch (error) {
    console.log(error.toString());
    res.status(500).json({ message: "An error occurred", error });
  }
});

router.get("/", async (req, res) => {
  try {
    let page = req.params.page || 1;
    let limit = parseInt(req.query.limit) || 5;
    let skip = (page - 1) * limit;
    let books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "userName profileImage ");

    let total = await Book.countDocuments();
    let totalPages = Math.ceil(total / limit);
    res.status(200).json({ books, currentPage: page, total, totalPages });
  } catch (error) {
    console.log(error.toString());
    res.status(500).json({ message: "An error occurred", error });
  }
});

export default router;
