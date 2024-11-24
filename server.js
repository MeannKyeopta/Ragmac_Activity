const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const books = [
    { id: 1, title: "He's into Her", author: 'Maxinejiji' },
    { id: 2, title: "The Broken Mask", author: 'Cecelib' },
    { id: 3, title: "He Married his Secretary", author: 'Makiwander' },
  ];

// create a books
app.post("/books", (req, res) => {
  const { title, author } = req.body; // to get the title and author from the request body
  const newBook = { id: books.length + 1, title, author }; // to create a new book object
  books.push(newBook); // to add the new book to the books array
  res.status(201).json(newBook); // to send the new book as a response
});

// to get all books
app.get("/books", (req, res) => {
  res.json(books); // to send the books array as a response
});

// to get a book by id
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id)); // to find the book by id
  if (!book) return res.status(404).json({ message: "Book not found" }); // to send a 404 status code and a message if the book is not found
  res.json(book); // to send the book as a response
});

// to update a book
app.put("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id)); // to find the book by id
  if (!book) return res.status(404).json({ message: "Book not found" }); // to send a 404 status code and a message if the book is not found

  const { title, author } = req.body; // to get the title and author from the request body
  book.title = title; // to update the title of the book
  book.author = author; // to update the author of the book
  res.json(book); // to send the updated book as a response
});

// to delete a book
app.delete("/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id)); // to find the index of the book by id
  if (index === -1) return res.status(404).json({ message: "Book not found" }); // to send a 404 status code and a message if the book is not found

  books.splice(index, 1); // to delete the book from the books array
  res.status(204).send(); // to send a 204 status code
});
