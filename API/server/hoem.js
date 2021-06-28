const db = require("../db/mysql");

class Message {
    constructor(state, msg, data) {
        this.state = state;
        this.msg = msg;
        this.data = data;
    }
}

exports.getList = async function (req, res) {
    let classList = await db("SELECT * FROM `class`");
    let list = await db("SELECT * FROM `link`");
    classList.forEach(item => {
        item.links = [];
        list.forEach((element, index) => {
            if (item.id == element.navId) {
                item.links.push(element);
                list.splice(index, 1);
            }
        });
    });
    res.send(new Message(200, "成功！", classList));
}