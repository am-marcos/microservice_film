import request from "supertest";
import express from "express";
import userRoutes from "../src/routes/userRoutes";
import connectDB from "../src/database/database";
import mongoose from "mongoose";
import logger from "../src/middleware/logger";
import errorHandler from "../src/middleware/errorHandler";
import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";

const app = express();
app.use(express.json());
app.use(logger);
app.use("/api", userRoutes);
app.use(errorHandler);

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Routes", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/users").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name", "Test User");
    expect(res.body).toHaveProperty("email", "testuser@example.com");
  });

  it("should fetch all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should fetch a user by ID", async () => {
    const user = await request(app).post("/api/users").send({
      name: "Test User",
      email: "testuser2@example.com",
      password: "password123",
    });

    const res = await request(app).get(`/api/users/${user.body.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", user.body.id);
    expect(res.body).toHaveProperty("name", "Test User");
    expect(res.body).toHaveProperty("email", "testuser2@example.com");
  });

  it("should update a user by ID", async () => {
    const user = await request(app).post("/api/users").send({
      name: "Test User",
      email: "testuser3@example.com",
      password: "password123",
    });

    const res = await request(app).put(`/api/users/${user.body.id}`).send({
      name: "Updated User",
      email: "updateduser@example.com",
      password: "newpassword123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", user.body.id);
    expect(res.body).toHaveProperty("name", "Updated User");
    expect(res.body).toHaveProperty("email", "updateduser@example.com");
  });

  it("should delete a user by ID", async () => {
    const user = await request(app).post("/api/users").send({
      name: "Test User",
      email: "testuser4@example.com",
      password: "password123",
    });

    const res = await request(app).delete(`/api/users/${user.body.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User deleted");
  });
});
