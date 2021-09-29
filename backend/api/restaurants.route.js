import express from "express";
import RestaurantsCntrl from "./restaurants.controller.js";
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router();

router.route("/").get(RestaurantsCntrl.apiGetRestaurants)
router.route("/id/:id").get(RestaurantsCntrl.apiGetRestaurantById)
router.route("/cuisines").get(RestaurantsCntrl.apiGetRestaurantByCuisines)


router.
    route("/review")
    .post("ReviewsCtrl.apiPostReview")
    .put("ReviewsCtrl.apiPutReview")
    .delete("ReviewsCtrl.apiDeleteReview")


export default router;
