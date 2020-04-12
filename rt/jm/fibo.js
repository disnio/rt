var fibo = function(n) {
    return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
};

process.on("message", function(m) {
    console.log("child receive: ", m)
    if ("object" === typeof m && m.type === "fibo") {
        var num = fibo(~~m.num);
        process.send({ type: "fibo", result: num });
    }
});

process.on("SIGHUP", function() {
    process.exit();
});
