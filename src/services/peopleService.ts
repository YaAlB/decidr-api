import { Person } from '../models/person';

export const getPeople = async (
    page: number,
    limit: number,
    search: string,
    sortBy: string,
    order: string
  ) => {
    const filter = search
  ? {
      $or: [
        { first_name: new RegExp(search, 'i') },
        { last_name: new RegExp(search, 'i') },
        { 'locations.name': new RegExp(search, 'i') },
        { 'affiliations.name': new RegExp(search, 'i') },
        { species: new RegExp(search, 'i') },
        { gender: new RegExp(search, 'i') },
      ],
    }
  : {};
    
    const sort: { [key: string]: 1 | -1 } = { [sortBy]: order === 'asc' ? 1 : -1 };
    const total = await Person.countDocuments(filter);
  
    const people = await Person.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('locations')
    .populate('affiliations');

  return { total, people };
  };
  