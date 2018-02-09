module.exports = function override(config, env) {
    if (!config.externals) {
        config.externals = {};
    }
    config.externals.jodit = 'Jodit';
    return config;
};