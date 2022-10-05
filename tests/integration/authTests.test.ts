import supertest from "supertest";
import app from "../../src/app";
import { signInFactory, SignUpFactory } from "../factories/authFactory";
import {
  deleteAllData,
  disconnectPrisma,
} from "../factories/scenarioFactories";

beforeEach(async () => {
  await deleteAllData();
});

afterAll(async () => {
  await disconnectPrisma();
});

const server = supertest(app);

describe("POST /signup", () => {
  it("Should create a new user with status 201", async () => {
    const body = SignUpFactory();

    const result = await server.post("/signup").send(body);

    expect(result.status).toBe(201);
    expect(result.error).toBeFalsy();
  });

  it("should not create a user if email already exists with statusCode 409", async () => {
    const body = SignUpFactory();

    const createUser = await server.post("/signup").send(body);
    const duplicatedUser = await server.post("/signup").send(body);

    expect(createUser.status).toBe(201);
    expect(duplicatedUser.status).toBe(409);
    expect(duplicatedUser.error).toBeTruthy();
  });

  it("Should not create a user if password is not equal confirmPassword with status 422", async () => {
    const body1 = SignUpFactory();
    const body2 = { ...body1, confirmPassword: "#DifferentP4ssword" };

    const result = await server.post("/signup").send(body2);

    expect(result.status).toBe(422);
    expect(result.error).toBeTruthy();
  });
});

describe("POST /signin", () => {
  it("should return a token with status 202", async () => {
    const newUserBody = SignUpFactory();

    await server.post("/signup").send(newUserBody);
    const body = {
      email: newUserBody.email,
      password: newUserBody.password,
    };
    const result = await server.post("/signin").send(body);

    expect(result.status).toBe(202);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.error).toBeFalsy();
  });

  it("Should return a error if email is not registered with status 401", async () => {
    const user = signInFactory()

    const result = await supertest(app).post("/signin").send(user);

    expect(result.status).toBe(401)
    expect(result.error).toBeTruthy();
  })


  it("Should return a error if password passed is not equal to the password registered with status 401", async () => {
    const newUserBody = SignUpFactory();

    await server.post("/signup").send(newUserBody);
    const body = {
      email: newUserBody.email,
      password: '1' + newUserBody.password,
    };
    const result = await server.post("/signin").send(body);
    
    expect(result.status).toBe(401)
    expect(result.error).toBeTruthy();
  })
});
