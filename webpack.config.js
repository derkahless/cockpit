/* --------------------------------------------------------------------
 * Fill in module info here.
 */

var info = {
    entries: {
        "apps/apps": [
            "apps/index.jsx"
        ],

        "dashboard/dashboard": [
            "dashboard/list.js",
        ],

        "docker/docker": [
            "docker/containers.js"
        ],
        "docker/console": [
            "docker/console.js",
        ],

        "kdump/kdump": [
            "kdump/kdump.js",
            "kdump/kdump.css",
        ],

        "machines/machines": [
            "machines/index.js",
            "machines/machines.less",
        ],

        "networkmanager/network": [
            "networkmanager/interfaces.js",
            "networkmanager/utils.js"
        ],

        "networkmanager/firewall": [
            "networkmanager/firewall.jsx"
        ],

        "playground/exception": [
            "playground/exception.js",
        ],
        "playground/jquery-patterns": [
            "playground/jquery-patterns.js",
        ],
        "playground/metrics": [
            "playground/metrics.js",
        ],
        "playground/pkgs": [
            "playground/pkgs.js",
        ],
        "playground/plot": [
            "playground/plot.js",
        ],
        "playground/react-patterns": [
            "playground/react-patterns",
        ],
        "playground/service": [
            "playground/service",
        ],
        "playground/speed": [
            "playground/speed",
        ],
        "playground/test": [
            "playground/test",
        ],
        "playground/translate": [
            "playground/translate",
        ],

        "realmd/domain": [
            "realmd/operation.js",
        ],

        "selinux/selinux": [
            "selinux/setroubleshoot.js",
            "selinux/setroubleshoot.css",
        ],

        "shell/index": [
            "shell/index.js",
            "shell/shell.less",
        ],
        "shell/index-no-machines": [
            "shell/index-no-machines.js",
        ],

        "sosreport/sosreport": [
            "sosreport/index.js",
            "sosreport/sosreport.css",
        ],

        "storaged/storage": [
            "storaged/devices.jsx"
        ],

        "systemd/services": [
            "systemd/init.js",
            "systemd/services.css",
        ],
        "systemd/logs": [
            "systemd/logs.js",
        ],
        "systemd/system": [
            "systemd/host.js",
            "systemd/host.css",
        ],
        "systemd/terminal": [
            "systemd/terminal.jsx",
            "systemd/terminal.css",
        ],
        "systemd/hwinfo": [
            "systemd/hwinfo.jsx",
            "systemd/hwinfo.css",
        ],

        "tuned/performance": [
            "tuned/dialog.js",
        ],

        "packagekit/updates": [
            "packagekit/updates.jsx",
            "packagekit/updates.less",
        ],

        "users/users": [
            "users/local.js",
            "users/users.css",
        ]
    },

    tests: [
        "docker/test-docker",

        "kdump/test-config-client",

        "lib/test-dummy",
        "lib/test-journal-renderer",
        "lib/test-machines",
        "lib/test-patterns",

        "networkmanager/test-utils",

        "storaged/test-util",

        "machines/test-machines",
    ],

    files: [
        "apps/index.html",
        "apps/default.png",

        "dashboard/index.html",

        "docker/console.html",
        "docker/index.html",
        "docker/images/drive-harddisk-symbolic.svg",

        "kdump/index.html",

        "machines/index.html",

        "networkmanager/index.html",
        "networkmanager/firewall.html",
        "networkmanager/manifest.json",

        "packagekit/index.html",

        "playground/exception.html",
        "playground/hammer.gif",
        "playground/jquery-patterns.html",
        "playground/metrics.html",
        "playground/pkgs.html",
        "playground/plot.html",
        "playground/react-patterns.html",
        "playground/service.html",
        "playground/speed.html",
        "playground/test.html",
        "playground/translate.html",

        "selinux/setroubleshoot.html",

        "shell/images/server-error.png",
        "shell/images/server-large.png",
        "shell/images/server-small.png",
        "shell/index.html",
        "shell/simple.html",
        "shell/shell.html",

        "sosreport/index.html",
        "sosreport/sosreport.png",

        "storaged/index.html",
        "storaged/images/storage-array.png",
        "storaged/images/storage-disk.png",

        "subscriptions/index.html",

        "systemd/index.html",
        "systemd/logs.html",
        "systemd/services.html",
        "systemd/terminal.html",
        "systemd/hwinfo.html",

        "users/index.html",
    ]
};

var externals = {
    "cockpit": "cockpit",
    "jquery": "jQuery",
};

/* ---------------------------------------------------------------------
 * Implementation
 */

var webpack = require("webpack");
var copy = require("copy-webpack-plugin");
var html = require('html-webpack-plugin');
var extract = require("extract-text-webpack-plugin");
var extend = require("extend");
var path = require("path");
var fs = require("fs");

/* These can be overridden, typically from the Makefile.am */
var srcdir = process.env.SRCDIR || __dirname;
var builddir = process.env.BUILDDIR || __dirname;
var distdir = builddir + path.sep + "dist";
var libdir = path.resolve(srcdir, "pkg" + path.sep + "lib");
var nodedir = path.resolve(srcdir, "node_modules");
var section = process.env.ONLYDIR || null;

/* A standard nodejs and webpack pattern */
var production = process.env.NODE_ENV === 'production';

/*
 * Note that we're avoiding the use of path.join as webpack and nodejs
 * want relative paths that start with ./ explicitly.
 *
 * In addition we mimic the VPATH style functionality of GNU Makefile
 * where we first check builddir, and then srcdir. In order to avoid
 * people having to run ./configure to hack on Cockpit we also help
 * resolve files that have a '.in' suffix if the resulting file
 * doesn't exist.
 */

function vpath(/* ... */) {
    var filename = Array.prototype.join.call(arguments, path.sep);
    var expanded = builddir + path.sep + filename;
    if (fs.existsSync(expanded))
        return expanded;
    expanded = srcdir + path.sep + filename;
    if (!fs.existsSync(expanded) && fs.existsSync(expanded + ".in"))
        return expanded + ".in";
    return expanded;
}

/* Qualify all the paths in entries */
Object.keys(info.entries).forEach(function(key) {
    if (section && key.indexOf(section) !== 0) {
        delete info.entries[key];
        return;
    }

    info.entries[key] = info.entries[key].map(function(value) {
        if (value.indexOf("/") === -1)
            return value;
        else
            return vpath("pkg", value);
    });
});

/* Qualify all the paths in files listed */
var files = [];
info.files.forEach(function(value) {
    if (!section || value.indexOf(section) === 0)
        files.push({ from: vpath("pkg", value), to: value });
});
info.files = files;

var plugins = [
    new copy(info.files),
    new extract("[name].css"),
];

var output = {
    path: distdir,
    filename: "[name].js",
    sourceMapFilename: "[file].map",
};

/* Only minimize when in production mode */
if (production) {
    /* Rename output files when minimizing */
    output.filename = "[name].min.js";
}

/* Fill in the tests properly */
info.tests.forEach(function(test) {
    var ext = production ? ".min.js" : ".js";
    if (!section || test.indexOf(section) === 0) {
        info.entries[test] = vpath("pkg", test + ".js");
        plugins.push(new html({
            title: path.basename(test),
            filename: test + ".html",
            template: libdir + path.sep + "qunit-template.html",
            builddir: test.split("/").map(function() { return "../" }).join(""),
            script: path.basename(test + ext),
            inject: false,
        }));
    }
});

var aliases = {
    "d3": "d3/d3.js",
    "moment": "moment/moment.js",
    "term": "term.js-cockpit/src/term.js"
};

/* HACK: To get around redux warning about reminimizing code */
if (production)
    aliases["redux/dist/redux"] = "redux/dist/redux.min.js";


var babel_loader = {
    loader: "babel-loader",
    options: {
        presets: [
            ["@babel/env", {
                "targets": {
                    "chrome": "57",
                    "firefox": "52",
                    "safari": "10.3",
                    "edge": "16",
                    "opera": "44"
                }
            }],
            "@babel/preset-react"
        ]
    }
}

module.exports = {
    mode: production ? 'production' : 'development',
    resolve: {
        alias: aliases,
        modules: [ libdir, nodedir ],
        extensions: ["*", ".js", ".json", ".less"]
    },
    entry: info.entries,
    output: output,
    externals: externals,
    plugins: plugins,

    devtool: "source-map",

    // disable noisy warnings about exceeding the recommended size limit
    performance: {
        maxAssetSize: 20000000,
        maxEntrypointSize: 20000000,
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|es6|jsx)$/,
                exclude: /\/node_modules\/.*\//, // exclude external dependencies
                loader: "eslint-loader"
            },
            {
                test: /\.js$/,
                exclude: /\/node_modules\/.*\//, // exclude external dependencies
                loader: 'strict-loader' // Adds "use strict"
            },
            /* these are called *.js, but are ES6 */
            {
                test: /\/node_modules\/@novnc.*\.js$/,
                use: babel_loader
            },
            {
                test: /\.(js|jsx|es6)$/,
                // exclude external dependencies; it's too slow, and they are already plain JS except the above
                exclude: /\/node_modules\/.*\//,
                use: babel_loader
            },
            {
                test: /\.css$/,
                loader: extract.extract("css-loader?minimize=&root=" + libdir)
            },
            {
                test: /\.less$/,
                loader: extract.extract("css-loader?sourceMap&minimize=!less-loader?sourceMap&compress=false")
            },
            {
                test: /views\/[^\/]+\.html$/,
                use: [{
                    loader: 'ng-cache-loader',

                    options: {
                        prefix: '[dir]'
                    }
                }]
            },
        ],
    }
};
