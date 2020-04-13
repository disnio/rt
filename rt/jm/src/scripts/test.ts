interface Foo {
    foo: number;
    common: string;
}
interface Bar {
    bar: number;
    common: string;
}

function isFoo(arg: Foo): arg is Foo {
    return arg.foo !== undefined;
}