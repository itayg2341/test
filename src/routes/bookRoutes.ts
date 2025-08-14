import { Router } from "express";
import { BookRepository } from "../repositories/bookRepository";
import { BookInput } from "../models/book";

const router = Router();
const bookRepository = new BookRepository();

router.get("/", (req, res) => {
  res.json(bookRepository.findAll());
});

router.get("/:id", (req, res) => {
  const book = bookRepository.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

router.post("/", (req, res) => {
  const result = BookInput.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error);
  }
  const newBook = bookRepository.create(result.data);
  res.status(201).json(newBook);
});

router.put("/:id", (req, res) => {
  const result = BookInput.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error);
  }
  const updatedBook = bookRepository.update(req.params.id, result.data);
  if (updatedBook) {
    res.json(updatedBook);
  } else {
    res.status(404).send("Book not found");
  }
});

router.delete("/:id", (req, res) => {
  const success = bookRepository.delete(req.params.id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).send("Book not found");
  }
});

export default router;

