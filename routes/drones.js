const express = require('express');
const async = require('hbs/lib/async');
const Drone = require('../models/Drone.model');
const router = express.Router();

router.get('/drones', async (req, res, next) => {
  try {
    const drones = await Drone.find({});
    res.render("drones/list.hbs", { drones })
  } catch (error) {
    next(error)
  }
});

router.get('/drones/create', (req, res, next) => {
  res.render('drones/create-form.hbs');
});

router.post('/drones/create', async (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;
  try {
    await Drone.create({
      name,
      propellers,
      maxSpeed,
    })
    console.log("created")
    res.redirect('/drones')
  } catch (error) {
    next(error)
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  const { id } = req.params
  try {
    const drones = await Drone.findById(id);
    console.log(drones)
    res.render('drones/update-form.hbs', { drones } )
    
  } catch (error) {
    next(error)
  }  
});

router.post('/drones/:id/edit', async (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;
  const { id } = req.params;
  try {
    await Drone.findByIdAndUpdate( id, {
      name,
      propellers,
      maxSpeed,
    });
    res.redirect('/drones');
  } catch (error) {
    next(error)
  }
});

router.post('/drones/:id/delete', async (req, res, next) => {
  const { id } = req.params
  try {
    await Drone.findByIdAndDelete(id)
    res.redirect('/drones')
  } catch (error) {
    next(error)
  }
});

module.exports = router;
