var express = require('express');
var router = express.Router();
const Proforma = require('../models/proformaSchema')
const Commercial = require('../models/commercialSchema')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/newProforma', async function(req, res, next) {
  console.log(req.body)
 try {
  const newProforma = new Proforma(req.body.data)
 await newProforma.save()
 res.json({success:true,message:"New Entry Uploaded"})

 } catch (error) {
  console.log(error)
 
  res.json({success:false,message:error.message})
 }


});

router.post('/updateProforma/:id', async function(req, res, next) {
  console.log(req.body)
 try {
  const data = await Proforma.findByIdAndUpdate(req.params.id,req.body.data)
//   const newProforma = new Proforma(req.body.data)
//  await newProforma.save()
 res.json({success:true,message:"Proforma Updated"})

 } catch (error) {
  console.log(error)
 
  res.json({success:false,message:error.message})
 }


});


router.post('/newCommercial', async function(req, res, next) {
  console.log(req.body)
 try {
  const newCommercial = new Commercial(req.body.data)
 await newCommercial.save()
 res.json({success:true,message:"New Entry Uploaded"})

 } catch (error) {
  console.log(error)
 
  res.json({success:false,message:error.message})
 }


});

router.post('/updateCommercial/:id', async function(req, res, next) {
  console.log(req.body)
 try {
  const data = await Commercial.findByIdAndUpdate(req.params.id,req.body.data)
//   const newProforma = new Proforma(req.body.data)
//  await newProforma.save()
 res.json({success:true,message:"Commercial Updated"})

 } catch (error) {
  console.log(error)
 
  res.json({success:false,message:error.message})
 }


});

router.post('/update/:id', async function(req, res, next) {
  console.log(req.params.id)
 try {
  const Proforma = await Proforma.findByIdAndUpdate(req.params.id,req.body)
 res.json({success:true,message:"Entry Updated"})

 } catch (error) {
  console.log(error)
 
  res.json({success:false,message:error.message})
 }


});


router.get('/getProforma', async function(req, res, next) {
  try {
    const data = await Proforma.find({})
    let temp = data.map(({ _id, createdAt, consignee1, total,invoiceDate2, product }) => ({
      _id,
      createdAt,
      consignee1,
      total,
      product,
      invoiceDate2
    }));
    console.log(data)
    res.json({success:true,data:temp})
  } catch (error) {
    console.log(error)
    res.json({success:false})
  }
});

router.get('/getProforma/:id', async function(req, res, next) {
  try {
   
    const data = await Proforma.findById(req.params.id)
    res.json({success:true,data})
  } catch (error) {
    console.log(error)
    res.json({success:false})
  }
});

router.get('/getCommercial', async function(req, res, next) {
  try {
    const data = await Commercial.find({})
    let temp = data.map(({ _id,type, createdAt, consignee1, total,invoiceDate2,acid, product }) => ({
      _id,
      createdAt,
      consignee1,
      type,
      total,
      product,
      acid,
      invoiceDate2
    }));
    console.log(data)
    res.json({success:true,data:temp})
  } catch (error) {
    console.log(error)
    res.json({success:false})
  }
});


router.get('/getCommercial/:id', async function(req, res, next) {
  try {
   
    const data = await Commercial.findById(req.params.id)
    res.json({success:true,data})
  } catch (error) {
    console.log(error)
    res.json({success:false})
  }
});

router.post('/searchCi', async function(req, res, next) {
  try {
   
   const Proforma = await Proforma.find({ commercialInvoice: { $regex: req.body.keyword, $options: 'i' } });
    res.json({success:true,Proforma})
  } catch (error) {
    console.log(error)
    res.json({success:false})
  }
});

router.post('/searchAcid', async function(req, res, next) {
  try {
   
   const Proforma = await Proforma.find({ acid: { $regex: req.body.keyword, $options: 'i' } });
    res.json({success:true,Proforma})
  } catch (error) {
    console.log(error)
    res.json({success:false})
  }
});

router.post('/searchDate', async function(req, res, next) {
  try {
   
   const Proforma = await Proforma.find({
    date: {
      $gte: new Date(req.body.from),
      $lte: new Date(req.body.to),
    },
  });

  console.log(Proforma)
  console.log('length : ',Proforma.length);
    res.json({success:true,Proforma})
  } catch (error) {
    console.log(error)
    res.json({success:false})
  }
});

module.exports = router;
