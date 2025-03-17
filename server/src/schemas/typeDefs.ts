import gql from 'graphql-tag';

const typeDefs = gql`
    type User {
        userId: ObjectId!
        name: String!
        email: String!
        password: String!
        role: String!
        status: Boolean!
    }
    type Warehouse {
        warehouseId: ObjectId!
        name: String!
        location: String!
        status: Boolean!
        items: [Item]
        quantity: Int
        # arrivalDate: Date
    }
    type Truck {
        truckId: ObjectId!
        driver: String!
        status: Boolean!
    }

    type Mutation {
        login (email: String!, password: String!)
        addUser (name: String!, email: String!, password: String!, role: Role!, status: Status!): User
        addWarehouse (name: String!, location: String!, status: Status!, items: [Item], quantity: Int): Warehouse
        addTruck(driver: String!, status:Boolean!)
        deleteTruck(truckId: ObjectId)
        deleteWarehouse(warehouseId: ObjectId)
        updateUserStatus(userId:ObjectId!, status: Boolean!)
        # updateWarehouseStatus(warehouseId: ID!, status:Boolean!)
        # updateTruckStatus(truckId:ID!, status: Boolean)
        addItem(warehouseId: ObjectId, index: Int)
        updateItem(warehouseId: ObjectId, index: Int, newItem: String)
        deleteItem(warehouseId: ObjectId, item: string)

        

    }
    `;

    export default typeDefs;