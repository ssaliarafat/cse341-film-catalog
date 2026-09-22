const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');
const validateReview = (review) => {
    const requiredFields = [
        'movieId',
        'reviewerName',
        'rating',
        'comment',
        'reviewDate',
        'verified'
    ];

    for (const field of requiredFields) {
        if (
            review[field] === undefined ||
            review[field] === null ||
            review[field] === ''
        ) {
            return `${field} is required`;
        }
    }

    if (typeof review.rating !== 'number') {
        return 'rating must be a number';
    }

    if (typeof review.verified !== 'boolean') {
        return 'verified must be true or false';
    }

    return null;
};

const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDb()
            .collection('reviews')
            .find();

        const reviews = await result.toArray();

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error retrieving reviews'
        });
    }
};

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid review ID'
            });
        }

        const review = await mongodb
            .getDb()
            .collection('reviews')
            .findOne({
                _id: new ObjectId(req.params.id)
            });

        if (!review) {
            return res.status(404).json({
                message: 'Review not found'
            });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error retrieving review'
        });
    }
};

const create = async (req, res) => {
    try {
        const validationError = validateReview(req.body);

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }
        const review = {
            movieId: req.body.movieId,
            reviewerName: req.body.reviewerName,
            rating: req.body.rating,
            comment: req.body.comment,
            reviewDate: req.body.reviewDate,
            verified: req.body.verified
        };

        const result = await mongodb
            .getDb()
            .collection('reviews')
            .insertOne(review);

        res.status(201).json({
            id: result.insertedId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating review'
        });
    }
};

const update = async (req, res) => {
    try {
        const validationError = validateReview(req.body);

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }
        
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid review ID'
            });
        }

        const review = {
            movieId: req.body.movieId,
            reviewerName: req.body.reviewerName,
            rating: req.body.rating,
            comment: req.body.comment,
            reviewDate: req.body.reviewDate,
            verified: req.body.verified
        };

        const result = await mongodb
            .getDb()
            .collection('reviews')
            .replaceOne(
                { _id: new ObjectId(req.params.id) },
                review
            );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'Review not found'
            });
        }

        res.status(200).json({
            message: 'Review updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error updating review'
        });
    }
};

const remove = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid review ID'
            });
        }

        const result = await mongodb
            .getDb()
            .collection('reviews')
            .deleteOne({
                _id: new ObjectId(req.params.id)
            });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'Review not found'
            });
        }

        res.status(200).json({
            message: 'Review deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error deleting review'
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