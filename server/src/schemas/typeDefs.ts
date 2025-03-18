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
        status: Boolean!
        items: [Item]
        quantity: Int
        # arrivalDate: Date
    }
    type Truck {
        truckId: String!
        driver: String!
        status: Boolean!
    }
    type Query{
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
        login (email: String!, password: String!)
        addUser(username: String, email: String, password: String, role: String, status: Boolean, isCorrectPassword: Boolean): User
        addWarehouse (name: String!, location: String!, status: Status!, items: [Item], quantity: Int): Warehouse
        addTruck(driver: String!, status:Boolean!)
        deleteTruck(truckId: String!)
        deleteWarehouse(warehouseId: String!)
        updateUserStatus(userId:String!, status: Boolean!)
        updateWarehouseCapacity(warehouseId: String!)
        # updateTruckStatus(truckId: ID!, status: Boolean)
        addItem(warehouseId: String!, index: Int)
        updateItem(warehouseId: String!, index: Int, newItem: String)
        deleteItem(warehouseId: String!, item: string)

        

    }
    `;

    export default typeDefs;