# AEM Package Factory

A module for building simple AEM packages from JSON objects.  Useful 
in cases such as content migration or auto-generated content allowing 
the mechanisms to not clutter the concerns of what is running within AEM.

## Usage

```javascript
const packageFactory = require( 'aem-package-factory' );


```


## ResourceBuilder

The ResourceBuilder is used to create a resource definition which is 
later transformed into XML in the context of a package.