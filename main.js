var http = require('http');
var express = require("express");
var RED = require("./node-red");

// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/",express.static("SB-Admin/dist"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    userDir:"./userdir/",

    functionGlobalContext: { },    // enables global context
    editorTheme: {
        header: {
            title: "",
            image: null
        },
        menu: {
            "menu-item-keyboard-shortcuts": false,
            "menu-item-node-red-version": false,
            "menu-item-help": false
        },
        projects: {
            // To enable the Projects feature, set this value to true
            enabled: false
        }
    }
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

const PORT = 8000;

// Start the runtime
RED.start().then(() => {
    server.listen(PORT, () => {
        console.log(`\n\nApp running at: http://localhost:${PORT}\n\n`);
    });
});
