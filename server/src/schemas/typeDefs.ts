import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
    status: String!
  }

  input UserInput {
  username: String
  email: String
  password: String
  role: String
  status: String
}

  type Warehouse {
    _id: ID
    name: String
    location: String
    capacity: Int
    items: [Item]
  }

  type Truck {
    _id: ID
    truckId: String
    truckName: String
    truckCapacity: Int
    driverName: String
    status: String  
    assignedWarehouse: Warehouse
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Item {
    itemName: String
    quantity: Int
    arrivalDate: String
  }

  input ItemInput {
    itemName: String!
    quantity: Int!
    arrivalDate: String!
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
    addUser(username: String!, email: String!, password: String!, role: String!, status: String!): Auth
    deleteUser(userId: ID!): User
    addWarehouse(name: String!, location: String!, capacity: Int!, items: [ItemInput]): Warehouse
    addTruck(truckId: String!, truckName: String!, truckCapacity: Int!, driverName: String!, status: String!, assignedWarehouse: ID): Truck
    deleteTruck(truckId: String!): Truck
    deleteWarehouse(warehouseId: ID!): Warehouse
    updateUser(id: ID!, input: UserInput!): User
    updateUserStatus(userId: ID!, status: String!): User
    updateWarehouseCapacity(warehouseId: ID!, capacity: Int!): Warehouse
    addItem(warehouseId: ID!, item: ItemInput!): Warehouse
    updateItem(warehouseId: ID!, index: Int!, newItem: ItemInput!): Warehouse
    deleteItem(warehouseId: ID!, itemName: String!): Warehouse
  }
`;

export default typeDefs;
