var mongoose = require('mongoose');

var themeSchema = mongoose.Schema({
    themes: ['All', 'Animals', 'Flowers', 'People', 'Scenery']
});


module.exports = mongoose.model('ContestTheme', themeSchema);