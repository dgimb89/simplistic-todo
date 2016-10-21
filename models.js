// define model =================
module.exports = function (app, mongoose) {
    var module = {}

    var todoSchema = new mongoose.Schema({
        title: String,
        finished: Date,
    });

    var catSchema = new mongoose.Schema({
        title: String,
        color: { 
            type: String,
            default: '#eee',
        },
        todos: [todoSchema],
    });

    module.todo = mongoose.model('Todo', {
        title: {
            type: String,
            required: true,
        },
        interval: {
            type: String,
            enum: ['year', 'month', 'week', 'day'],
            default: 'week',
        },
        categories: [catSchema],
    });



    return module;
};