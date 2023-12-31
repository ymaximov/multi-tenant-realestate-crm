const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')
const Appointment = require('../models/appointmentModel')
const BusinessPartner = require('../models/businessPartnersModel')
const Client = require('../models/clientsModel')
const Tenant = require('../models/tenantsModel')
const User = require('../models/userModel')
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    port : 5432,
    user : 'postgres',
    password : 'Bitilto05!',
    database : 'emmix'
  }
});

router.post('/create-tenant', authMiddleware, async(req, res) => {
    try {
      console.log(req.body, 'form details!!!');
      const newTenant = new Tenant(req.body);
      const tenant = await newTenant.save();
      res.status(200).send({message: 'New Tenant created successfully', success: true})
        console.log(tenant, 'new tenant created')
    } catch (error) {
      console.log(error);
        res.status(500).send({message: 'Error creating new tenant', success: false, error});// 
    }
  })

  router.get('/get-all-tenants/:companyId', authMiddleware, async(req, res) => {
    try {
        const tenants = await Tenant.find({companyId: req.params.companyId})
        res.status(200).send({
            message: "Tenants fetched successfully",
            success: true,
            data: tenants,
          });
    } catch (err) {
      console.log(err)
        res.status(+err.status || +err.statusCode || +err.code || 500 ).json({...err, messsage: 'failed to fetch tenants'})
    }
  })


module.exports = router