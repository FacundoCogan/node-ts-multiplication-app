import fs from "fs";

export interface SaveFileUseCase {
    execute: (options:Options) => boolean;
}

export interface Options{
    fileContent: string;
    name?: string;
    destination?: string;
}

export class SaveFile implements SaveFileUseCase{

    constructor(

    ){}

    execute({ fileContent, destination = 'outputs', name = 'table' }: Options):boolean{

        try {
            
            fs.mkdirSync(destination, { recursive: true });
            fs.writeFileSync(`${destination}/${name}.txt`, fileContent);
            return true;
        } catch (error) {
            //console.error(error); //winston
            return false;
        }

    }

}
