const filterFactory = require( '../filterFactory' );

describe( 'Filter Factory', () => {

    it( 'Should produce a valid filter object for configuration', () => {

        filterFactory( [ '/a', '/b' ] )
            .should.match( {
                "workspaceFilter": {
                    "@version": "1.0",
                    "filter": [
                        {
                            "@root": "/a"
                        },
                        {
                            "@root": "/b"
                        }
                    ]
                }
        } );

    } );

} );