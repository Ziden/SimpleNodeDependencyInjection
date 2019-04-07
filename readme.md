# Simple Dependency Injector

A very simplistic dependency injector for NodeJS servers.

# How to use

`npm install simple-dependency-injector`

Then in your code, lets say you have 3 nested classes.

```javascript
class ClassA {
    constructor() { this.number = 5; }
}

class ClassB {
    constructor(aInstance) { this.aInstance = aInstance; }
}

class ClassC {
    constructor(a, b) { this.aInstance = a; bInstance = b; }
}
```

To configure and use the dependency injection:

```javascript
var dependencyInjection = require('simple-dependency-injection');

var builder = new dependencyInjection.DependencyBuilder();

builder.whenBuild(ClassB).inject(ClassA);
builder.whenBuild(ClassC).inject(ClassA, ClassB);

var cInstance = Container.get(ClassC);

cInstance.aInstance.number == 5; // true

```
 


