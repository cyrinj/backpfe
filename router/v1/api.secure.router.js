const router = require('express').Router();

router.use("/admin", require('./secure/admin.router.js')) ;
router.use("/host", require('./secure/host.router.js')) ;
router.use("/tripper", require('./secure/tripper.router.js')) ;


module.exports = router;