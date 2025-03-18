import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
    status: Boolean!
  }

  type Item {
    itemName: String!
    quantity: Int!
    arrivalDate: String!
  }

  type Warehouse {
    _id: ID!
    name: String!
    location: String!
    status: String!
    items: [Item]
    capacity: Int!
  }

  type Truck {
    _id: ID!
    truckName: String!
    truckCapacity: Int!
    driverName: String!
    status: String!
    assignedWarehouse: Warehouse
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUsers: [User]!
    getUser(userId: ID!): User
    getWarehouses: [Warehouse]!
    getWarehouse(warehouseId: ID!): Warehouse
    getTrucks: [Truck]!
    getTruck(truckId: ID!): Truck
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, role: String!): Auth
    addWarehouse(name: String!, location: String!, status: String!, capacity: Int!): Warehouse
    addTruck(truckName: String!, truckCapacity: Int!, driverName: String!, status: String!): Truck
    deleteTruck(truckId: ID!): Truck
    deleteWarehouse(warehouseId: ID!): Warehouse
    updateUserStatus(userId: ID!, status: String!): User
    updateWarehouseCapacity(warehouseId: ID!, capacity: Int!): Warehouse
    addItem(warehouseId: ID!, itemName: String!, quantity: Int!, arrivalDate: String!): Warehouse
    updateItem(warehouseId: ID!, index: Int!, newItem: String!): Warehouse
    deleteItem(warehouseId: ID!, itemName: String!): Warehouse
  }
`;

export default typeDefs;
