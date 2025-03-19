import User from "../models/User.js";
import Truck from "../models/Truck.js";
import Warehouse from "../models/Warehouse.js";
import { signToken, AuthenticationError } from '../utils/auth.js';


// Define types for arguments
interface LoginArgs {
  email: string;
  password: string;
}
// Define types for the arguments

interface User{
  username: string,
  email: string,
  password: string,
  role: string,
  status: string
}

interface Warehouse{
  warehouseId: string,
  name: string,
  location: string,
  capacity: number,
  items: [Item]
}

interface Truck{
  truckId: string,
  truckName: string,
  truckCapacity: number,
  driverName: string,
  status: string,
  assignedWarehouse: Warehouse["warehouseId"]

}

interface Item{
  itemName: string,
  quantity: number,
  arrivalDate: string
}

interface AddUserArgs {
  username: string;
  email: string;
  password: string;
  role: string;
  status: string;
}


interface UpdateUserStatusArgs {
  userId: string;
  status: string;
}

interface AddUserArgs {
  username: string
}

interface AddTruckArgs {
  truckId: string;
  truckName: string;
  truckCapacity: number;
  driverName: string;
  status: string;
  assignedWarehouse: string;
}

interface AddWarehouseArgs {
  name: string;
  location: string;
  capacity: number;
  items: any[];
}


interface AddItemArgs {
  warehouseId: string;
  item: any;
}

interface UpdateItemArgs {
  warehouseId: string;
  index: number;
  newItem: any;
}

// interface addWarehouse {
//   name: string,
//   location: string,
//   capacity: number,
//   items: [Item]
// }

// interface addTruck {
//   truckId: string,
//   truckName: string,
//   truckCapacity: number,
//   driverName: string,
//   status: string,
//   assignedWarehouse: number
// }

interface DeleteItemArgs {
  warehouseId: string;
  itemName: string;
}

interface Context {
  user?: {
    _id: string;
    role: string;
  };
}

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: Context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Not authenticated');
    },

    getUser: async (_parent: any, { userId }: { userId: string }) => {
      return await User.findById(userId);
    },
    getUsers: async () => {
      return await User.find();
    },
    getTruck: async (_parent: any, { truckId }: { truckId: string }) => {
      return await Truck.findById(truckId);
    },
    getTrucks: async () => {
      return await Truck.find().populate("assignedWarehouse").populate({
        path: "assignedWarehouse",
        populate: "items"
      });
    },
    getWarehouse: async (_parent: any, { warehouseId }: { warehouseId: string }) => {
      return await Warehouse.findById(warehouseId);
    },
    getWarehouses: async () => {
      return await Warehouse.find();
    },
  },
  Mutation: {
    login: async (_parent: any, { email, password }: LoginArgs) => {
      const user = await User.findOne({ email }) as { _id: string; role: string; isCorrectPassword: (password: string) => Promise<boolean> };
      if (!user) {
        throw new AuthenticationError('Invalid email or password');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Invalid email or password');
      }
      const token = signToken(user._id, user.role);
      return { token, user };
    },
    addUser: async (_parent: any, { username, email, password, role, status }: AddUserArgs) => {
      const user = await User.create({ username, email, password, role, status });
      return user;
    },
    updateUser: async (_parent: any, { id, input }: { id: string; input: { role?: string; status?: string } }) => {
      return await User.findByIdAndUpdate(
        id,
        { $set: input }, // Update only the fields provided in the input
        { new: true }
      );
    },
    updateUserStatus: async (_parent: any, { userId, status }: UpdateUserStatusArgs) => {
      return await User.findByIdAndUpdate(
        userId,
        { status },
        { new: true }
      );
    },
    addTruck: async (_parent: any, { truckId, truckName, truckCapacity, driverName, status, assignedWarehouse }: AddTruckArgs) => {
      const truck = await Truck.create({ truckId, truckName, truckCapacity, driverName, status, assignedWarehouse });
      return truck;
    },
    deleteTruck: async (_parent: any, { truckId }: { truckId: string }) => {
      return await Truck.findOneAndDelete({truckId});
    },
    addWarehouse: async (_parent: any, { name, location, capacity, items }: AddWarehouseArgs) => {
      const warehouse = await Warehouse.create({ name, location, capacity, items });
      return warehouse;
    },
    updateWarehouseCapacity: async (_parent: any, { warehouseId, capacity }: { warehouseId: string; capacity: number }) => {
      return await Warehouse.findByIdAndUpdate(
        warehouseId,
        { capacity },
        { new: true }
      );
    },
    deleteWarehouse: async (_parent: any, { warehouseId }: { warehouseId: string }) => {
      return await Warehouse.findByIdAndDelete(warehouseId);
    },
    addItem: async (_parent: any, { warehouseId, item }: AddItemArgs) => {
      return await Warehouse.findByIdAndUpdate(
        warehouseId,

        { $push: { items: item } },
        { new: true }
      );
    },
      
    updateItem: async (_parent: any, { warehouseId, index, newItem }: UpdateItemArgs) => {
      const warehouse = await Warehouse.findById(warehouseId);
      if (!warehouse) throw new Error('Warehouse not found');
      warehouse.items[index] = newItem;
      await warehouse.save();
      return warehouse;
    },
    deleteItem: async (_parent: any, { warehouseId, itemName }: DeleteItemArgs) => {
      return await Warehouse.findByIdAndUpdate(
        warehouseId,
        { $pull: { items: { itemName } } },
        { new: true }
      );
    },
  },
};


export default resolvers;