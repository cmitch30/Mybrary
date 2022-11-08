const express = require("express");
const Author = require("../models/author");
const Book = require("../models/books");
const router = express.Router();
const path = require('path')
const uploadPath = path.join('public', Book.coverImageBasePath)
const multer = require('multer')
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter:(req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

//All Books Route
router.get("/", async (req, res) => {
    res.send('All Books')
});

//New Book Route
router.get("/new", async (req, res) => {
    try {
        const authors = await Author.find({})
        const book = new Book()
        res.render('books/new', {
            authors:authors,
            book:book
        })
    } catch {
        res.redirect('/books')
    }
});

//Create Book Route
router.post("/", upload.single('cover'), async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description
    })
});



module.exports = router;
