import { Router } from "express";
import {
  createNewAccount,
  deleteAccount,
  deleteAllAccountsOfUser,
  depositCashToUser,
  filterCashAmountBetweenUsers,
  getAccountById,
  getAllAccounts,
  getAllAccountsOfUser,
  transferBetweenAccounts,
  updateCreditOnAccount,
  withdrawCashFromUser,
} from "../controller/accountController.js";

const router = Router();

// account routes
router.route("/").get(getAllAccounts);
router
  .route("/user/:userId")
  .get(getAllAccountsOfUser)
  .post(createNewAccount)
  .delete(deleteAllAccountsOfUser);

router.route("/:accountId").get(getAccountById).delete(deleteAccount);

// transfer - params are account id
router.route("/transfer/:from/:to/", transferBetweenAccounts);

// deposit cash
router.route("/:userId/deposit/:accountId", depositCashToUser);

// withdraw cash
router.route("/:userId/withdraw/:accountId", withdrawCashFromUser);

// update credit
router.route("/:userId/credit/:accountId", updateCreditOnAccount);

router.route("/:userId?filter=amount", filterCashAmountBetweenUsers);

export default router;
