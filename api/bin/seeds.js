  
const mongoose = require('mongoose');
const User = require('../models/user.model');
const House = require('../models/house.model');
const Hospital = require('../models/hospital.model');
const Booking = require('../models/booking.model');
const housesData = require('../data/houses.json');
const userData = require('../data/users.json');
const hospitalsData = require('../data/hospitals.json');
const bookingsData = require('../data/bookings.json')

require('../config/db.config');

mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);
  mongoose.connection.db.dropDatabase()
    .then(() => console.log(`- Database dropped`))
    .then(() => User.create(userData))
    .then(users => {
      console.info(`- Added ${users.length} users`)
      const housesWithHostIds = housesData.map(house => {
        // house.idHost = users.find(user => user.email === house.idHost).id;
        return house;
      })
      return House.create(housesWithHostIds)
    })
    .then(houses => console.info(`- Added ${houses.length} houses`))
    .then(() => Hospital.create(hospitalsData))
    .then(hospitals => console.info(`- Added ${hospitals.length} hospitals`))
    // .then(() => Booking.create(bookingsData))
    // .then(bookings => console.info(`- Added ${bookings.length} bookings`))
    .then(() => console.info(`- All data created!`))
    .catch(error => console.error(error))
    .then(() => process.exit(0))
})