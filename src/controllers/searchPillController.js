const { spawn } = require('child_process');

const searchPillController = {
    searchSeq: (req, res) => {
        const pillName = req.params.pillName;
        const python = spawn('python', ['C:/Users/82104/Node_lecture/medication-alarm/src/controllers/python/searchSeq.py', pillName]); // 스크립트 경로 수정
        let dataBuffer = Buffer.from('');

        python.stdout.on('data', (data) => {
            dataBuffer = Buffer.concat([dataBuffer, data]);
        });

        python.stderr.on('data', (data) => {
            console.error(`파이썬 스크립트의 표준 에러: ${data}`);
        });

        python.on('close', (code) => {
            if (code === 0) {
                console.log(`파이썬 스크립트 실행이 완료되었습니다.`);
                const result = dataBuffer.toString('utf-8');
                res.send(result);
            } else {
                console.error(`파이썬 스크립트 종료 코드: ${code}`);
                res.status(500).send('서버에서 오류가 발생했습니다.');
            }
        });
    },
    
    searchPill: (req, res) => {
        const pillSeq = req.params.pillSeq;
        const python = spawn('python', ['C:/Users/82104/Node_lecture/medication-alarm/src/controllers/python/searchPill.py', pillSeq]); // 스크립트 경로 수정
        let dataBuffer = Buffer.from('');

        python.stdout.on('data', (data) => {
            dataBuffer = Buffer.concat([dataBuffer, data]);
        });

        python.stderr.on('data', (data) => {
            console.error(`파이썬 스크립트의 표준 에러: ${data}`);
        });

        python.on('close', (code) => {
            if (code === 0) {
                console.log(`파이썬 스크립트 실행이 완료되었습니다.`);
                const result = dataBuffer.toString('utf-8');
                res.send(result);
            } else {
                console.error(`파이썬 스크립트 종료 코드: ${code}`);
                res.status(500).send('서버에서 오류가 발생했습니다.');
            }
        });
    }
};

module.exports = searchPillController;
