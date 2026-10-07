const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI

if (!uri) {
    console.error("MONGODB_URI is missing")
    process.exit(1)
}

const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
})

async function test() {
    try {
        console.log("Connecting directly to MongoDB Atlas...")

        await client.connect()

        console.log("CONNECTED TO MONGODB ATLAS")

        const db = client.db("crystal_vmm")

        const result = await db.command({
            ping: 1,
        })

        console.log("PING RESULT:", result)

        await client.close()

        console.log("MongoDB test completed successfully.")
    } catch (error) {
        console.error("MONGODB DIRECT CONNECTION FAILED")
        console.error(error)
    }
}

test()