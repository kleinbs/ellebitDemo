// this file doesn't work

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const testCompany = await prisma.partner.create({
        data: {
            name: "Test Company"
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })