import { User } from "../models/userModel"
import { Warehouse } from "../models/warehouseModel"
import { Truck } from "../models/truckModel"
import {signToken, AuthenicationError} from './WTMS/server/src/utils/auth'



const resolvers = {
    Query: {
        getUsers: async () => {
            return await User.find()
        },
        getUser: async (_parent: unknown, { userId }) => {
            return await User.findone({ _id: userId });
        },
        getWarehouses: async () => {
            return await Warehouse.find()
        },
        getWarehouse: async (_parent: unknown, { warehouseId }) => {
            return await Warehouse.findOne({ _id: warehouseId });
        },
        getTrucks: async () => {
            return await Truck.find()
        },
           
        getTruck: async (_parent: unknown, { truckId }) => {
        return await Truck.findOne({ _id: truckId });
        },
    },
    Mutation: {
        login: async (_parent: unknown, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                //NEED THIS FROM GILMER, IN THE AUTH.TS JWT FILE
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password)
            if (!correctPw) {
                //REFER TO LINE 31
                throw new AuthenticationError('Invalid Password')
            }
            //REFER TO LINE 31
            const token = signToken(user.email, user.password)
            return { token, user}
        },
        addUser: async (_parent: unknown, { name, email, password, role, status }) => {
            const newUser = await new User.create({
                name, email, password, role, status
            });
            return newUser;
        },
        addWarehouse: async (_parent: unknown, { name, location, status, items, quantity }) => {
            const newWarehouse = await new Warehouse({
                name, location, status, items, quantity
            });
            return newWarehouse;
        },
        addTruck: async (_parent: unknown, { driver, status }) => {
            const newTruck = await new Truck({
                driver, status
            });

            return newTruck;
        },
        updateUserStatus: async (_parent: unknown, { userId, status }) => {
            return await User.findByIdAndUpdate(
                {_id: userId},
                // {$addToSet: {status: Boolean}},
                {$addToSet: status},

                {new: true, runValidators: true}
            )

        },
        // deleteUser: async (_parent: unknown, {userId}) => {
        //     return await User.findByIdAndDelete(userId);
        // },
        //WE NEED TO DELETE SOMETHING TO FULFILL THE PROJECT'S CRITERIA
        updateWarehouseStatus: async (_parent: unknown, { warehouseId, status }) => {
            return await Warehouse.findByIdAndUpdate(
                {_id: warehouseId},
                {$addToSet: status},
                {new: true, runValidators: true}
            );
        },
        updateTruckStatus: async (_parent: unknown, { truckId, status }) => {
            return await Truck.findByIdAndUpdate(
                {_id: truckId},
                {$addToSet: status},
                {new: true, runValidators: true}
            );
        },

    },
};
export default resolvers