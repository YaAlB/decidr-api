import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export const Location = mongoose.model('Location', LocationSchema);
