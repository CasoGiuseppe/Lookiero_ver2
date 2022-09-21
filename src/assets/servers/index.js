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
      return schema.db.users.where({ id: request.params.id })[0];
    });

    // get user by owner type
    this.get(`${API_ENDPOINT}/owner/:owner`, (schema, request) => {
      return schema.db.users.findBy({data: {owner: request.params.owner}});
    });
  },
});

export { mockServer };
