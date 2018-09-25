const Zip = require( 'node-zip' );
const xmlBuilder = require( 'xmlbuilder' );

const ResourceBuilder = require( './resourceBuilder' );
const PackageBuilder = require( './packageBuilder' );
const filterFactory = require( './filterFactory' );
const definitionFactory = require( './definitionFactory' );

module.exports = {

    getPackageBuilder: function() {
        return new PackageBuilder( Zip, xmlBuilder, filterFactory, definitionFactory );
    },
    ResourceBuilder

};
