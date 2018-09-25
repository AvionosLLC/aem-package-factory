const definitionFactory = require( '../definitionFactory' );

describe( 'Definition Factory', () => {

    it( 'Should produce a valid definition object for configuration', () => {

        definitionFactory( {
            description: "Description",
            buildCount: "2",
            builtWith: "Built With",
            group: "Group",
            name: "Name",
            version: "1",
            filters: [
                "/a",
                "/b"
            ]

        } )
            .should.match( {
            "jcr:root": {
                "@xmlns:vlt": "http://www.day.com/jcr/vault/1.0",
                "@xmlns:jcr": "http://www.jcp.org/jcr/1.0",
                "@xmlns:nt": "http://www.jcp.org/jcr/nt/1.0",
                "@jcr:primaryType": "vlt:PackageDefinition",
                "@jcr:description": "Description",
                "@buildCount": "2",
                "@builtWith": "Built With",
                "@group": "Group",
                "@name": "Name",
                "@version": "1",
                "filter": {
                    "@jcr:primaryType": "nt:unstructured",
                    "f0": {
                        "@jcr:primaryType": "nt:unstructured",
                        "@mode": "replace",
                        "@root": "/a",
                        "@rules": "[]"
                    },
                    "f1": {
                        "@jcr:primaryType": "nt:unstructured",
                        "@mode": "replace",
                        "@root": "/b",
                        "@rules": "[]"
                    }
                }
            }
        } );
    } );


} );