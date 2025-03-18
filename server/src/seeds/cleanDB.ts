import process from 'process';
import User from '../models/User.js';
import Truck from '../models/Truck.js';
import Warehouse from '../models/Warehouse.js';

const cleanDB = async (): Promise<void> => {
  try {
    // Delete documents from User collection
    await User.deleteMany({});
    await Truck.deleteMany({});
    await Warehouse.deleteMany({});
    console.log('User collection cleaned.');
  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
