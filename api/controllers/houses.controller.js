const createError = require('http-errors');
const House = require('../models/house.model');

module.exports.list = (req, res, next) => {

    const criteria = req.query;
    House.find(criteria)
        .populate('idHost', '_id name email')
        .then(houses => res.json(houses))
        .catch(next)
}

module.exports.get = (req, res, next) => {
    House.findById(req.params.id)
        .populate('idHost', '_id name email')
        .then(house => {
            if (house) res.json(house)
            else next(createError(404, 'House not found'))
        })
        .catch(next)
}

module.exports.create = (req, res, next) => {
    console.log(req.body.location.split(",").map(e => parseFloat(e)));
    const location = req.body.location.split(",").map(e => parseFloat(e));
    req.body.location = {
        type: 'Point',
        coordinates: location
    }
    console.log(location);
    req.body.house = req.user.id;
    
    House.create(req.body)
        .then(house => res.status(201).json(house))
        .catch(error => {
            if (error.errors && error.error['location.coordinates']) {
                error.errors.location = error.errors['location.coordinates'];
                delete error.errors['location.coordinates']
            }
            next(error);
        })
}

module.exports.delete = (req, res, next) => {
    const criterial = { _id: req.params.id}
    if (req.user.role !== 'admin') {
        criterial.user = req.user.id;
    }

    House.findByIdAndDelete(criterial)
        .then(house => {
            if (!house) next(createError(404, 'House not found'))
            else if (house.host != req.user.id) next(createError(403, 'Only the owner of the house can perform this action'))
            // else return house.delete();
            else return res.status(204).end();
        })
        .catch(next)
}

module.exports.update = (req, res, next) => {
    const { location } = req.body;
    if (location) {
        req.body.location = {
            type: 'Point',
            coordinates: location
        }
    }
    // Remove attributes than cant be modified
    delete req.body.idHost;
    delete req.body.id;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    House.findById(req.params.id)
        .then(house => {
            if (!house) next(createError(404, 'house not found'))
            else if (house.idHost != req.user.id) next(createError(403, 'Only the owner of the house can perform this action'))
            else {
                Object.assign(house, req.body)
                return house.save()
                    .then(house => res.json(house))
            }
        }).catch(next)
}

module.exports.searchTag = (req, res, next) => {
    const keyWord = req.body.keyWord;
    const keyRE = new RegExp(keyWord, "i");
    Service.find({ $or: [{ title: keyRE }, { nickname: keyRE }, { description: keyRE }] })
        .populate("host")
        .then((houses) => {
            res.render('houses/host', { houses })
        })
        .catch(next);
}
