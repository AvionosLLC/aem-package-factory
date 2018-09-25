const fs = require( 'fs' );

const PackageBuilder = function( Zip, xmlBuilder, filterFactory, definitionFactory, propertiesFactory ) {

    const files = {};
    const filters = [];

    const options = {};

    this.addFile = function( path, resource, intermediateResource ) {

        if ( path.indexOf( '/' ) === 0 ) {
            return this.addFile( path.substr( 1 ), resource, intermediateResource );
        }

        if ( intermediateResource ) {
            let currentPath = '';

            path.split( '/' ).forEach( currentPathPart => {
                currentPath = `${currentPath}${currentPathPart}/`;
                this.addFile( currentPath, intermediateResource );
            } );
        }

        files[ path ] = resource;

        return this;

    };

    this.addFilter = function( filterRoot ) {
        filters.push( filterRoot );
        return this;
    };

    this.setName = function( name ) {
        options.name = name;
        return this;
    };

    this.setDescription = function( description ) {
        options.description = description;
        return this;
    };

    this.setBuildCount = function( buildCount ) {
        options.buildCount = buildCount;
        return this;
    };

    this.setBuiltWith = function( builtWith ) {
        options.builtWith = builtWith;
        return this;
    };

    this.setGroup = function( group ) {
        options.group = group;
        return this;
    };

    this.setVersion = function( version ) {
        options.version = version;
        return this;
    };

    this.setComment = function( comment ) {
        options.comment = comment;
        return this;
    };

    this.setCreatedBy = function( createdBy ) {
        options.createdBy = createdBy;
        return this;
    };

    this.build = function( outputFile ) {

        const createOptions = {
            pretty: true,
            indent: '  ',
            newline: '\n',
            allowEmpty: false,
            spacebeforeslash: ''
        };

        const zip = new Zip();

        Object.keys( files ).forEach( currentFilePath => {
            zip.file( `jcr_root/${currentFilePath}/.content.xml`, xmlBuilder.create( files[ currentFilePath ] ).end( createOptions ) );
        } );

        zip.file( 'META-INF/vault/filter.xml', xmlBuilder.create( filterFactory( filters ) ).end( createOptions ) );
        zip.file( 'META-INF/vault/properties.xml', xmlBuilder.create( propertiesFactory( {
            comment: options.comment,
            createdBy: options.createdBy,
            name: options.name,
            buildCount: options.buildCount,
            version: options.version,
            description: options.description,
            group: options.group
        } ) )
            .dtd( 'http://java.sun.com/dtd/properties.dtd' )
            .end( createOptions ) );
        zip.file( 'META-INF/vault/definition/.content.xml', xmlBuilder.create( definitionFactory( {
            name: options.name,
            description: options.description,
            buildCount: options.buildCount,
            builtWith: options.builtWith,
            group: options.group,
            version: options.version,
            filters: filters
        } ) ).end( createOptions ) );
        zip.file( 'META-INF/vault/config.xml', fs.readFileSync( __dirname + '/templates/config.xml', 'utf-8' ) );

        fs.writeFileSync( outputFile, zip.generate( {
            base64: false,
            compression: "DEFLATE"
        } ), 'binary' );

    };

};

module.exports = PackageBuilder;
