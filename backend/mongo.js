import mongodb from "mongodb"

const MongoClient = mongodb.MongoClient
let db

function initConnection(){
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
).then(async conn => {
   db = await conn.db('sample_restaurants').collection('restaurants')
})
.catch( err => {
    console.log(err.stack)
    process.exit(1)
})
}
 export {db,initConnection}