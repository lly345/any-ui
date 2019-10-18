const { Service } = require("egg");

class listService extends Service {
    async getlist(pageSize = 0, pageCount = 5) {
        const $sql = `select * from movie limit ${pageSize},${pageCount}`;
        const data = await this.app.mysql.query($sql);
        return data;
    }
}

module.exports = listService;
