/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Market from '../api/market/market.model';
import User from '../api/user/user.model';

Market.find({}).removeAsync()
  .then(() => {
    Market.create({
      name: 'Development Tools',
      description: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
                   'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
                   'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      description: 'Built with a powerful and fun stack: MongoDB, Express, ' +
                   'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      description: 'Build system ignores `spec` files, allowing you to keep ' +
                   'tests alongside code. Automatic injection of scripts and ' +
                   'styles into your index.html'
    }, {
      name: 'Modular Structure',
      description: 'Best practice client and server structures allow for more ' +
                   'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      description: 'Build process packs up your templates as a single JavaScript ' +
                   'payload, minifies your scripts/css/images, and rewrites asset ' +
                   'names for caching.'
    }, {
      name: 'Deployment Ready',
      description: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
                   'and openshift subgenerators'
    }).then(() => {
      console.log('finished populating markets');
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
