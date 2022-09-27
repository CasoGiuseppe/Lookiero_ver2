import { Server } from "miragejs";
import USERS from "../__mocks__/user.mock";
import {
  API_NAMESPACE,
  API_ENDPOINT,
  // API_DELAY_MAX,
  // API_DELAY_MIN,
} from "../partials/constants";

const mockServer = new Server({
  seeds(server) {
    server.db.loadData({
      users: USERS,
    });
  },

  routes() {
    this.namespace = API_NAMESPACE;

    // get users info
    this.get(`${API_ENDPOINT}`, (schema) => schema.db.users);

    // get user by id
    this.get(`${API_ENDPOINT}/id/:id/`, (schema, request) => {
      return schema.db.users.findBy({ id: request.params.id });
    });

    // get user by owner type
    this.get(`${API_ENDPOINT}/:type/:value`, (schema, request) => {
      return schema.db.users.where({ [request.params.type]: request.params.value });
    });

    // update user following state
    this.patch(`${API_ENDPOINT}/id/:id`, (schema, request) => {
      const user = schema.db.users.where({ id: request.params.id })[0];
      user.data.following = request.requestBody;
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
