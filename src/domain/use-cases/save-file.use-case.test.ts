import fs from 'fs';
import {SaveFile} from './save-file.use-case';

describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'custom content',
        destination: 'custom-outputs/file-destination',
        name: 'custom-table-name'
    }
    
    const customFilePath = `${customOptions.destination}/${customOptions.name}.txt`;

    // beforeEach(() => {
    //     jest.clearAllMocks();
    // });


    afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs');
        if(outputFolderExists) fs.rmSync('outputs', { recursive: true }); //borra la carpeta outputs
                                                  // para que no de un falso true

        const customOutputFolderExists = fs.existsSync(customOptions.destination);
        if(customOutputFolderExists) fs.rmSync(customOptions.destination, { recursive: true }); //borra la carpeta custom outputs
    });

    test('should have file with default values', () => {
    
        const saveFile = new SaveFile();
        const filePath='outputs/table.txt';

        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' }); 
        
        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);

    });

    test('should save file with custom values', () => {

        const saveFile = new SaveFile();

        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf8' });
        
        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent);
    });

    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation( // espianr fs y su metodo mkdirSync
            () => {                                //sobreescribo por la implementacion
                throw new Error('This is a custom error message from testing');
            }
        );

        const result = saveFile.execute(customOptions);

        expect(result).toBe(false);

        mkdirSpy.mockRestore();

    });

    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation( // espianr fs y su metodo mkdirSync
            () => {                                //sobreescribo por la implementacion
                throw new Error('This is a custom writing error message from testing');
            }
         );

        const result = saveFile.execute({fileContent: 'Hola'});

        expect(result).toBe(false);

        writeFileSpy.mockRestore();
    });

});