import mongoose from 'mongoose';

const PersonSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
  affiliations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Affiliation' }],
  weapon: { type: String },
  vehicle: { type: String },
  species: { type: String },
  gender: { type: String },
});

// Create indexes
PersonSchema.index({ first_name: 1 });
PersonSchema.index({ last_name: 1 });
PersonSchema.index({ 'locations.name': 1 });
PersonSchema.index({ 'affiliations.name': 1 });

export const Person = mongoose.model('Person', PersonSchema);
