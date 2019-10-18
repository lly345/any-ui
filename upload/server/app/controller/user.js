const { Controller } = require("egg");
const fs = require("fs");
const path = require("path");

const saveimg = (filename, image) => {
    const pathfile = path.join(process.cwd(), "app/public/avater", filename);
    fs.writeFileSync(pathfile, image);
};
class HomeController extends Controller {
    upload() {
        console.log(this.ctx.request.files[0]);
        const { filename, filepath } = this.ctx.request.files[0];
        const image = fs.readFileSync(filepath);
        saveimg(filename, image);
        this.ctx.body = {
            code: 1,
            msg: "success!",
            picUrl: `public/avater/${filename}`
        };
    }
}

module.exports = HomeController;
