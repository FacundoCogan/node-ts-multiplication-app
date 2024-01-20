import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
    .option('b', {
         alias: 'base',
         describe: 'Multiplication table base',
         type: 'number',
         demandOption: true
    })
    .option('l', {
        alias: 'limit',
        describe: 'Multiplication table limit',
        type: 'number',
        default: 10,
        demandOption: true
    })
    .option('s', {
        alias: 'show',
        describe: 'Show the multiplication table',
        type: 'boolean',
        default: false
    })
    .option('n', {
        alias: 'name',
        describe: 'File name',
        type:'string',
        default: 'multiplication-table',
    })
    .option('d', {
        alias: 'destination',
        describe: 'File destination',
        type:'string',
        default: 'outputs',
    })
    .check(( argv ) => {
    
        if (argv.b < 1) throw 'Error: base must be greater than 0';

        return true;
    })
    .parseSync()

