const jwt = require("jsonwebtoken");

module.exports = {
  userAuth: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

    
      if (err) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }
      if(user?.block)
        {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }
      
     
      next();
    });
  },


 
};
