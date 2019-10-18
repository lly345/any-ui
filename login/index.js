const koa = require("koa");
const path = require("path");
const koaViews = require("koa-views");
const bodyParser = require("koa-bodyparser");

const app = new koa();
const views = path.join(__dirname, "views");
const router = require("./router");

app.use(
    koaViews(views, {
        extension: "ejs"
    })
);

app.use(bodyParser());
app.use(router.routes(), router.allowedMethods());

const Port = process.env.PORT || 3000;
app.listen(Port);
pp;
