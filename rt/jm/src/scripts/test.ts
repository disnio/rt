class Foo {
    foo = 123;
}
class Bar {
    bar = 123;
}
function doStuff(arg: Foo | Bar) {
    if (arg instanceof Foo) {
        console.log(arg.foo); // ok
    } else {
        // 这个块中，一定是 'Bar'
        console.log(arg.bar); // ok
    }
}
doStuff(new Foo());
doStuff(new Bar());