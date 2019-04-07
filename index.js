

var Container = {
    dependencies: {},
    instances: {},

    get: classType => {
        if(!Container.instances[classType]) {
            var instance = Container.build(classType);
            Container.instances[classType] = instance;
            return instance;
        } else {
            return Container.instances[classType];
        }
    },

    build: classType => {
        var dependencies = Container.dependencies[classType] || [];
        if(dependencies.length == 0) {
            return new classType();
        } else {
            var builtDependencies = [];
            dependencies.forEach(dependency => {
                builtDependencies.push(Container.get(dependency));
            });

            var instance = new classType(...builtDependencies);
            return instance;

        }
    },

    wipe: () => { 
        Container.dependencies = {};
        Container.instances = {};
    }
}

class DependencyBuilder {
    whenBuild(type) {
        if(Container.dependencies[type])
            throw `Type ${type.name} already registered`;
        this.type = type;
        return this;
    }
    inject(...types) {
        Container.dependencies[this.type] = Array.isArray(types) ? types : [types];
        this.type = null;
    }
}

module.exports = {
    Container: Container,
    DependencyBuilder: DependencyBuilder,
};