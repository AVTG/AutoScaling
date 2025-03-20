import cluster from 'cluster' ;
import os from 'os' ;
import express from 'express' ;

const totalCPUs = os.cpus().length;

if(cluster.isPrimary){
    cluster.schedulingPolicy = cluster.SCHED_RR; // Ensure requests are evenly distributed
    console.log(`Primary ${process.pid} is running`);

    for(let i = 0; i < totalCPUs; i++){
        cluster.fork();
        console.log(`Forking cluster number ${i+1}`);
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log("Starting a new worker");
        cluster.fork();
    });
}else{
    const app = express();
    app.use(express.json());
    const PORT = 3000;
    app.get("/sum", (req, res) => {
        let sum = 0;
        let n = req.body.n ;
        if(n > 500) n = 500 ;
        for(let i = 0; i < n; i++){
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