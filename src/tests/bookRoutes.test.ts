import request from "supertest";
import app from "../app.js";
import { BookRepository } from "../repositories/bookRepository.js";

describe("Book Routes", () => {
  let bookRepository: BookRepository;

  beforeEach(() => {
    bookRepository = new BookRepository();
    // Reset books before each test
    bookRepository.findAll().length = 0;
  });

  it("should create a new book", async () => {
    const res = await request(app).post("/books").send({
      title: "Test Book",
      author: "Test Author",
      isbn: "1234567890",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Test Book");
  });

  it("should not create a book with missing isbn", async () => {
    const res = await request(app).post("/books").send({
      title: "Test Book",
      author: "Test Author",
    });
    expect(res.statusCode).toEqual(400);
  });

  it("should get all books", async () => {
    bookRepository.create({
      title: "Test Book 1",
      author: "Test Author 1",
      isbn: "111",
    });
    bookRepository.create({
      title: "Test Book 2",
      author: "Test Author 2",
      isbn: "222",
    });

    const res = await request(app).get("/books");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
  });

  it("should get a book by id", async () => {
    const newBook = bookRepository.create({
      title: "Test Book",
      author: "Test Author",
      isbn: "123",
    });
    const res = await request(app).get(`/books/${newBook.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(newBook.id);
  });

  it("should update a book", async () => {
    const newBook = bookRepository.create({
      title: "Test Book",
      author: "Test Author",
      isbn: "123",
    });
    const res = await request(app).put(`/books/${newBook.id}`).send({
      title: "Updated Book",
      author: "Updated Author",
      isbn: "456",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe("Updated Book");
  });

  it("should delete a book", async () => {
    const newBook = bookRepository.create({
      title: "Test Book",
      author: "Test Author",
      isbn: "123",
    });
    const res = await request(app).delete(`/books/${newBook.id}`);
    expect(res.statusCode).toEqual(204);

    const getRes = await request(app).get(`/books/${newBook.id}`);
    expect(getRes.statusCode).toEqual(404);
  });
});
