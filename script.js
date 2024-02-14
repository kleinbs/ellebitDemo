// use this as examples for updating the database. This probably isn't going to do what you want if you just run it

const { PrismaClient } = require('@prisma/client')
const {v4: uuidv4} = require('uuid')

const prisma = new PrismaClient()

// Create a partner (restaurant)
async function main() {

    await prisma.partner.create({
        data: {
            name: "Partner 1"
        }
    })

    const all = await prisma.partner.findMany()
    console.log(`all: `, all)
}

// Create a menu
async function main2() {

    const partner = await prisma.partner.findFirst({
        where: {
            name: "Partner 1"
        }
    })

    await  prisma.menu.create({
        data: {
            name: "Best Menu 2",
            partnerId: partner.id
        }
    })

    const all = await prisma.menu.findMany()
    console.log(`all: `, all)

}

// Add items to the menu
async function main3() {

    const menu = await prisma.menu.findFirst({
        where: {
            name: "Best Menu 2"
        }
    })

    await  prisma.menuItem.create({
        data: {
            name: "food type 4",
            description: "this is good food of type 1",
            menuId: menu.id,
            price: 11.99
        }
    })

    await  prisma.menuItem.create({
        data: {
            name: "food type 5",
            description: "this is good food of type 2",
            menuId: menu.id,
            price: 34.99
        }
    })

    await  prisma.menuItem.create({
        data: {
            name: "food type 6",
            description: "this is good food of type 3",
            menuId: menu.id,
            price: 38.99
        }
    })

    await  prisma.menuItem.create({
        data: {
            name: "food type 7",
            description: "this is good food of type 3",
            menuId: menu.id,
            price: 38.99
        }
    })

    const all = await prisma.menuItem.findMany()
    console.log(`all: `, all)

}

// Create an order
async function main4() {

    // const menu = await prisma.menu.findFirst({
    //     where: {
    //         name: "Best Menu"
    //     }
    // })

    await  prisma.order.create({
        data: {
            id: uuidv4(),
            partnerId: 4,
            contactEmail: "briantest1@mailinator.com",
            contactName: "Brian Klein",
            contactAddressLine1: "444 tester way",
            contactAddressCountry: "US",
            contactAddressCity: "Seattle",
            contactAddressState: "WA",
            contactAddressPostalCode: 99999,
            contactPhone: 8675309,
        }
    })

    const all = await prisma.order.findMany()
    console.log(`all: `, all)

}

main4()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    }).finally(async () => {
        await prisma.$disconnect()
    })


/*main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        main2()
            .catch((e) => {
                console.error(e)
                process.exit(1)
            })
            .finally(async () => {
                main3()
                    .catch((e) => {
                        console.error(e)
                        process.exit(1)
                    })
                    .finally(async () => {
                        await prisma.$disconnect()
                    })
            })

    })*/

// main4()
//     .catch((e) => {
//         console.error(e)
//         process.exit(1)
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })
