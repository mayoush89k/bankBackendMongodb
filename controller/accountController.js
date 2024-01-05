import User from "../models/userModel.js";
import Account from "../models/accountModel.js";
import STATUS_CODES from "../constants/statusCodes.js";

console.log("account");

// get special account
// /accounts/:accountId
export const getAccountById = async (req, res, next) => {
  try {
    const account = await Account.findById(req.params.accountId);
    if (!account) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("Account is not find");
    }
    res.send(account);
  } catch (error) {
    next(error);
  }
};

// get all accounts
// "/accounts/"
export const getAllAccounts = async (req, res, next) => {
  try {
    const accounts = await Account.find({});
    res.send(accounts);
  } catch (error) {
    next(error);
  }
};

// create a new account for special user
// accounts/user/:userId/
export const createNewAccount = async (req, res, next) => {
  try {
    const account = await Account.create({
      ...req.body,
      user: req.params.userId,
    });
    const user = await User.findByIdAndUpdate(req.params.userId , {$push:{accounts: account._id}})
    res.status(STATUS_CODES.CREATED).send(account);
  } catch (error) {
    next(error);
  }
};

// get all accounts that this user by userId has
// accounts/user/:userId/
export const getAllAccountsOfUser = async (req, res, next) => {
  try {
    const accounts = await Account.find({ user: req.params.userId });
    res.send(accounts);
  } catch (error) {
    next(error);
  }
};

// delete all the account that this user by userId has
// accounts/user/:userId/
export const deleteAllAccountsOfUser = async (req, res, next) => {
  try {
    const accounts = await Account.deleteMany({ user: req.params.userId });
    console.log("accounts: ", accounts);
    const userOfAccount = await User.findByIdAndUpdate(req.params.userId, {
      accounts: [],
    });
    res.send(userOfAccount);
  } catch (error) {
    next(error);
  }
};

// delete special account
// /accounts/:accountId
export const deleteAccount = async (req, res, next) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.accountId);
    if (!account) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("Account is not found");
    }
    const user = await User.findByIdAndUpdate(account.user, {
      $pull: { accounts: account._id },
    });
    console.log("user: ", user);
    res.send(account);
  } catch (error) {
    next(error);
  }
};

// transfer - params are account id
// "accounts/transfer/:from/:to/"
export const transferBetweenAccounts = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// deposit cash
// accounts/:userId/deposit/:accountId
export const depositCashToUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// withdraw cash
// accounts/:userId/withdraw/:accountId
export const withdrawCashFromUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// update credit
// accounts/:userId/credit/:accountId
export const updateCreditOnAccount = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// sort users by account ballance amount
// accounts/:userId?filter=amount
export const filterCashAmountBetweenUsers = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
