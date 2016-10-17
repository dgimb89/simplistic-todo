// define model =================
module.exports = function (app, mongoose) {
    var module = mongoose.model('Todo', {
	    text : String
	});

    return module;
};