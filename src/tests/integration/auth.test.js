const request = require("supertest");
const app = require("../../src/app");
const { User } = require("../../src/models");

describe("Authentication Endpoints", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/v1/auth/register", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "Borrower",
        phone: "+1234567890",
      };

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.data.user.password).toBeUndefined();
    });

    it("should return validation error for invalid email", async () => {
      const userData = {
        name: "John Doe",
        email: "invalid-email",
        password: "password123",
        role: "Borrower",
      };

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      const user = new User({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "Borrower",
      });
      await user.save();
    });

    it("should login with valid credentials", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
    });

    it("should return error for invalid credentials", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
