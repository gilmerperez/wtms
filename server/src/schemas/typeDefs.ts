import gql from 'graphql-tag';

const typeDefs = gql`
    type User {
        userId: String!
        name: String!
        email: String!
        password: String!
        role: String!
        status: Boolean!
    }
    type Warehouse {
        warehouseId: String!
        name: String!
        location: String!
        items: [Item]!
    }
    type Truck {
        truckId: String!
        driver: String!
        status: Boolean!
    }
    type Auth {
        token: ID!
        user: User!
    }
    type Item {
        itemName: String!
        quantity: Int!
        arrivalDate: String!
    }
    input ItemInput {
        itemName: String!
        quantity: Int!
        arrivalDate: String!
    }


    type Query {
        getUsers: [User]!
        getUser(userId: ID): User
        getWarehouses: [Warehouse]!
        getWarehouse(warehouseId: ID): Warehouse
        getTrucks: [Truck]
        getTruck(truckId: ID): Truck
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String, email: String, password: String, role: String, status: Boolean, isCorrectPassword: Boolean): User
        addWarehouse (name: String!, location: String!, items: [ItemInput], quantity: Int): Warehouse
        addTruck(driver: String!, status:Boolean!): Truck
        deleteTruck(truckId: String!): Truck
        deleteWarehouse(warehouseId: String!): Warehouse
        updateUserStatus(userId:String!, status: Boolean!): User
        updateWarehouseCapacity(warehouseId: String!): Warehouse
        # updateTruckStatus(truckId: ID!, status: Boolean)
        addItem(warehouseId: String!, index: Int): String
        updateItem(warehouseId: String!, index: Int, newItem: String): String
        deleteItem(warehouseId: String!, item: String): String

        

    }
    `;

    export default typeDefs;