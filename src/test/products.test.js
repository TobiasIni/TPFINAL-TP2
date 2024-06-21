import generator from './generator.js'
import {expect} from 'chai'

describe('test con faker', ()=> {
    it ('obtener datos con faker', ()=> {
        const data = generator.randomProduct()
        expect(data)
    } )    
})
