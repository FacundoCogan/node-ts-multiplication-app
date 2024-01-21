//import {yarg} from './yargs.plugin';

const runCommand = async(args: string[]) => {

    process.argv = [...process.argv, ...args]; //permite modificar argv

    const { yarg } = await import('./yargs.plugin');

    return yarg;

}



describe('Test yargs.plugin.ts', () => {
    const originalArgV = process.argv;
    
    beforeEach(() => {
        process.argv = originalArgV;
        jest.resetModules();
    });
    
    test('should return default values', async() => {

        const argv = await runCommand(['-b', '5']);
        
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs'
        }));
        
    });

    test('should return configuration with custom values', async() => {

        const argv = await runCommand(['-b', '5', '-l', '10', '-s', '-n','multiplication-table', '-d', 'outputs']);
        
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: true,
            n:'multiplication-table',
            d: 'outputs'
        }));
        

    });

});
