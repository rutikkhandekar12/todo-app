const request = require("supertest")
const baseURL = "http://localhost:5000"

test("should return 200", async () => {
    const response = await request(baseURL).get("/tasks");
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeUndefined();
});