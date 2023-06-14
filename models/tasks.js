const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    status: {
        type: String,
        default: "taskready_opt"
      },
    
      createdAt: {
        type: Date,
        default: Date.now
        },
    
        createdBy: {    
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        deadline: {
            type: Date,
        }
});

module.exports = mongoose.model('Task', taskSchema);