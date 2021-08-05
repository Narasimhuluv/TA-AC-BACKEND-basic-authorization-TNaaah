var express = require('express')
var router = express.Router();
var Product = require('../models/Product')

router.get('/newproduct', (req,res,next) => {
    let user = req.user;
    res.render('adminAddProduct', {user})
})

router.post('/newproduct', (req,res,next) => {
    // console.log(req.body)
    Product.create(req.body, (err, product)=> {
        if(err) return next(err);
        res.redirect('/admin/allproducts')
    })
})

router.get('/allproducts', (req,res,next) => {
    Product.find({}, (err, allproducts) => {
        let user = req.user;
        if(err) return next(err);
        res.render('adminallproducts', {allproducts,user})
    })
})
router.get('/allclients', (req,res,next) => {
    let user = req.user;
    res.render('allclients', {user})
})

// each product
router.get('/:id', (req,res,next) => {
    let id = req.params.id;
    let user = req.user;
    Product.findById(id, (err, eachproduct) => {
        if(err) return next(err);
        res.render('admineachproduct', {eachproduct, user})
    })
})

router.get('/:id/edit', (req,res,next) => {
    let id = req.params.id;
    let user = req.user;
    Product.findById(id,(err, updateproduct) => {
        if(err) return next(err);
        res.render('adminUpdateProduct', {updateproduct, user})
    })
})

router.post('/:id/updated', (req,res,next) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, (err, updateproduct) => {
        if(err) return next (err);
        res.redirect('/admin/' + id)
    })
})


router.get('/:id/delete', (req,res,next) => {
    let id = req.params.id;
    Product.findByIdAndRemove(id, (err, deleteproduct) => {
        if(err) return next(err);
        res.redirect('/admin/allproducts')
    })
})

module.exports = router;