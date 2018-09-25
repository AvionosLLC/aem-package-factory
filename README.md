# AEM Package Factory

A module for building simple AEM packages from JSON objects.  Useful 
in cases such as content migration or auto-generated content allowing 
the mechanisms to not clutter the concerns of what is running within AEM.

## Usage

```javascript
const packageFactory = require( 'aem-package-factory' );

packageFactory.PackageBuilder
    .addFile( '/path/to/resource', packageFactory.ResourceBuilder.forPrimaryType( 'resource', 'nt:unstructured' )
        .addProperty( 'name', 'value' )
        .build() )
    .addFilter( '/path/to/resource' )
    .build( './package.zip' );
```

## ResourceBuilder

The ResourceBuilder is used to create a resource definition which is 
later transformed into XML in the context of a package.

_More documentation coming_

## Package Builder

The PackageBuilder orchestrates the package construction based on a 
series of files and configurations.

_More documentation coming_