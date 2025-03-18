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
        items: [Item]
    }
    type Item {
        items: String
        quantity: Int
        arrivalDate: String
    }
    input ItemInput {
        items: String
        quantity: Int
        arrivalDate: String
    }
    type Truck {
        truckId: String!
        driver: String!
        status: Boolean!
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
    type Auth {
        token: ID! 
        user: User
    }
    type Mutation {
       login(email: String!, password: String!): Auth
        addUser(username: String, email: String, password: String, role: String, status: Boolean, isCorrectPassword: Boolean): Auth
        addWarehouse(name: String!, location: String!, items: [ItemInput], quantity: Int): Warehouse
        addTruck(driver: String!, status:Boolean!): Truck
        deleteTruck(truckId: String!): Truck
        deleteWarehouse(warehouseId: String!): Warehouse
        updateUserStatus(userId:String!, status: Boolean!): Auth
        updateWarehouseCapacity(warehouseId: String!): Warehouse
        # updateTruckStatus(truckId: ID!, status: Boolean)
        addItem(warehouseId: String!, index: Int): Warehouse
        updateItem(warehouseId: String!, index: Int, newItem: String): Warehouse
        deleteItem(warehouseId: String!, item: String): Warehouse

        

    }
    `;

    export default typeDefs;