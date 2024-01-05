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
router.route("/").get(getAllUsers).post(createNewUser);
router.route("/:userId").get(getUserById).delete(deleteUser);

router.route("/:userId?filter=name", filterNamesOfUsers);

export default router;
