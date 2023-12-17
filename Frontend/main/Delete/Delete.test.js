
const request = require("supertest")
const baseURL = "http://localhost:5000"

test("should return 204", async () => {

    let id = '657adae73e7ad4cbc1a42b35';
    const response = await request(baseURL).get(`/deleteTask/${id}`);
    expect(response.statusCode).toBe(204);
    expect(response.body.error).toBeUndefined();
});
