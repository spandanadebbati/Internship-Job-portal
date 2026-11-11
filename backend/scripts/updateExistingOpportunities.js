// One-time script: fills in fields that are missing on the opportunities
// that were created before "domain" and "experience" were saved correctly.
//
// It is safe to run more than once:
//   - it never deletes anything
//   - it only sets a field when that field is currently empty
//   - records not listed below are left alone
//
// Run from the backend folder:  npm run update-records

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const mongoose = require('mongoose');

// Each update finds the record by its title and company
const updates = [
    {
        match: { title: 'React Developer Intern', company: 'AI Tech gen Technologies' },
        fill: { domain: 'Web Development', experience: 'Fresher' }
    },
    {
        match: { title: 'Java Developer Intern', company: 'LTM' },
        fill: { domain: 'Java Development', experience: 'Fresher' }
    },
    {
        match: { title: 'Python Developer', company: 'Infosys' },
        fill: { domain: 'Python Development', experience: 'Fresher' }
    },
    {
        match: { title: 'AI Developer', company: 'HCLTech' },
        fill: { domain: 'Artificial Intelligence', experience: 'Fresher' },
        // Spelling correction: "Banglore" -> "Bengaluru"
        fix: { field: 'location', from: 'Banglore', to: 'Bengaluru' }
    }
];

function isEmpty(value) {
    return value === undefined || value === null || String(value).trim() === '';
}

async function run() {
    await mongoose.connect(process.env.MONGO_URI.trim());

    // Use the raw collection so this script works whatever the schema says
    const collection = mongoose.connection.collection('opportunities');

    for (const item of updates) {
        const record = await collection.findOne(item.match);

        if (!record) {
            console.log(`Not found, skipped: ${item.match.title} - ${item.match.company}`);
            continue;
        }

        const changes = {};

        Object.entries(item.fill).forEach(([field, value]) => {
            if (isEmpty(record[field])) {
                changes[field] = value;
            }
        });

        if (item.fix && record[item.fix.field] === item.fix.from) {
            changes[item.fix.field] = item.fix.to;
        }

        if (Object.keys(changes).length === 0) {
            console.log(`Already complete: ${record.title} - ${record.company}`);
            continue;
        }

        await collection.updateOne({ _id: record._id }, { $set: changes });
        console.log(`Updated ${record.title} - ${record.company}:`, changes);
    }

    // Report any other records that still have no domain
    const stillMissing = await collection.find({
        $or: [{ domain: { $exists: false } }, { domain: null }, { domain: '' }]
    }).toArray();

    stillMissing.forEach((record) => {
        console.log(`Still missing a domain (edit it in the Admin page): ${record.title} - ${record.company}`);
    });
}

run()
    .catch((error) => {
        console.error('Update failed:', error.message);
        process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());
