import User from "../models/User.js"
import Warehouse from "../models/Warehouse.js"
import Truck from "../models/Truck.js"
import { signToken, AuthenticationError } from '../utils/auth.js'

// Define types for the arguments

interface User{
  userId: string,
  username: string,
  email: string,
  password: string,
  role: string,
  status: boolean
}

interface Warehouse{
  warehouseId: string,
  name: string,
  location: string,
  status: boolean,
  items: string[],
  quantity: number
}

interface Truck{
  truckId: string,
  truckName: string,
  truckCapacity: number,
  driverName: string,
  status: 'Available' | 'In Transit',
  assignedWarehouse: Warehouse["warehouseId"]
}

interface AddUserArgs {
  username: string,
  email: string,
  password: string,
  role: string,
  status: boolean
}
interface UpdateUserStatus {
  userId: string,
  status: boolean
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  userId: string
}
interface WarehouseArgs {
  warehouseId: string
}
interface TruckArgs {
  truckId: string
}

interface addWarehouse {
  name: string,
  location: string,
  status: boolean,
  items: string[],
  quantity: number
}
interface AddTruck {
  truckId: string,
  truckName: string,
  truckCapacity: number,
  driverName: string,
  status: boolean,
  assignedWarehouse: number
}



const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find()
    },
    getUser: async (_parent: any, { userId }: UserArgs) => {
      return await User.findById(userId);
    },
    getWarehouses: async () => {
      return await Warehouse.find()
    },
    getWarehouse: async (_parent: any, { warehouseId }: WarehouseArgs) => {
      return await Warehouse.findOne({ _id: warehouseId });
    },
    getTrucks: async () => {
      return await Truck.find()
    },
    getTruck: async (_parent: any, { truckId }: TruckArgs) => {
      return await Truck.findOne({ _id: truckId });
    },
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
  Mutation: {
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
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
      const token = signToken(user.email, user.password, user.role, user.status)
      return { token, user }
    },
    addUser: async (_parent: any, { username, email, password, role, status}: AddUserArgs) => {
      const newUser = await User.create({ username, email, password, role, status});
      // User.save()
      return newUser;
    },
    addWarehouse: async (_parent: any, { name, location, status, items, quantity }: addWarehouse) => {
      const newWarehouse = Warehouse.create({ name, location, status, items, quantity });
      return newWarehouse;
    },
    addTruck: async (_parent: any, { truckId, truckName, truckCapacity, driverName, status, assignedWarehouse }: AddTruck) => {
      const newTruck = Truck.create({ truckId, truckName, truckCapacity, driverName, status, assignedWarehouse });

      return newTruck;
    },
    addItem: async (_parent: any, { warehouseId, item }: { warehouseId: string, item: string }) => {
      return await Warehouse.findByIdAndUpdate(
        warehouseId,
        { $push: { items: item } },
        { new: true, runValidators: true }
      );
    },
    updateItem: async (_parent: any, { warehouseId, index, newItem }: { warehouseId: string , index: number, newItem: string }) => {
      return await Warehouse.findOneAndUpdate(
        { _id: warehouseId },
        //CHECK TO SEE IF THIS IS CORRECT SYNTAX
        { $set: { [`items.${index}`]: newItem } },
        { new: true, runValidators: true }
      )
    },
    deleteItem: async (_parent: any, { warehouseId, item }: { warehouseId: string, item: string }) => {
      return await Warehouse.findByIdAndUpdate(
        warehouseId,
        { $pull: { items: item } },
        { new: true, runValidators: true }
      )
    },
    updateUserStatus: async (_parent: any, { userId, status }: UpdateUserStatus) => {
      return await User.findByIdAndUpdate(
        { _id: userId },
        // {$addToSet: {status: Boolean}},
        { $addToSet: { status: status } },

        { new: true, runValidators: true }
      )

    },
    // deleteUser: async (_parent: any, {userId}) => {
    //     return await User.findByIdAndDelete(userId);
    // },
    //WE NEED TO DELETE SOMETHING TO FULFILL THE PROJECT'S CRITERIA
    deleteTruck: async (_parent: any, { truckId }: TruckArgs) => {
      return await Truck.findByIdAndDelete(truckId)
    },
    deleteWarehouse: async (_parent: any, { warehouseId }: WarehouseArgs) => {
      return await Warehouse.findByIdAndDelete(warehouseId)
    },
    updateWarehouseCapacity: async (_parent: any, { warehouseId, capacity }: { warehouseId: string, capacity: number }) => {
      return await Warehouse.findByIdAndUpdate(
        { _id: warehouseId },
        //     { $addToSet: {status: status} },
        { $set: { capacity: capacity } },
        { new: true, runValidators: true }
      );
    },
    // updateTruckStatus: async (_parent: any, { truckId, status }) => {
    //   return await Truck.findByIdAndUpdate(\
    //     { _id: truckId },
    //     { $addToSet: {status: status} },
    //     { new: true, runValidators: true }
    //   );
    // },

    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated

  }
}
export default resolvers