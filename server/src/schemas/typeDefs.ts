import gql from 'graphql-tag';

const typeDefs = gql`
    type User {
        userId: ID!
        name: String!
        email: String!
        password: String!
        role: String!
        status: Boolean!
    }
    type Warehouse {
        warehouseId: ID!
        name: String!
        location: String!
        status: Boolean!
        items: [Item]
        quantity: Int
        # arrivalDate: Date
    }
    type Truck {
        truckId: ID!
        driver: String!
        status: Boolean!
    }

    type Mutation {
        login (email: String!, password: String!)
        addUser (name: String!, email: String!, password: String!, role: Role!, status: Status!): User
        addWarehouse (name: String!, location: String!, status: Status!, items: [Item], quantity: Int): Warehouse
        addTruck(driver: String!, status:Boolean!)
        updateUserStatus(userId:ID!, status: Boolean!)
        updateWarehouseStatus(warehouseId: ID!, status:Boolean!)
        updateTruckStatus(truckId:ID!, status: Boolean)
        

    }
    `;

    export default typeDefs;