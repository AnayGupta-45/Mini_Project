const csv = require('csvtojson');
const College = require('../models/College');

const importData = async () => {
    const collegeCount = await College.countDocuments();
    if (collegeCount === 0) {
        console.log('No colleges found. Importing data from CSV...');
        const csvFilePath = './data/engineering colleges in India.csv';
        try {
            const jsonObj = await csv().fromFile(csvFilePath);
            await College.insertMany(jsonObj);
            console.log('Data imported successfully.');
        } catch (err) {
            console.error('Error importing data:', err);
        }
    } else {
        console.log(`Database already contains ${collegeCount} colleges.`);
    }
};

module.exports = importData;