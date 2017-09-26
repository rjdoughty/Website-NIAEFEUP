var keystone = require('keystone');
var Candidatura = keystone.list('Candidatura');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'candidatura';
    locals.filters = {
        id: req.params.id,
    };

    // Load the current post
    view.on('init', function(next) {

        var q = keystone.list('Candidatura').model.findById(req.params.id);

        q.exec(function(err, result) {
            locals.user = result;
            next(err);
        });

    });

    // Render the view
    view.render('candidatura');
};


exports.create = function(req, res, next) {

  var novaCand = new Candidatura.model(req.body);

  novaCand.save();

  //TODO enviar email
  req.flash('success', 'Candidatura Submitted');
  res.redirect('/');
}