import { Router } from "express";
import {
  createNewUser,
  deleteUser,
  filterNamesOfUsers,
  getAllUsers,
  getUserById,
} from "../controller/userController.js";

const router = Router();

// user Routes
router
  .route("/")
  .get((req, res, next) => {
    req.query['filter'] == "name"
      ? filterNamesOfUsers(req, res, next)
      : getAllUsers(req, res, next);
  })
  .post(createNewUser);
router.route("/:userId").get(getUserById).delete(deleteUser);

router.route("/admin?filter=name").get(filterNamesOfUsers);

export default router;
