const Zip = require( 'node-zip' );
const xmlBuilder = require( 'xmlbuilder' );

const ResourceBuilder = require( './resourceBuilder' );
const PackageBuilder = require( './packageBuilder' );
const filterFactory = require( './filterFactory' );
const definitionFactory = require( './definitionFactory' );
const propertiesFactory = require( './propertiesFactory' );

module.exports = {

    get PackageBuilder() {
        return new PackageBuilder( Zip, xmlBuilder, filterFactory, definitionFactory, propertiesFactory );
    },
    ResourceBuilder

};
