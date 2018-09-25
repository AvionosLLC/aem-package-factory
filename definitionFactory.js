const definitionFactory = function( options ) {

    const definition = {
        "jcr:root": {
            "@xmlns:vlt": "http://www.day.com/jcr/vault/1.0",
            "@xmlns:jcr": "http://www.jcp.org/jcr/1.0",
            "@xmlns:nt": "http://www.jcp.org/jcr/nt/1.0",
            "@jcr:primaryType": "vlt:PackageDefinition",
            "@jcr:description": options.description || "",
            "@buildCount": options.buildCount || "1",
            "@builtWith": options.builtWith || "AEM Package Factory",
            "@group": options.group || "my_packages",
            "@name": options.name || `Package-${Date.now()}`,
            "@version": options.version || "",
            "filter": {
                "@jcr:primaryType": "nt:unstructured"
            }
        }
    };

    ( options.filters || [] ).forEach( ( currentFilter, i ) => {

        definition[ 'jcr:root' ][ 'filter' ][ `f${i}` ] = {
            "@jcr:primaryType": "nt:unstructured",
            "@mode": "replace",
            "@root": currentFilter,
            "@rules": "[]"
        };

    } );

    return definition;

};

module.exports = definitionFactory;
