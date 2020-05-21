const request = require('supertest');
const expect = require('chai').expect;
const assert = require('assert');
const index = require('./index.js')

describe("POST /user", () => {
    it("should always pass", async function() {
        const res = await request(`http://localhost:4000`).post('/users').send({
            "id": "05",
            "name": "rahul" + Math.floor(Math.random() * Math.floor(100)),
            "email": "vasu90@gmail.com",
            "password": "1234",
            "address": "bangalore"
        });
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an("object");
    });
});