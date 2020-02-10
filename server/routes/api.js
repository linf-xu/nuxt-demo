const router = require('koa-router')();
const fs = require("fs");
// router.prefix('/api');

/*服务检查*/
router.get('/checkServer', async (ctx) => {
    let status = ''
    try {
        status = fs.readFileSync('checkServer',"utf-8")
    } catch (error) {
        console.error('读取checkServer失败',error)
    }
    ctx.body = status
  });
/*webhook weibo-static master分支push event*/
router.get('/webhookWeiboStaticPushEvent', async (ctx) => {
    console.error('收到weibo-static master分支push event webhook')
    ctx.body = 'ok,webhookWeiboStaticPushEvent'
    
  });

module.exports = router