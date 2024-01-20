import fs from 'fs';
import { yarg } from './config/plugins/yargs.plugin';

// const message:string= 'Hola Mundo';

// console.log(message);

const limit = yarg.l;
const base = yarg.b;
let outPutMessage = '';
const header = `
==================================
        Tabla del ${base}   
==================================
\n`;

for (let i = 1; i <= limit; i++) {
    outPutMessage += `${base} x ${i} = ${base * i}\n`;
    
}
//Grabar en el archivo la salda
//path: outputs/tabla-5.txt
outPutMessage = header + outPutMessage;

if(yarg.s){
    console.log(outPutMessage);
}

const outputPath = `outputs`;

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-5.txt`, outPutMessage);
console.log('File created!');