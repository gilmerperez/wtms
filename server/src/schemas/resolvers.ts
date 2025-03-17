import User from "../models/User.js"
import Warehouse from "../models/Warehouse.js"
import Truck from "../models/Truck.js"
import { signToken, AuthenicationError } from '../utils/auth.js'

// Define types for the arguments
interface AddUserArgs {
    username: string,
    email: string,
    password: string,
    role: [string],
    status: boolean,
    isCorrectPassword: boolean
}
interface UpdateUserStatus{
  userId: number,
  status: boolean
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  userId: number
}
interface WarehouseArgs {
  warehouseId: number
}
interface TruckArgs {
  truckId: number
}

interface addWarehouse {
  name: string,
  location: string,
  status: boolean,
  items: [string],
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
    getUser: async (_parent: unknown, { userId }: UserArgs) => {
      return await User.findById(userId);
    },
    getWarehouses: async () => {
      return await Warehouse.find()
    },
    getWarehouse: async (_parent: unknown, { warehouseId }: WarehouseArgs) => {
      return await Warehouse.findOne({ _id: warehouseId });
    },
    getTrucks: async () => {
      return await Truck.find()
    },

    getTruck: async (_parent: unknown, { truckId }: TruckArgs) => {
      return await Truck.findOne({ _id: truckId });
    },
  },
  Mutation: {
    login: async (_parent: unknown, { email, password }: LoginUserArgs) => {
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
      return { token, user }
    },
    addUser: async (_parent: unknown, {username, email, password, role, status, isCorrectPassword}: AddUserArgs) => {
      const newUser = await User.create({ username, email, password, role, status, isCorrectPassword});
      // User.save()
      return newUser;
    },
    addWarehouse: async (_parent: unknown, { name, location, status, items, quantity }: addWarehouse) => {
      const newWarehouse = Warehouse.create({name, location, status, items, quantity});
      return newWarehouse;
    },
    addTruck: async (_parent: unknown, { truckId, truckName, truckCapacity, driverName, status, assignedWarehouse }: AddTruck) => {
      const newTruck = Truck.create({truckId, truckName, truckCapacity, driverName, status, assignedWarehouse});

      return newTruck;
    },
    updateUserStatus: async (_parent: unknown, { userId, status }: UpdateUserStatus) => {
      return await User.findByIdAndUpdate(
        { _id: userId },
        // {$addToSet: {status: Boolean}},
        { $addToSet: {status: status }},

        { new: true, runValidators: true }
      )

    },
    // deleteUser: async (_parent: unknown, {userId}) => {
    //     return await User.findByIdAndDelete(userId);
    // },
    //WE NEED TO DELETE SOMETHING TO FULFILL THE PROJECT'S CRITERIA
    deleteTruck: async (_parent: unknown, {truckId}: TruckArgs) => {
      return await Truck.findByIdAndDelete(truckId)
    },
    deleteWarehouse: async (_parent: unknown, {warehouseId}: WarehouseArgs) => {
      return await Warehouse.findByIdAndDelete(warehouseId)
    },
    // updateWarehouseStatus: async (_parent: unknown, { warehouseId, status }) => {
    //   return await Warehouse.findByIdAndUpdate(
    //     { _id: warehouseId },
    //     { $addToSet: {status: status} },
    //     { new: true, runValidators: true }
    //   );
    // },
    // updateTruckStatus: async (_parent: unknown, { truckId, status }) => {
    //   return await Truck.findByIdAndUpdate(\
    //     { _id: truckId },
    //     { $addToSet: {status: status} },
    //     { new: true, runValidators: true }
    //   );
    // },

    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: unknown, _args: unknown, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
  }
}
export default resolvers