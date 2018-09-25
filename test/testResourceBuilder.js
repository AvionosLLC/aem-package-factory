const ResourceBuilder = require( '../resourceBuilder' );
const should = require( 'should' );

describe( 'ResourceBuilder', () => {

    it( 'Should create a simple resource object structure', () => {

        const builder = new ResourceBuilder( 'name', 'primaryType' )
            .build()
            .should.match( {
                'jcr:root': {
                    '@jcr:primaryType': 'primaryType',
                    '@xmlns:jcr': 'http://www.jcp.org/jcr/1.0',
                    '@xmlns:cq': 'http://www.day.com/jcr/cq/1.0'
                }
            } );

    } );

    it( 'Should allow setting of custom properties on an object', () => {

        const builder = new ResourceBuilder( 'name', 'primaryType' )
            .setProperty( 'newProperty', 'newValue' )
            .build()
            .should.match( {
                'jcr:root': {
                    '@jcr:primaryType': 'primaryType',
                    '@xmlns:jcr': 'http://www.jcp.org/jcr/1.0',
                    '@xmlns:cq': 'http://www.day.com/jcr/cq/1.0',
                    '@newProperty': 'newValue'
                }
            } );

    } );

    it( 'Should represent boolean values as booleans', () => {

        const builder = new ResourceBuilder( 'name', 'primaryType' )
            .setProperty( 'newProperty', true )
            .build()
            .should.match( {
                'jcr:root': {
                    '@jcr:primaryType': 'primaryType',
                    '@xmlns:jcr': 'http://www.jcp.org/jcr/1.0',
                    '@xmlns:cq': 'http://www.day.com/jcr/cq/1.0',
                    '@newProperty': '{Boolean}true'
                }
            } );

    } );

    it( 'Should represent numeric values as doubles', () => {

        const builder = new ResourceBuilder( 'name', 'primaryType' )
            .setProperty( 'newProperty', 5.5 )
            .build()
            .should.match( {
                'jcr:root': {
                    '@jcr:primaryType': 'primaryType',
                    '@xmlns:jcr': 'http://www.jcp.org/jcr/1.0',
                    '@xmlns:cq': 'http://www.day.com/jcr/cq/1.0',
                    '@newProperty': '{Double}5.5'
                }
            } );

    } );

    it( 'Should allow overriding of the property type', () => {

        const builder = new ResourceBuilder( 'name', 'primaryType' )
            .setProperty( 'newProperty', 5, 'Long' )
            .build()
            .should.match( {
                'jcr:root': {
                    '@jcr:primaryType': 'primaryType',
                    '@xmlns:jcr': 'http://www.jcp.org/jcr/1.0',
                    '@xmlns:cq': 'http://www.day.com/jcr/cq/1.0',
                    '@newProperty': '{Long}5'
                }
            } );

    } );

    it( 'Should write simple arrays as multi-values', () => {

        const builder = new ResourceBuilder( 'name', 'primaryType' )
            .setProperty( 'newProperty', [ 'a', 'b', 'c' ] )
            .build()
            .should.match( {
                'jcr:root': {
                    '@jcr:primaryType': 'primaryType',
                    '@xmlns:jcr': 'http://www.jcp.org/jcr/1.0',
                    '@xmlns:cq': 'http://www.day.com/jcr/cq/1.0',
                    '@newProperty': '[a,b,c]'
                }
            } );

    } );

    it( 'Should properly represent a boolean array', () => {

        const builder = new ResourceBuilder( 'name', 'primaryType' )
            .setProperty( 'newProperty', [ true, false, true ] )
            .build()
            .should.match( {
                'jcr:root': {
                    '@jcr:primaryType': 'primaryType',
                    '@xmlns:jcr': 'http://www.jcp.org/jcr/1.0',
                    '@xmlns:cq': 'http://www.day.com/jcr/cq/1.0',
                    '@newProperty': '{Boolean}[true,false,true]'
                }
            } );

    } );

    it( 'Should allow indication of whether a property is multivalued', () => {

        const builder = new ResourceBuilder( 'name', 'primaryType' )
            .setProperty( 'newProperty', 'value', null, true )
            .build()
            .should.match( {
                'jcr:root': {
                    '@jcr:primaryType': 'primaryType',
                    '@xmlns:jcr': 'http://www.jcp.org/jcr/1.0',
                    '@xmlns:cq': 'http://www.day.com/jcr/cq/1.0',
                    '@newProperty': '[value]'
                }
            } );

    } );

    it( 'Should allow for the addition of child resources', () => {

        const builder = new ResourceBuilder( 'name', 'primaryType' )
            .addChild( 'child', 'childType' )
            .build()
            .should.match( {
                'jcr:root': {
                    '@jcr:primaryType': 'primaryType',
                    '@xmlns:jcr': 'http://www.jcp.org/jcr/1.0',
                    '@xmlns:cq': 'http://www.day.com/jcr/cq/1.0',
                    'child': {
                        '@jcr:primaryType': 'childType'
                    }
                }
            } );

    } );

    it( 'Should allow a ResourceBuilder to be added as a child resource', () => {

        const builder = new ResourceBuilder( 'name', 'primaryType' )
            .addChild( 'child', new ResourceBuilder( 'child', 'childType' ) )
            .build()
            .should.match( {
                'jcr:root': {
                    '@jcr:primaryType': 'primaryType',
                    '@xmlns:jcr': 'http://www.jcp.org/jcr/1.0',
                    '@xmlns:cq': 'http://www.day.com/jcr/cq/1.0',
                    'child': {
                        '@jcr:primaryType': 'childType'
                    }
                }
            } );

    } );

    it( 'Should respect properties added to a child resource', () => {

        const builder = new ResourceBuilder( 'name', 'primaryType' )
            .addChild( 'child', new ResourceBuilder( 'child', 'childType' )
                .setProperty( 'newProperty', 'value' ) )
            .build()
            .should.match( {
                'jcr:root': {
                    '@jcr:primaryType': 'primaryType',
                    '@xmlns:jcr': 'http://www.jcp.org/jcr/1.0',
                    '@xmlns:cq': 'http://www.day.com/jcr/cq/1.0',
                    'child': {
                        '@jcr:primaryType': 'childType',
                        '@newProperty': 'value'
                    }
                }
            } );

    } );

    it( 'Should allow for the addition of namespaces', () => {

        const builder = new ResourceBuilder( 'name', 'primaryType' )
            .addNamespace( 'ns', 'http://namespace.com/ns/1.0' )
            .build()
            .should.match( {
                'jcr:root': {
                    '@jcr:primaryType': 'primaryType',
                    '@xmlns:jcr': 'http://www.jcp.org/jcr/1.0',
                    '@xmlns:ns' : 'http://namespace.com/ns/1.0',
                    '@xmlns:cq': 'http://www.day.com/jcr/cq/1.0'
                }
            } );

    } );

} );