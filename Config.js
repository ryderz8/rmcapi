/**
 * @module Config
 * @since 0.0.1
 */
/**
 * Hellow world
 * @param {object} dbconfig - database configuration variable for the server 
 * @param {String} dbconfig.liveurl - mlab mongo url 
 */
module.exports = Object.freeze({
    dbconfig: {
        liveUrl: '',
        testUrl: 'mongodb://localhost:27017',
        dbType: 'mongodb',
        version: '3.0.0',
        testDatabase: 'test',
        liveDatabase: '',
        replicaSet: ''
    },
    test: {
        PORT: 8709
    }
});