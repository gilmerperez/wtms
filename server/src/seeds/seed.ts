import db from '../config/connection.js';
import  User from '../models/User.js';
//
//
import cleanDB from './cleanDB.js';

import userData from './userData.json' with { type: 'json'};
// //
// import truckData from './truckData.json' with { type: 'json'};
// import warehouseData from './warehouseData.json' with { type: 'json'};


const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();
    
    await User.create(userData);
    // await Truck.create(truckData);
    // await Warehouse.create(warehouseData);
    console.log('Seeding User Table completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
  

}

seedDatabase();
