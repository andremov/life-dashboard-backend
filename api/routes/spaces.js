const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

router.get('/',async (req,res) => {
    Order.find().exec().then(docs => {
        res.status(200).json({
            count : docs.length,
            orders : docs
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.post('/',async (req,res) => {
    Product.findById(req.body.productId)
    .then(product => {
        const order = new Order({
            _id : mongoose.Types.ObjectId(),
            quantity : req.body.quantity,
            product : req.body.productId
        });
        return order.save()
    }).then(
        result => {
            res.status(200).json(result);
        }
    ).catch(
        err => {
            res.status(500).json({
                error: err
            })
        }
    );


});

router.get('/:id',async (req,res) => {
    res.status(200).json({
        message: 'Get order details',
        orderId : req.params.orderId
    });
});


router.delete('/:id',async (req,res) => {
    res.status(200).json({
        message: 'Deleting order'
    });
});

module.exports = router;
