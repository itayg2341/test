import { v4 as uuidv4 } from "uuid";
import { Book, BookInput } from "../models/book.js";

const books: Book[] = [];

export class BookRepository {
  findAll(): Book[] {
    return books;
  }

  findById(id: string): Book | undefined {
    return books.find((book) => book.id === id);
  }

  create(bookInput: BookInput): Book {
    const newBook: Book = { ...bookInput, id: uuidv4() };
    books.push(newBook);
    return newBook;
  }

  update(id: string, bookInput: BookInput): Book | undefined {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      return undefined;
    }
    const updatedBook = { ...bookInput, id };
    books[bookIndex] = updatedBook;
    return updatedBook;
  }

  delete(id: string): boolean {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      return false;
    }
    books.splice(bookIndex, 1);
    return true;
  }
}
