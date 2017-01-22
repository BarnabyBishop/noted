import homeRoute from './home-route';
import saveListItemRoute from './save-list-item-route';

const router = require('koa-router')();

router.get('/', homeRoute);
router.post('/api/save-list-item', saveListItemRoute);

module.exports = router;