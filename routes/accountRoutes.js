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

// accounts routes
router.get("/", (req,res,next) => {
    req.query["filter"] == "amount"
      ? filterCashAmountBetweenUsers(req, res, next)
      : getAllAccounts(req, res, next);
})

router
  .route("/user/:userId")
  .get(getAllAccountsOfUser)
  .post(createNewAccount)
  .delete(deleteAllAccountsOfUser);

router.route("/:accountId").get(getAccountById).delete(deleteAccount);

// transfer - params are account id
router.route("/transfer/:from/:to/").put(transferBetweenAccounts);

// deposit cash
router.route("/deposit/:accountId").put(depositCashToUser);

// withdraw cash
router.route("/withdraw/:accountId").put(withdrawCashFromUser);

// update credit
router.route("/credit/:accountId").put(updateCreditOnAccount);

export default router;
