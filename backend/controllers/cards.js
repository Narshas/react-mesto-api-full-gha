const Card = require('../models/card');
const BadRequestError = require('../errors/error-bad-request');
const NotFoundError = require('../errors/error-not-found');
const NotAllowedError = require('../errors/error-not-allowed');

const {
  OK,
  CREATED,
} = require('../errors/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(BadRequestError('data is incorrect'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('we dont have it');
      }
      if (req.user._id !== card.owner.toString()) {
        throw new NotAllowedError('not your card');
      }
      return card.deleteOne()
        .then(() => res.status(OK).send({ message: 'card deleted' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('incorrect id'));
      } else {
        next(err);
      }
    });
};

const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('we dont have it');
      }
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('data is incorrect'));
      } else {
        next(err);
      }
    });
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('we dont have it');
      }
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('data is incorrect'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
