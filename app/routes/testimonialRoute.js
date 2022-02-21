const express = require('express');
const router = express();
const testimonialController = require('../controller/testimonialController');
const upload = require('../middleware/multer');

router.post('/multiDeleteTestimonial', testimonialController.multiDeleteTestimonial);

router.post('/addTestimonial', upload.single('T_Image'), testimonialController.addTestimonial);

router.get('/testimonial',testimonialController.testimonial);

router.get('/showEditTestimonial',testimonialController.xyz);//Meri Marji

router.get('/showTestimonial',testimonialController.showAddPage)

// router.get('/viewTestimonial/:id', testimonialController.viewTestimonial);

router.post('/updateTestimonial/:id', upload.single('T_Image'), testimonialController.updateTestimonial);

router.get('/deleteTestimonial', testimonialController.deleteTestimonial);

module.exports = router;