import homeRoute from './home-route';
import awesomeRoute from './awesome-route';

const router = require('koa-router')();

router.get('/', homeRoute);
router.get('/awesome', awesomeRoute);

module.exports = router;