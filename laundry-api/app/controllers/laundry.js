const laundry = require('../models').Laundry;

module.exports = {

    getById(req, res) {
      return laundry
        .findByPk(req.params.id, {
          include: [],
        })
        .then((doc) => {
          if (!doc) {
            return res.status(404).send({
              status_response: 'Not Found',
              errors: 'Status Not Found',
            });
          }
          const status = {
            status_response: 'OK',
            status: doc,
            errors: null
          }
          return res.status(200).send(status);
        })
        .catch((error) => {
          res.status(400).send({
            status_response: 'Bad Request',
            errors: error
          });
        });
    },
  
    list(req, res) {
      return laundry.findAll({
          limit: 10,
          include: [],
          order: [
            ['createdAt', 'DESC']
          ],
        })
        .then(docs => {
          const statuses = {
            status_response: 'OK',
            count: docs.length,
            statuses: docs.map(doc => {
              return doc
            }),
            errors: null
          }
          res.status(200).send(statuses);
        })
        .catch((error) => {
          res.status(400).send({
            status_response: 'Bad Request',
            errors: error
          });
        });
    },
  
    listStatusUser(req, res) {
      return laundry
        .findAll({
          limit: 10,
          include: [],
          where: {
              user_id: req.userId,
          },
          order: [
            ['createdAt', 'DESC']
          ],
        })
        .then(docs => {
          const statuses = {
            status_response: 'OK',
            count: docs.length,
            statuses: docs.map(doc => {
              return doc
            }),
            errors: null
          }
          res.status(200).send(statuses);
        })
        .catch((error) => {
          res.status(400).send({
            status_response: 'Bad Request',
            errors: error
          });
        });
    },
  
    add(req, res) {
      return laundry
        .create({
          user_id: req.userId,
          name: req.body.name,
          status: req.body.status,
          orderDate: req.body.orderDate,
          returnDate: req.body.returnDate,
          weight: req.body.weight,
          bill: req.body.bill
        })
        .then((doc) => {
          const status = {
            status_response: 'Created',
            status: doc,
            errors: null
          }
          return res.status(201).send(status);
        })
        .catch((error) => {
          res.status(400).send({
            status_response: 'Bad Request',
            errors: error
          });
        });
    },
  
    update(req, res) {
      return laundry
        .findByPk(req.params.id, {})
        .then(status => {
          if (!status) {
            return res.status(404).send({
              status_response: 'Bad Request',
              errors: 'Status Not Found',
            });
          }
  
          if (status.user_id !== req.userId) {
            return res.status(403).send({
              status_response: "Bad Request",
              errors: "Different User Id",
            });
          }
  
          return status
            .update({
              status: req.body.status || laundry.status,
              returnDate: req.body.returnDate || laundry.returnDate
            })
            .then((doc) => {
              const status = {
                status_response: 'OK',
                status: doc,
                errors: null
              }
              return res.status(200).send(status);
            })
            .catch((error) => {
              res.status(400).send({
                status_response: 'Bad Request',
                errors: error
              });
            });
        })
        .catch((error) => {
          res.status(400).send({
            status_response: 'Bad Request',
            errors: error
          });
        });
    },
  
    delete(req, res) {
      return laundry
        .findByPk(req.params.id)
        .then(status => {
          if (!status) {
            return res.status(400).send({
              status_response: 'Bad Request',
              errors: 'Status Not Found',
            });
          }
  
          if (status.user_id !== req.userId) {
            return res.status(403).send({
              status_response: "Bad Request",
              errors: "Different User Id",
            });
          }
  
          return status
            .destroy()
            .then(() => res.status(204).send({
              status_response: 'No Content',
              errors: null,
            })) // Kenapa respons nya ga keluar di postman? padahal berhasil 
            .catch((error) => {
              res.status(400).send({
                status_response: 'Bad Request',
                errors: error
              });
            });
        })
        .catch((error) => {
          res.status(400).send({
            status_response: 'Bad Request',
            errors: error
          });
        });
    },
  }