import { Schema, model, Document } from 'mongoose';
import mongoose from 'mongoose';

interface ITruck extends Document {
  truckId: string;
  driverName: string;
  status: 'Available' | 'In Transit';
  assignedWarehouse: mongoose.Types.ObjectId;
}

const truckSchema = new Schema<ITruck>(
  {
    truckId: { 
      type: String,
      required: true, 
      unique: true 
    },
    driverName: { 
      type: String, 
      required: true 
    },
    status: {
       type: String,
       enum: ['Available', 'In Transit'], default: 'Available' 
      },
    assignedWarehouse: {
       type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' 
      },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Truck = model<ITruck>('Truck', truckSchema);

export default Truck;
