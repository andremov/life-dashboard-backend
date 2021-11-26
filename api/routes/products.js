const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/',async (req,res) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json({
                count : doc.length,
                products : doc.map(item =>{
                    return {
                        name : item.name,
                        price : item.price,
                        _id : item._id
                    }
                })
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        })
});

router.post('/',async (req,res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });
    product.save().then( doc => {
        res.status(200).json(doc);
    }).catch(err =>{
        res.status(500).json({
            error: err
        });
    })
});

router.get('/:id',async (req,res) => {
    let id = req.params.id;
    Product.findById(id).exec().then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: 'Product not found.'
            });
        }
    }).catch( err => {
        res.status(500).json({
            error: err
        });
    })
});

router.patch('/:id',async (req,res) => {
    let id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id:id},{$set: updateOps}).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
});

router.delete('/:id',async (req,res) => {
    let id = req.params.id;
    Product.deleteOne({_id : id}).exec().then (doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            message: err
        });
    });
});

module.exports = router;
