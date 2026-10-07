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
        console.log("Connecting to MongoDB...")

        await client.connect()

        console.log("MongoDB connection successful!")

        const db = client.db("crystal_vmm")

        await db.command({
            ping: 1,
        })

        console.log("MongoDB ping successful!")

        await client.close()

        console.log("Connection closed.")
    } catch (error) {
        console.error("MongoDB connection FAILED:")
        console.error(error)
    }
}

test()