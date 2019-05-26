var config = {}

// loads config by env
if (process.env.NODE_ENV == 'production') {
    config = require('./config.PRD.json');
} else {
    config = require('./config.DEV.json');
}

module.exports = config