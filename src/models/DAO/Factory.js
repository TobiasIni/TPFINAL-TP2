import ProductsModelFs from "./products.fs.js";
import ProductsModelMemory from "../products.model.js";

class ModelFactory{

    static get(type){
        //me permite evaluar distintos casos de uso
        switch (type) {
            case 'MEM':
                console.log('Persistiendo en la memoria del servidor!')
                return new ProductsModelMemory();
            case 'FS':
                console.log('Persistiendo en la memoria de Filesystem!')
                return new ProductsModelFs();
            case 'MONGO':
                console.log('Persistiendo en la memoria de MongoDB!')
                return new ProductsModelMongo();
            default:
                console.log('Persistiendo en la memoria default!')
                return new ProductsModelMemory();
                break;
        }
    }

}

export default ModelFactory