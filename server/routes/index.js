var express = require('express');
var router = express.Router();
const Proforma = require('../models/proformaSchema')
const Commercial = require('../models/commercialSchema')
const argon2 = require('argon2')
const Admin = require('../models/adminSchema')
const jwt = require('jsonwebtoken')
const auth = require('../auth/auth')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;
  
  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Verify the password using argon2
    const validPassword = await argon2.verify(admin.password, password);
    if (!validPassword) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    if(admin?.block)
    {
      return res.status(400).json({ success: false, message: "Account Not Active" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { _id: admin._id, username: admin.username,block:admin.block },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "911919h" }
    );

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post('/signup', async function(req, res, next) {
  const { username, password } = req.body;
  
  try {
    // Check if an admin with the given username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    // Hash the password using argon2
    const hashedPassword = await argon2.hash(password);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

  

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error during admin signup:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post('/newProforma',auth.userAuth, async function(req, res, next) {
  console.log(req.body)
 try {
  const newProforma = new Proforma(req.body.data)
 await newProforma.save()
 res.json({success:true,message:"New Entry Uploaded",id:newProforma._id})

 } catch (error) {
  console.log(error)
 
  res.json({success:false,message:error.message})
 }


});

router.post('/updateProforma/:id',auth.userAuth, async function(req, res, next) {
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


router.post('/newCommercial',auth.userAuth, async function(req, res, next) {
  console.log(req.body)
 try {
  const newCommercial = new Commercial(req.body.data)
 await newCommercial.save()
 res.json({success:true,message:"New Entry Uploaded",id:newCommercial._id})

 } catch (error) {
  console.log(error)
 
  res.json({success:false,message:error.message})
 }


});

router.post('/updateCommercial/:id',auth.userAuth, async function(req, res, next) {
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

router.post('/update/:id',auth.userAuth, async function(req, res, next) {
  console.log(req.params.id)
 try {
  const Proforma = await Proforma.findByIdAndUpdate(req.params.id,req.body)
 res.json({success:true,message:"Entry Updated"})

 } catch (error) {
  console.log(error)
 
  res.json({success:false,message:error.message})
 }


});


router.get('/getProforma',auth.userAuth, async function(req, res, next) {
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

router.get('/getProforma/:id',auth.userAuth, async function(req, res, next) {
  try {
   
    const data = await Proforma.findById(req.params.id)
    res.json({success:true,data})
  } catch (error) {
    console.log(error)
    res.json({success:false})
  }
});

router.get('/getCommercial',auth.userAuth, async function(req, res, next) {
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


router.get('/getCommercial/:id',auth.userAuth, async function(req, res, next) {
  try {
   
    const data = await Commercial.findById(req.params.id)
    res.json({success:true,data})
  } catch (error) {
    console.log(error)
    res.json({success:false})
  }
});

router.post('/searchCi',auth.userAuth, async function(req, res, next) {
  try {
   
   const Proforma = await Proforma.find({ commercialInvoice: { $regex: req.body.keyword, $options: 'i' } });
    res.json({success:true,Proforma})
  } catch (error) {
    console.log(error)
    res.json({success:false})
  }
});

router.post('/searchAcid',auth.userAuth, async function(req, res, next) {
  try {
   
   const Proforma = await Proforma.find({ acid: { $regex: req.body.keyword, $options: 'i' } });
    res.json({success:true,Proforma})
  } catch (error) {
    console.log(error)
    res.json({success:false})
  }
});

router.post('/searchDate',auth.userAuth, async function(req, res, next) {
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
