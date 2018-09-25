const propertiesFactory = function( options ) {

    return {
        "properties": {
            "comment": {
                "#text": options.comment || ""
            },
            "entry": [
                {
                    "@key": "createdBy",
                    "#text": options.createdBy || "admin"
                },
                {
                    "@key": "name",
                    "#text": options.name || `Package-${Date.now()}`
                },
                {
                    "@key": "buildCount",
                    "#text": options.buildCount || "1"
                },
                {
                    "@key": "version",
                    "#text": options.version || ""
                },
                {
                    "@key": "dependencies"
                },
                {
                    "@key": "packageFormatVersion",
                    "#text": "2"
                },
                {
                    "@key": "description",
                    "#text": options.description || ""
                },
                {
                    "@key": "group",
                    "#text": options.group || "my_packages"
                }
            ]
        }
    };

};

module.exports = propertiesFactory;
