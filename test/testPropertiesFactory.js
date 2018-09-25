const propertiesFactory = require( '../propertiesFactory' );

describe( 'Properties Factory', () => {

    it( 'Should produce a valid properties object for configuration', () => {

        propertiesFactory( {
            comment: "Comment",
            createdBy: "Created By",
            name: "Name",
            buildCount: "2",
            version: "0.1.0",
            description: "Description",
            group: "Group"
        } )
            .should.match( {
            "properties": {
                "comment": {
                    "#text": "Comment"
                },
                "entry": [
                    {
                        "@key": "createdBy",
                        "#text": "Created By"
                    },
                    {
                        "@key": "name",
                        "#text": "Name"
                    },
                    {
                        "@key": "buildCount",
                        "#text": "2"
                    },
                    {
                        "@key": "version",
                        "#text": "0.1.0"
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
                        "#text": "Description"
                    },
                    {
                        "@key": "group",
                        "#text": "Group"
                    }
                ]
            }
        } );
    } );

} );