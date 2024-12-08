import { Person } from '../models/person';
import { Location } from '../models/location';
import { Affiliation } from '../models/affiliation';
import { titleCase } from '../utils/titleCase';

export const processCsvData = async (data: any[]) => {
    for (const row of data) {
        if (!row.affiliation || !row.first_name) {
            continue;
        }

        // Titlecase names, locations, and affiliations
        const firstName = titleCase(row.first_name);
        const lastName = row.last_name ? titleCase(row.last_name) : null;
        const locations = row.location.split(',').map(titleCase);
        const affiliations = row.affiliation.split(',').map(titleCase);

        // Extract optional weapon and vehicle fields
        const weapon = row.weapon ? titleCase(row.weapon) : undefined;
        const vehicle = row.vehicle ? titleCase(row.vehicle) : undefined;

        try {
            const locationIds = await Promise.all(
                locations.map(async (loc: any) => {
                    const location = await Location.findOneAndUpdate(
                        { name: loc },
                        { name: loc },
                        { upsert: true, new: true }
                    );
                    return location._id;
                })
            );

            const affiliationIds = await Promise.all(
                affiliations.map(async (aff: any) => {
                    const affiliation = await Affiliation.findOneAndUpdate(
                        { name: aff },
                        { name: aff },
                        { upsert: true, new: true }
                    );
                    return affiliation._id;
                })
            );

            // Save person to the DB
            const person = await Person.create({
                first_name: firstName,
                last_name: lastName,
                locations: locationIds,
                affiliations: affiliationIds,
                weapon,
                vehicle,
            });
            console.log('Person saved:', person);
        } catch (err) {
            console.error('Error saving person:', err);
        }
    }
};
