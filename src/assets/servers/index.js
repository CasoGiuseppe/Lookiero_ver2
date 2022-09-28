import { createServer } from "miragejs";
import USERS from "../__mocks__/user.mock";
import { API_NAMESPACE, API_ENDPOINT, API_DELAY_MAX, API_DELAY_MIN } from "@/app/partials/constants";

const randomValue = ({ max = 1, min = 0 }) => Math.floor(Math.random() * max) + min;

const mockServer = createServer({
  seeds(server) {
    server.db.loadData({
      users: USERS,
    });
  },

  routes() {
    this.namespace = API_NAMESPACE;
    //this.timing = randomValue({ max: API_DELAY_MAX, min: API_DELAY_MIN });

    // get users info
    this.get(`${API_ENDPOINT}`, (schema) => schema.db.users, {
      timing: randomValue({ max: API_DELAY_MAX, min: API_DELAY_MIN }),
    });

    // get user by owner type
    this.get(
      `${API_ENDPOINT}/:type/:value`,
      (schema, request) => {
        return schema.db.users.where({ [request.params.type]: request.params.value });
      },
      { timing: randomValue({ max: API_DELAY_MAX, min: API_DELAY_MIN }) }
    );

    // update user following state
    this.patch(`${API_ENDPOINT}/id/:id`, (schema, request) => {
      const user = schema.db.users.where({ id: request.params.id })[0];
      user.following = request.requestBody.value;
      schema.db.users.update(request.params.id, user);
      return schema.db.users;
    });

    // add new message
    this.post(`${API_ENDPOINT}/id/:id/`, (schema, request) => {
      console.log(JSON.parse(request.requestBody));
      const owner = schema.db.users.find(request.params.id);
      owner.messages = [...owner.messages, JSON.parse(request.requestBody)];
      schema.db.users.update(request.params.id, owner);
    });
  },
});

export { mockServer };
