var hapi        = require('hapi');

module.exports = function defineRoutes(plugins) {
    "use strict";
    var server = new hapi.Server();

    server.connection({
        host: 'localhost',
        port: 8080
    });

    server.route([
        {
            path: "/locale",
            method: "GET",
            handler: function(request, reply) {
                reply({ locale: request.i18n.getLocale() });
            }
        },
        {
            path: "/{lang}/locale",
            method: "GET",
            handler: function(request, reply) {
                reply({ locale: request.i18n.getLocale() });
            }
        },
        {
            path: "/exposed",
            method: "GET",
            handler: function(request, reply) {
                var plugin = request.server.plugins['hapi-locale'];
                reply({
                    getLocales: plugin.getLocales(),
                    getLocale: plugin.getLocale(request, reply)
                });
            }
        }
    ]);


    server.register(plugins, function (err) {
        if (err) throw err;
        if (!module.parent) {
            server.start(function () {
                console.log('Server started at: ' + server.info.uri);
            });
        }
    });

    return server;
};