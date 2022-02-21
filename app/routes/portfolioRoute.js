const express = require('express');
const router = express();
const portfolioController = require('../controller/portfolioController');
const upload = require('../middleware/multer');


router.get('/addPortfolio',portfolioController.firstPage)

router.post('/addPortfolio', upload.single('P_image'), portfolioController.addPortfolio);

router.post('/multiDeletePortfolio', portfolioController.multiDeletePortfolio);
router.get('/viewPortfolio/:id', portfolioController.viewPortfolio);

router.get('/portfolio',portfolioController.portfolio);

router.get('/showPortfolio',portfolioController.firstPage);


router.put('/updatePortfolio/:id', portfolioController.updatePortfolio);

router.get('/deletePortfolio', portfolioController.deletePortfolio);


module.exports = router;