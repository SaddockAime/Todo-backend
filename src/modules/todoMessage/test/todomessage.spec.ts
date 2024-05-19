import app from "../../../server";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";

chai.use(chaiHttp);
const router = () => chai.request(app);

let messageId = '';
let token: any  = '';

describe("Todo backend message test cases", () => {
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

  // Test for creating message
  it("Should be able to create message", (done) => {
    router()
      .post("/api/todomessage/createMessage")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Aime getz",
        email: "aime@gmail.com",
        message: "hello there"
      })
      .end((error, response: any) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("data");
        messageId = response._body.data._id;
        done(error);
      });
  });

  // Test for view messages
  it("Should be able to get all messages", (done) => {
    router()
      .get("/api/todomessage/viewMessages")
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("data");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  // Test for editing message
  it("Should be able to edit a message", (done) => {
    router()
      .put(`/api/todomessage/updateMessage/${messageId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ 
        name: "Saddock",
        email: "saddock@gmail.com",
        message: "hey there"
       })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  // Test for deleting a message
  it("Should be able to delete a message by ID", (done) => {
    router()
      .delete(`/api/todomessage/deleteMessage/${messageId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Should be able to give an error", (done) => {
    router()
      .delete(`/api/todomessage/deleteMessage/${messageId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an("object");
        done(error);
      });
  });

  it("Should be able to give an error", (done) => {
    router()
      .put(`/api/todomessage/updateMessage/${messageId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an("object");
        done(error);
      });
  });
});
