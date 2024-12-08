import mongoose from 'mongoose';

const AffiliationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export const Affiliation = mongoose.model('Affiliation', AffiliationSchema);
