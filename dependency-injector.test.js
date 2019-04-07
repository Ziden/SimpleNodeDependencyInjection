var IOC = require('.');

var Container = IOC.Container;
var DependencyBuilder = IOC.DependencyBuilder;

class A {
    constructor() { this.number = 5; }
}

class B {
    constructor(aInstance) { this.aInstance = aInstance; }
}

class C {
    constructor(a, b) { this.abInstance = [a,b]; }
}

describe('Dependency Injector Tests', () => {

    beforeEach(() => {
        Container.wipe();
    });

    test('Test Building ClassTypes with no dependency', () => {

        var aInstance = Container.get(A); 

        expect(aInstance.number == 5)
    });

    test('Test Building ClassTypes with one dependency', () => {

        const builder = new DependencyBuilder();

        builder.whenBuild(B).inject(A);

        var bInstance = Container.get(B); 

        expect(bInstance.aInstance.number == 5)
    });

    test('Test Keeping same reference', () => {

        const builder = new DependencyBuilder();

        builder.whenBuild(B).inject(A);

        var aInstance = Container.get(A);
        var bInstance = Container.get(B); 
        aInstance.number = 123;
        expect(bInstance.aInstance.number == 123)
    });

    test('Test Multiple Injections', () => {

        const builder = new DependencyBuilder();

        builder.whenBuild(B).inject(A);
        builder.whenBuild(C).inject(A, B);

        var cInstance = Container.get(C);

        expect(cInstance.abInstance[0].number == 5)
    });
});