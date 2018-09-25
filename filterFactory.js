const filterFactory = function( filters ) {

    return {
        "workspaceFilter": {
            "@version": "1.0",
            "filter": filters.map( currentFilter => {
                return {
                    "@root": currentFilter
                };
            } )
        }
    };

};

module.exports = filterFactory;
