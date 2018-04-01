var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

    // locals.section is used to set the currently selected
    // item in the header navigation.
	locals.section = 'home';

	view.on('init', function (next) {


		keystone.list('Project').model.count({ type: 'project' }, function (err, count) {
			if (err) {
				locals.projects_count = 0;
			} else {
				locals.projects_count = count;
			}
			keystone.list('Project').model.count({ type: 'workshop' }, function (err, count) {
				if (err) {
					locals.workshops_count = 0;
				} else {
					locals.workshops_count = count;
				}
				keystone.list('Project').model.count({ type: 'event' }, function (err, count) {
					if (err) {
						locals.events_count = 0;
					} else {
						locals.events_count = count;
					}
					keystone.list('User').model.count(function (err, count) {
						if (err) {
							locals.members_count = 0;
						} else {
							locals.members_cVount = count;
						}
						var q = keystone.list('Project').model.find().where('state', 'completed').sort('-publishedDate').limit(4);

						q.exec(function (err, results) {
							locals.projects = results;

							var q = keystone.list('Banner').model.find();

							q.exec(function (err, results) {
								locals.banners = results;
								next();
							});
						});
					});
				});
			});
		});
	});

    // Render the view
	view.render('home');
};
