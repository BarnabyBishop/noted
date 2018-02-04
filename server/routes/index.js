import getListRoute from './get-list-route';
import saveListItemRoute from './save-list-item-route';

const router = require('koa-router')();

router.get('/', (ctx, next) => { ctx.send(200) });
router.get('/api/get-list', getListRoute);
router.post('/api/save-list-item', saveListItemRoute);

module.exports = router;
