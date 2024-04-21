import app from "../../../server";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";

chai.use(chaiHttp);
const router = () => chai.request(app);


// loging which will retun the token

let token: any  = '';
let userId: any = '';




describe("todo user test cases", () => {

  // Test for login
  it("Should be able to log in an existing user", (done) => {
    router()
      .post("/api/todousers/login")
      .send({
        email: "saddock@gmail.com",
        password: "Saddock_2000"
      })
      .end((error, response: any) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("data");
        token = response._body.data.token;
        done(error);
      });
  });

  // Test for view users
  it("Should be able to get Users", (done) => {
    router()
      .get("/api/todousers/viewusers")
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("data");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  //Test for signup
  it("Should be able to sign up a new user", (done) => {
    router()
      .post("/api/todousers/signup")
      .send({
        username: "Dodo",
        email: "dodo@gmail.com",
        password: "dodo_2000"
      })
      .end((error, response: any) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.have.property("username", "Dodo");
        expect(response.body.data).to.have.property("email", "dodo@gmail.com");
        userId = response._body.data._id
        console.log(userId)
        done(error);
      });
  });

  // Test for single user
  it("Should be able to get a single user by ID", (done) => {
    // Replace 'userId' with an actual user ID from your database
    router()
      .get(`/api/todousers/singleUser/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.have.property("_id", userId);
        console.log(error)
        done(error);
      });
  });

  // Test for editing user
  it("Should be able to edit a user", (done) => {
    // Replace 'userId' with an actual user ID from your database
    router()
      .put(`/api/todousers/editUser/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ username: "Dodo" })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body.data).to.have.property("username", "Dodo");
        done(error);
      });
  });

  // Test for deleting a user
  it("Should be able to delete a user by ID", (done) => {
    // Replace 'userId' with an actual user ID from your database
    router()
      .delete(`/api/todousers/deleteUser/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });


});
