const db = require("../db/mysql");

class Message{
    constructor(state,msg,data){
        this.state = state;
        this.msg = msg;
        this.data = data;
    }
}

exports.getList = async function (req,res) {
    let classList =await db("SELECT * FROM `class`");
    let list = await db("SELECT * FROM `link`");
    classList.forEach(item => {
        list.forEach(element => {
            if (item.id == element.className) {
                item.value = element;
            }
        });
    });
    res.send(new Message(200,"成功！",classList));
}