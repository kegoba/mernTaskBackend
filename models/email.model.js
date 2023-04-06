const mongoose = require('mongoose')
const Schema = mongoose.Schema


const EmailList = new Schema ({
    email: {
          type : String,
          required: true
    },
    created_at :{
        type: Date,
        default : Date.now
    },
    messageId: { 
            msg_id : {
                String
            }
        },
})



module.exports= mongoose.model('email_list' , EmailList)




