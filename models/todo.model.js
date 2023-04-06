const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoList = new Schema ({
    tittle :{
            type:  String
        },
        content :{
        type:  String
        },

        date: {
            type: Date,
            default: Date.now,

        }

})


module.exports = mongoose.model("TodoList", TodoList)
