import mongodb from "mongodb"

const ObjectId = mongodb.ObjectID

let reviews 

export default class ReviewsDAO{
    static async injectDB(conn){
        if (reviews) {
            return
        }

        try{
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
        }catch(e){
            console.error(`Unable to establish connection handles in userDAO: ${e}`)
        }
    }

    static async addReview(restaurantID, user, review, date){
        try{
            const reviewDoc  = {
                name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantID), 
            }

            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.log(`Unable to post review ${e}`)
            return {error:e}
        }
    }

    static async updateReview(reviewID, userID, text, date){
        try{
            const updateResponse = await reviews.updateOne(
                {user_id: userID, _id: ObjectId(reviewID)},
                {$set : {text: text, date: date}},
            )

            return updateResponse
        } catch(e) {
            console.error(`Unable to update review ${e}`)
            return {error: e}
        }
    }

    static async deleteReview(reviewID, userID){
        try{
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewID),
                user_id: userID,
            })

            return deleteResponse
        } catch(e){
            console.error(`Unable to delete review: ${e}`)
            return {error: e}
        }
    }
}