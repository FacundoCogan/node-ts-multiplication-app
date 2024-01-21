import exp from 'constants';
import {ServerApp} from './presentation/server-app';


describe('Test App.ts', () => {

    test('should call Server.run with values', async() => {
        
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock; // Replace ServerApp.run with the mock function
        process.argv=['node', 'app.ts', '-b', '10', '-l', '5', '-s', '-n', 'test-file', '-d', 'test-path'];

        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 10, 
            limit: 5, 
            showTable: true,
            name:'test-file', 
            destination:'test-path'
        });

    })

});