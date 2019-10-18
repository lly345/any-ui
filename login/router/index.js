const koaRouter = require("koa-router");
const router = new koaRouter();
const query = require("../mysql/index");
const crypto = require("crypto");
const hash = crypto.createHash("sha256");
let userlist;

router.get("/", async ctx => {
    await ctx.render("home");
});

router.post("/", async ctx => {
    const result = await query("select * from user");
    userlist = result;

    // 加密
    const { username, password } = ctx.request.body;
    hash.update(password);
    console.log(hash.digest("hex"));

    // 判断是否登陆
    userlist.forEach(item => {
        if (item.username === username) {
            ctx.body = {
                code: 1,
                data: "成功"
            };
        } else {
            ctx.body = {
                code: 1,
                data: "失败"
            };
        }
    });
});

module.exports = router;
