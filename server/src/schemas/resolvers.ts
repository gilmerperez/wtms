import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

// Define types for the arguments
interface AddUserArgs {
  username: string,
  email: string,
  password: string,
  role: string,
  status: boolean,
  isCorrectPassword: boolean
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
    users: async () => {
      return User.find();
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username });
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
    me: async (_parent: unknown, _args: unknown, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
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
      const token = signToken(user.email, user.password, user.role, user.status)
      return { token, user }
    },
    addUser: async (_parent: unknown, { username, email, password, role, status, isCorrectPassword }: AddUserArgs) => {
      const newUser = await User.create({ username, email, password, role, status, isCorrectPassword });
      // User.save()
      return newUser;
    },
    addWarehouse: async (_parent: unknown, { name, location, status, items, quantity }: addWarehouse) => {
      const newWarehouse = Warehouse.create({ name, location, status, items, quantity });
      return newWarehouse;
    },
    addTruck: async (_parent: unknown, { truckId, truckName, truckCapacity, driverName, status, assignedWarehouse }: AddTruck) => {
      const newTruck = Truck.create({ truckId, truckName, truckCapacity, driverName, status, assignedWarehouse });

      return newTruck;
    },
    addItem: async (_parent: unknown, { warehouseId, item }: { warehouseId: string, item: string }) => {
      return await Warehouse.findByIdAndUpdate(
        warehouseId,
        { $push: { items: item } },
        { new: true, runValidators: true }
      );
    },
    updateItem: async (_parent: unknown, { warehouseId, index, newItem }: { warehouseId: string , index: number, newItem: string }) => {
      return await Warehouse.findOneAndUpdate(
        { _id: warehouseId },
        //CHECK TO SEE IF THIS IS CORRECT SYNTAX
        { $set: { [`items.${index}`]: newItem } },
        { new: true, runValidators: true }
      )
    },
    deleteItem: async (_parent: unknown, { warehouseId, item }: { warehouseId: string, item: string }) => {
      return await Warehouse.findByIdAndUpdate(
        warehouseId,
        { $pull: { items: item } },
        { new: true, runValidators: true }
      )
    },
    updateUserStatus: async (_parent: unknown, { userId, status }: UpdateUserStatus) => {
      return await User.findByIdAndUpdate(
        { _id: userId },
        // {$addToSet: {status: Boolean}},
        { $addToSet: { status: status } },

        { new: true, runValidators: true }
      )

    },
    // deleteUser: async (_parent: unknown, {userId}) => {
    //     return await User.findByIdAndDelete(userId);
    // },
    //WE NEED TO DELETE SOMETHING TO FULFILL THE PROJECT'S CRITERIA
    deleteTruck: async (_parent: unknown, { truckId }: TruckArgs) => {
      return await Truck.findByIdAndDelete(truckId)
    },
    deleteWarehouse: async (_parent: unknown, { warehouseId }: WarehouseArgs) => {
      return await Warehouse.findByIdAndDelete(warehouseId)
    },
    updateWarehouseCapacity: async (_parent: unknown, { warehouseId, capacity }: { warehouseId: string, capacity: number }) => {
      return await Warehouse.findByIdAndUpdate(
        { _id: warehouseId },
        //     { $addToSet: {status: status} },
        { $set: { capacity: capacity } },
        { new: true, runValidators: true }
      );
    },
    // updateTruckStatus: async (_parent: unknown, { truckId, status }) => {
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
