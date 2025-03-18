import User from "../models/User.js";
import Truck from "../models/Truck.js";
import Warehouse from "../models/Warehouse.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

const resolvers = {
  Query: {
    getUser: async (_parent: unknown, { userId }: { userId: string }) => {
      return await User.findById(userId);
    },
    getUsers: async () => {
      return await User.find();
    },
    me: async (_parent: unknown, _args: unknown, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Could not authenticate user.");
    },
    getTruck: async (_parent: unknown, { truckId }: { truckId: string }) => {
      return await Truck.findById(truckId);
    },
    getTrucks: async () => {
      return await Truck.find();
    },
    getWarehouse: async (_parent: unknown, { warehouseId }: { warehouseId: string }) => {
      return await Warehouse.findById(warehouseId);
    },
    getWarehouses: async () => {
      return await Warehouse.find();
    },
  },
  Mutation: {
    login: async (_parent: unknown, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid email or password.");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Invalid email or password.");
      }
      const token = signToken(user.email, user.username, user.role, user._id);
      return { token, user };
    },
    addUser: async (_parent: unknown, { username, email, password, role }: { username: string; email: string; password: string; role: string }) => {
      const user = await User.create({ username, email, password, role });
      const token = signToken(user.email, user.username, user.role, user._id);
      return { token, user };
    },
    addWarehouse: async (_parent: unknown, { name, location, status, capacity }: { name: string; location: string; status: string; capacity: number }) => {
      return await Warehouse.create({ name, location, status, capacity });
    },
    addTruck: async (_parent: unknown, { truckName, truckCapacity, driverName, status }: { truckName: string; truckCapacity: number; driverName: string; status: string }) => {
      return await Truck.create({ truckName, truckCapacity, driverName, status });
    },
    deleteTruck: async (_parent: unknown, { truckId }: { truckId: string }) => {
      return await Truck.findByIdAndDelete(truckId);
    },
    deleteWarehouse: async (_parent: unknown, { warehouseId }: { warehouseId: string }) => {
      return await Warehouse.findByIdAndDelete(warehouseId);
    },
    updateUserStatus: async (_parent: unknown, { userId, status }: { userId: string; status: string }) => {
      return await User.findByIdAndUpdate(userId, { $set: { status } }, { new: true });
    },
    updateWarehouseCapacity: async (_parent: unknown, { warehouseId, capacity }: { warehouseId: string; capacity: number }) => {
      return await Warehouse.findByIdAndUpdate(warehouseId, { $set: { capacity } }, { new: true });
    },
    addItem: async (_parent: unknown, { warehouseId, itemName, quantity, arrivalDate }: { warehouseId: string; itemName: string; quantity: number; arrivalDate: string }) => {
      return await Warehouse.findByIdAndUpdate(
        warehouseId,
        { $push: { items: { itemName, quantity, arrivalDate } } },
        { new: true }
      );
    },
    updateItem: async (_parent: unknown, { warehouseId, index, newItem }: { warehouseId: string; index: number; newItem: string }) => {
      return await Warehouse.findOneAndUpdate(
        { _id: warehouseId },
        { $set: { [`items.${index}.itemName`]: newItem } },
        { new: true }
      );
    },
    deleteItem: async (_parent: unknown, { warehouseId, itemName }: { warehouseId: string; itemName: string }) => {
      return await Warehouse.findByIdAndUpdate(
        warehouseId,
        { $pull: { items: { itemName } } },
        { new: true }
      );
    },
  },
};

export default resolvers;
