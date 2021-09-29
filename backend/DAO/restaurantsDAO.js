let restaurants; // reference to DB
import { ObjectId } from "bson";
import { db } from "../mongo.js";
let restaurants

export default class RestaurantsDAO {
  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query = {};
    if (filters) {
      //console.log("There are filters");

      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }

    let cursor;
    //console.log("db", db);
    try {
      console.log("query", query);
      cursor = await db.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
    //console.log(cursor);

    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants = await db.countDocuments(query);

      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documetns, ${e}`
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }

  static async getRestaurantByIB(id){
    try{
      const pipeline = [
        {
          $match:{
            _id: new ObjectId(id),
          },
        },
        {
          $lookup:{
            from:"reviews",
            let:{
              id:"$_id",
            },
            pipeline:[{
              $match:{
                $expr:{
                  $eq:["$restaurant_id", "$id"]
                }
              }
            }]
          }
        }
      ]
    }
  }
}
