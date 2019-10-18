"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = "hi, egg";
    }
    async getlist() {
        const { ctx } = this;
        const { pageSize, pageCount } = ctx.request.query;
        const result = await ctx.service.home.getlist(pageSize, pageCount);
        ctx.body = {
            code: 1,
            result
        };
    }
}

module.exports = HomeController;
