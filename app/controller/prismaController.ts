import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    await prisma.partner.create({
        data: {
            name: "Test Name"
        }
    })

    const all = await prisma.partner.findMany()
    console.log(`all: `, all)
}

export async function findFirst() {
    return prisma.partner.findFirst({
        where: {name: 'Test Name'},
    });

}

export async function retrieveOrderPageDetails(orderId: string) {
    try {
        const order = await prisma.order.findUnique({
            where: {id: orderId}
        })

        if(!order) throw Error("order not found")

        const partner =  await prisma.partner.findUnique({
            where: {id: order.partnerId}
        })

        if(!partner) throw Error("No partner was associated with this order")

        const menus = await prisma.menu.findMany( {
            where: {partnerId: partner.id }
        })

        const menuItems = await prisma.menuItem.findMany({
            where: {
                menuId: {
                    in: menus.map(menu => menu.id)
                }
            }
        })

        const fullMenus = menus.map(menu => {
            const items = menuItems.filter(menuItem => menuItem.menuId === menu.id)
            return {... menu, ...{menuItems: items}}
        })

        return {order, fullMenus, partner}
    } finally {
        await prisma.$disconnect()
    }



}