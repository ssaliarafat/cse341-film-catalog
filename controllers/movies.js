const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');
const validateMovie = (movie) => {
    const requiredFields = [
        'title',
        'description',
        'genre',
        'releaseYear',
        'runtimeMinutes',
        'language',
        'country',
        'director',
        'rating',
        'status'
    ];

    for (const field of requiredFields) {
        if (
            movie[field] === undefined ||
            movie[field] === null ||
            movie[field] === ''
        ) {
            return `${field} is required`;
        }
    }

    if (typeof movie.releaseYear !== 'number') {
        return 'releaseYear must be a number';
    }

    if (typeof movie.runtimeMinutes !== 'number') {
        return 'runtimeMinutes must be a number';
    }

    if (typeof movie.rating !== 'number') {
        return 'rating must be a number';
    }

    return null;
};

const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDb()
            .collection('movies')
            .find();

        const movies = await result.toArray();

        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error retrieving movies'
        });
    }
};

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid movie ID'
            });
        }

        const movie = await mongodb
            .getDb()
            .collection('movies')
            .findOne({
                _id: new ObjectId(req.params.id)
            });

        if (!movie) {
            return res.status(404).json({
                message: 'Movie not found'
            });
        }

        res.status(200).json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error retrieving movie'
        });
    }
};

const create = async (req, res) => {
    try {
        const validationError = validateMovie(req.body);

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }
        const movie = {
            title: req.body.title,
            description: req.body.description,
            genre: req.body.genre,
            releaseYear: req.body.releaseYear,
            runtimeMinutes: req.body.runtimeMinutes,
            language: req.body.language,
            country: req.body.country,
            director: req.body.director,
            rating: req.body.rating,
            status: req.body.status
        };

        const result = await mongodb
            .getDb()
            .collection('movies')
            .insertOne(movie);

        res.status(201).json({
            id: result.insertedId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating movie'
        });
    }
};

const update = async (req, res) => {
    try {
        const validationError = validateMovie(req.body);

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid movie ID'
            });
        }

        const movie = {
            title: req.body.title,
            description: req.body.description,
            genre: req.body.genre,
            releaseYear: req.body.releaseYear,
            runtimeMinutes: req.body.runtimeMinutes,
            language: req.body.language,
            country: req.body.country,
            director: req.body.director,
            rating: req.body.rating,
            status: req.body.status
        };

        const result = await mongodb
            .getDb()
            .collection('movies')
            .replaceOne(
                { _id: new ObjectId(req.params.id) },
                movie
            );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'Movie not found'
            });
        }

        res.status(200).json({
            message: 'Movie updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error updating movie'
        });
    }
};

const remove = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid movie ID'
            });
        }

        const result = await mongodb
            .getDb()
            .collection('movies')
            .deleteOne({
                _id: new ObjectId(req.params.id)
            });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'Movie not found'
            });
        }

        res.status(200).json({
            message: 'Movie deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error deleting movie'
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    create,
    update,
    remove
};