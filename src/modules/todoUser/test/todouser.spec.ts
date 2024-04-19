import app from "../../../server";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("todo user test cases", () => {

  // Test for view users
  it("Should be able to get Users", (done) => {
    router()
      .get("/api/todousers/viewusers")
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("data");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  // Test for signup
  it("Should be able to sign up a new user", (done) => {
    router()
      .post("/api/todousers/signup")
      .send({
        username: "Bado",
        email: "bado@gmail.com",
        password: "Bado_2000"
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.have.property("username", "Bado");
        expect(response.body.data).to.have.property("email", "bado@gmail.com");
        done(error);
      });
  });

  // Test for login
  it("Should be able to log in an existing user", (done) => {
    router()
      .post("/api/todousers/login")
      .send({
        email: "saddock@gmail.com",
        password: "Saddock_2000"
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  // Test for single user
  it("Should be able to get a single user by ID", (done) => {
    // Replace 'userId' with an actual user ID from your database
    const userId = "66223c17b5b4ba0e385b44ee";
    router()
      .get(`/api/todousers/singleUser/${userId}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.have.property("_id", userId);
        done(error);
      });
  });

  // Test for editing user
  it("Should be able to edit a user", (done) => {
    // Replace 'userId' with an actual user ID from your database
    const userId = "66216740052667e6993c8045";
    router()
      .put(`/api/todousers/editUser/${userId}`)
      .send({ username: "Aime" })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body.data).to.have.property("username", "Aime");
        done(error);
      });
  });

  // Test for deleting a user
  it("Should be able to delete a user by ID", (done) => {
    // Replace 'userId' with an actual user ID from your database
    const userId = "66223967a924908c215db02c";
    router()
      .delete(`/api/todousers/deleteUser/${userId}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });


});
