const PackageBuilder = require( '../packageBuilder' );
const ResourceBuilder = require( '../resourceBuilder' );
const should = require( 'should' );
const sinon = require( 'sinon' );
require( 'should-sinon' );

const filterFactory = require( '../filterFactory' );
const definitionFactory = require( '../definitionFactory' );
const propertiesFactory = require( '../propertiesFactory' );



describe( 'Package Builder', () => {

    let Zip;
    let xmlBuilder;
    let spiedFilterFactory;
    let spiedDefinitionFactory;
    let spiedPropertiesFactory;

    let packageBuilder;

    beforeEach( function() {

        Zip = require( 'node-zip' );
        xmlBuilder = require( 'xmlbuilder' );
        spiedFilterFactory = sinon.spy( filterFactory );
        spiedDefinitionFactory = sinon.spy( definitionFactory );
        spiedPropertiesFactory = sinon.spy( propertiesFactory );

        packageBuilder = new PackageBuilder( Zip, xmlBuilder, spiedFilterFactory, spiedDefinitionFactory, spiedPropertiesFactory );

    } );

    it( 'Should create a valid package for a valid package definition', () => {

        packageBuilder.addFilter( '/tmp/avionos/value' )
            .setName( 'Package Name' )
            .setDescription( 'Package Description' )
            .setBuildCount( '2' )
            .setBuiltWith( 'Package Built With' )
            .setGroup( 'Package Group' )
            .setVersion( '2' )
            .setComment( 'Package Comment' )
            .setCreatedBy( 'Package Created By')
            .addFile( '/tmp/avionos/value', ( new ResourceBuilder( 'a', 'nt:unstructured' ) ).setProperty( 'a', 'A' ).build() )
            .build( './testPackage.zip' );

        // TODO: Actually inspect the package content in the test instead of relying on manual inspection
    } );
} );