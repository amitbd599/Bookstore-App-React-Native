import express from "express";
import cloudinary from "../lib/cloudinary.js";
import middleware from "../middleware/auth.middleware.js";
import Book from "../models/Book.js";

const router = express.Router();

// router
router.post("/", middleware, async (req, res) => {
  try {
    let userID = req.userID;

    let { title, caption, image, rating } = req.body;

    if (!title || !caption || !image || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // upload the image to cloudinary
    let uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "book_app",
      use_filename: true,
    });
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

router.get("/", middleware, async (req, res) => {
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

router.delete("/:id", middleware, async (req, res) => {
  try {
    let bookID = req.params.id;
    let book = await Book.findById(bookID);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.user.toString() !== req.userID) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // delete the image from cloudinary
    if (book.image && book.image.includes("cloudinary")) {
      try {
        let publicID = book.image
          .split("/")
          [book.image.split("/").length - 1].split(".")[0];
        await cloudinary.uploader.destroy(publicID);
        console.log("Image deleted from cloudinary");
      } catch (error) {
        console.log("Error deleting image from cloudinary", error);
        return res
          .status(500)
          .json({ message: "Error deleting image from cloudinary" });
      }
    }

    await book.deleteOne();
  } catch (error) {
    console.log(error.toString());
    res.status(500).json({ message: "An error occurred", error });
  }
});

router.get("/user", middleware, async (req, res) => {
  try {
    let books = await Book.find({ user: req.userID }).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    console.log(error.toString());
    res.status(500).json({ message: "An error occurred", error });
  }
});

export default router;
