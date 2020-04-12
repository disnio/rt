var express = require("express");
var spawn = require("child_process").spawn;
var app = express();
var spawn_worker = function(n, endcb) {
    var fibo = function(n) {
        return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
    };
    endcb(fibo(n));
};

var spawn_end = function(res) {
    console.log(res);
    process.exit();
};

app.get("/", function(req, res) {
    var n = ~~req.query.n || 1;
    var spawn_cmd =
        "(" +
        spawn_worker.toString() +
        "(" +
        n +
        ", " +
        spawn_end.toString() +
        "))";
    console.log(spawn_cmd);
    var worker = spawn("node", ["-e", spawn_cmd]);
    var fibo_res = "";
    worker.stdout.on("data", function(data) {
        fibo_res += data.toString();
    });

    worker.on("close", function(code) {
        res.send(fibo_res);
    });
});

app.listen(8124);
