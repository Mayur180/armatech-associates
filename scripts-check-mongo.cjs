const { MongoClient } = require("mongodb")
const uri = process.env.MONGODB_URI
const DB_NAME = "crystal_vmm"
const COLLECTION_NAME = "enquiries"
if (!uri) { console.error("MONGODB_URI is not defined"); process.exit(1) }
;(async () => {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 })
  await client.connect()
  const db = client.db(DB_NAME)
  const coll = db.collection(COLLECTION_NAME)
  console.log("ping:", await db.command({ ping: 1 }))
  console.log("count:", await coll.countDocuments())
  const dbs = (await client.db().admin().listDatabases()).databases.map(d => d.name).join(", ")
  console.log("dbs:", dbs)
  await client.close()
})().catch(e => { console.error(e); process.exit(1) })
