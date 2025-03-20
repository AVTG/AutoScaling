"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const express_1 = __importDefault(require("express"));
const totalCPUs = os_1.default.cpus().length;
if (cluster_1.default.isPrimary) {
    cluster_1.default.schedulingPolicy = cluster_1.default.SCHED_RR; // Ensure requests are evenly distributed
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < totalCPUs; i++) {
        cluster_1.default.fork();
        console.log(`Forking cluster number ${i + 1}`);
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log("Starting a new worker");
        cluster_1.default.fork();
    });
}
else {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const PORT = 3000;
    app.get("/sum", (req, res) => {
        let sum = 0;
        let n = req.body.n;
        if (n > 500)
            n = 500;
        for (let i = 0; i < n; i++) {
            sum += i;
        }
        res.send(`Sum is ${sum}`);
        console.log(`Sum is ${sum} on process ${process.pid}`);
    });
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    });
    console.log(`Worker ${process.pid} started`);
}
