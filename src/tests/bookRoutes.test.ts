import request from "supertest";
import app from "../app";
import { __resetBooks } from "../repositories/bookRepository";

describe("Book Routes", () => {
  beforeEach(() => {
    __resetBooks();
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
    await request(app).post("/books").send({
      title: "Test Book 1",
      author: "Test Author 1",
      isbn: "111",
    });
    await request(app).post("/books").send({
      title: "Test Book 2",
      author: "Test Author 2",
      isbn: "222",
    });

    const res = await request(app).get("/books");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
  });

  it("should get a book by id", async () => {
    const createRes = await request(app).post("/books").send({
      title: "Test Book",
      author: "Test Author",
      isbn: "123",
    });
    const newBookId = createRes.body.id;

    const res = await request(app).get(`/books/${newBookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(newBookId);
  });

  it("should update a book", async () => {
    const createRes = await request(app).post("/books").send({
      title: "Test Book",
      author: "Test Author",
      isbn: "123",
    });
    const newBookId = createRes.body.id;

    const res = await request(app).put(`/books/${newBookId}`).send({
      title: "Updated Book",
      author: "Updated Author",
      isbn: "456",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe("Updated Book");
  });

  it("should delete a book", async () => {
    const createRes = await request(app).post("/books").send({
      title: "Test Book",
      author: "Test Author",
      isbn: "123",
    });
    const newBookId = createRes.body.id;

    const res = await request(app).delete(`/books/${newBookId}`);
    expect(res.statusCode).toEqual(204);

    const getRes = await request(app).get(`/books/${newBookId}`);
    expect(getRes.statusCode).toEqual(404);
  });
});

