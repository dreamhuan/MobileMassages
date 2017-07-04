/**
 * zhegewenjianshilaigaoxiaode
 */
const express = require('express');
const router = express.Router();
const RestResult = require('../RestResult');

const BookingstepModel = require('../models/Bookingstep').BookingstepModel;
const FaqModel = require('../models/Faq').FaqModel;
const MassagetypeModel = require('../models/Massagetype').MassagetypeModel;
const PriceModel = require('../models/Price').PriceModel;
const TherapistModel = require('../models/Therapist').TherapistModel;

router.post('/bookingstep2', function (req, res, next) {
    BookingstepModel.find({}, function (err, docs) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        if (docs) {
            res.success(docs);
        } else {
            res.error(RestResult.TARGET_NOT_EXIT_ERROR_CODE, 'No Content!');
        }
    })
});

router.post('/faq', function (req, res, next) {
    FaqModel.find({}, function (err, docs) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        if (docs) {
            res.success(docs);
        } else {
            res.error(RestResult.TARGET_NOT_EXIT_ERROR_CODE, 'No Content!');
        }
    })
});

router.post('/home-massage-type', function (req, res, next) {
    MassagetypeModel.find({}, function (err, docs) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        if (docs) {
            res.success(docs);
        } else {
            res.error(RestResult.TARGET_NOT_EXIT_ERROR_CODE, 'No Content!');
        }
    })
});

router.post('/price', function (req, res, next) {
    PriceModel.find({}, function (err, docs) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        if (docs) {
            res.success(docs);
        } else {
            res.error(RestResult.TARGET_NOT_EXIT_ERROR_CODE, 'No Content!');
        }
    })
});

router.post('/massage-therapists', function (req, res, next) {
    TherapistModel.find({}, function (err, docs) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        if (docs) {
            res.success(docs);
        } else {
            res.error(RestResult.TARGET_NOT_EXIT_ERROR_CODE, 'No Content!');
        }
    })
});


module.exports = router;