import {faker} from '@faker-js/faker'

const randomProduct = () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    currency: "U$D",
    price: faker.commerce.price(),
    stock: faker.number.int({min: 1 , max:50})
})

export default {
    randomProduct
}