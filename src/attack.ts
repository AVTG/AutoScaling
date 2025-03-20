import axios from 'axios';

async function sendRequest(otp: string) {
    let data = JSON.stringify({
        "n": 2000
    });

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/sum',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    try {
        await axios.request(config);
    } catch (e) {

    }

}






async function main() {
    //batching
    for (let i = 100000; i <= 999999; i += 1000) {
        let p = [];
        console.log(i);
        for (let j = 0; j < 1000; j++) {
            p.push(sendRequest((i + j).toString()));
        }
        await Promise.all(p);
    }
}

main();