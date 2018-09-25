const javascripTypeToJCRTypeMap = {
    "number": "Double",
    "string": "String",
    "boolean": "Boolean"
};

const getJCRTypeForValue = function( value ) {
    if ( typeof value === 'object' ) {
        if ( !Array.isArray( value ) ) {
            if ( value instanceof Date ) {
                return 'Date';
            }

            throw new Error( 'ResourceBuilder - Can not handle generic object values' );
        }
        if ( value[ 0 ] === undefined ) {
            return 'String';
        }

        return getJCRTypeForValue( value[ 0 ] );
    }

    if ( !javascripTypeToJCRTypeMap[ typeof value ] ) {
        throw new Error( 'Unsupported type ' + typeof value );
    }

    return javascripTypeToJCRTypeMap[ typeof value ];
};

const ResourceBuilder = function( name, primaryType ) {
    this.name = name;
    this.primaryType = primaryType;
    const properties = {};
    const children = {};
    const nameSpaces = {
        "jcr": "http://www.jcp.org/jcr/1.0",
        "cq": "http://www.day.com/jcr/cq/1.0"
    };

    this.addNamespace = function( name, url ) {
        nameSpaces[ name ] = url;

        return this;
    };

    this.setProperty = function( name, value, forcedType, forcedIsMultiple ) {
        properties[ name ] = {
            value: value,
            type: forcedType || getJCRTypeForValue( value ),
            isMultiple: forcedIsMultiple === undefined ? Array.isArray( value ) : !!forcedIsMultiple
        };

        return this;
    };

    this.addChild = function( name, primaryTypeOrBuilder ) {
        if ( typeof primaryTypeOrBuilder === 'object' ) {
            children[ name ] = primaryTypeOrBuilder;
        } else {
            children[ name ] = new ResourceBuilder( name, primaryTypeOrBuilder );
        }

        return this;
    };

    this.getChild = function( name ) {
        if ( !children[ name ] ) {
            throw new Error( 'ResourceBuilder - no child named ' + name + ' for ' + this.name );
        }

        return children[ name ];
    };

    this.build = function( isNotRoot ) {
        const builtObject = {};

        if ( !isNotRoot ) {
            builtObject[ 'jcr:root' ] = {};
        }

        const insertionPoint = isNotRoot ? builtObject : builtObject[ 'jcr:root' ];

        insertionPoint[ '@jcr:primaryType' ] = this.primaryType;

        Object.keys( nameSpaces ).forEach( currentNamespace => {
            insertionPoint[ `@xmlns:${currentNamespace}` ] = nameSpaces[ currentNamespace ];
        } );

        Object.keys( properties ).forEach( currentPropertyName => {
            insertionPoint[ `@${currentPropertyName}` ] =
                `${properties[ currentPropertyName ].type !== 'String' ? `{${properties[ currentPropertyName ].type}}` : ''}${properties[ currentPropertyName ].isMultiple ? `[${properties[ currentPropertyName ].value.join( ',' ) }]` : properties[ currentPropertyName ].value}`;
        } );

        Object.keys( children ).forEach( currentChild => {
            insertionPoint[ currentChild ] = children[ currentChild ].build( true );
        } );

        return builtObject;
    };
};

module.exports = ResourceBuilder;
