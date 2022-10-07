import supertest from "supertest";
import app from "../../src/app";
import { IPetBody, PetType } from "../../src/types/petTypes";
import { petBodyFactory } from "../factories/petFactory";
import {
  deleteAllData,
  disconnectPrisma,
  userCreatedWithTokenScenario,
} from "../factories/scenarioFactories";

beforeEach(async () => {
  await deleteAllData();
});

afterAll(async () => {
  await disconnectPrisma();
});

const server = supertest(app);

describe("POST /pet", () => {
  it("Should create a new pet with status 201", async () => {
    const token: string = await userCreatedWithTokenScenario();
    const body: IPetBody = petBodyFactory("dog");

    const result = await server
      .post("/pet")
      .send(body)
      .set({ Authorization: `Bearer ${token}` });

    expect(result.status).toBe(201);
    expect(result.error).toBeFalsy();
    expect(result.text).toEqual("Pet Criado!");
  });

  it("Should retun a conflict error to duplicate pet name regarding same user/type with status 409", async () => {
    const token: string = await userCreatedWithTokenScenario();
    const body: IPetBody = petBodyFactory("dog");

    const petCreated = await server
      .post("/pet")
      .send(body)
      .set({ Authorization: `Bearer ${token}` });

    const result = await server
      .post("/pet")
      .send(body)
      .set({ Authorization: `Bearer ${token}` });

    expect(petCreated.status).toBe(201);
    expect(result.status).toBe(409);
    expect(result.text).toEqual("Pet já está cadastrado!");
  });

  it("Should create a new pet when name is duplicate regarding type but to another user with status 201", async () => {
    const tokenFirstUser: string = await userCreatedWithTokenScenario();
    const body: IPetBody = petBodyFactory("dog");

    const petFirstUser = await server
      .post("/pet")
      .send(body)
      .set({ Authorization: `Bearer ${tokenFirstUser}` });

    const tokenSecondUser: string = await userCreatedWithTokenScenario();

    const petSecondUser = await server
      .post("/pet")
      .send(body)
      .set({ Authorization: `Bearer ${tokenSecondUser}` });

    expect(petFirstUser.status).toBe(201);
    expect(petSecondUser.status).toBe(201);
    expect(petSecondUser.text).toBe("Pet Criado!");
    expect(petSecondUser.error).toBeFalsy();
  });

  it("Should create a new pet when name is duplicate regarding userId but to another type with status 201", async () => {
    const token: string = await userCreatedWithTokenScenario();
    const firstType: PetType = "dog";
    const anotherType: PetType = "cat";
    const firstPetBody: IPetBody = petBodyFactory(firstType);
    const secondPetBody: IPetBody = {
      ...firstPetBody,
      type: anotherType,
    };

    const firstPet = await server
      .post("/pet")
      .send(firstPetBody)
      .set({ Authorization: `Bearer ${token}` });

    const secondPet = await server
      .post("/pet")
      .send(secondPetBody)
      .set({ Authorization: `Bearer ${token}` });

    expect(firstPet.status).toBe(201);
    expect(secondPet.status).toBe(201);
    expect(secondPet.text).toBe("Pet Criado!");
    expect(secondPet.error).toBeFalsy();
  });
});
