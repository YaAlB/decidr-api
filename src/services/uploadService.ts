import { Person } from '../models/person';
import { Location } from '../models/location';
import { Affiliation } from '../models/affiliation';
import { titleCase } from '../utils/titleCase';
import { CsvRow } from 'types/CsvRow';

export const processCsvData = async (data: CsvRow[]) => {
  for (const row of data) {
    try {
      // Skip rows without a name or affiliations
      if (!row.Affiliations || !row.Name) {
        continue;
      }

      // Split Name into first_name and last_name
      const nameParts = titleCase(row.Name).split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || null;

      // Parse and title-case locations and affiliations
      const locations = row.Location.split(',').map((loc) => titleCase(loc.trim()));
      const affiliations = row.Affiliations.split(',').map((aff) => titleCase(aff.trim()));

      // Extract optional fields
      const weapon = row.Weapon ? titleCase(row.Weapon) : null;
      const vehicle = row.Vehicle ? titleCase(row.Vehicle) : null;
      const species = row.Species ? titleCase(row.Species) : null;
      const gender = row.Gender ? titleCase(row.Gender) : null;

      // Get or create locations
      const locationIds = await Promise.all(
        locations.map(async (loc) => {
          const location = await Location.findOneAndUpdate(
            { name: loc },
            { name: loc },
            { upsert: true, new: true }
          );
          return location._id;
        })
      );

      // Get or create affiliations
      const affiliationIds = await Promise.all(
        affiliations.map(async (aff) => {
          const affiliation = await Affiliation.findOneAndUpdate(
            { name: aff },
            { name: aff },
            { upsert: true, new: true }
          );
          return affiliation._id;
        })
      );

      // Save the person to the database
      const person = await Person.create({
        first_name: firstName,
        last_name: lastName,
        locations: locationIds,
        affiliations: affiliationIds,
        weapon,
        vehicle,
        species,
        gender,
      });

    } catch (err) {
      console.error('Error processing row:', row, err);
    }
  }
};