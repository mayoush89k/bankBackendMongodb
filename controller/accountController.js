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
      cash: 0,
      credit: 0,
      user: req.params.userId,
    });
    const user = await User.findByIdAndUpdate(req.params.userId, {
      $push: { accounts: account._id },
    });
    res
      .status(STATUS_CODES.CREATED)
      .send(
        `Account of id = ${account._id} has been added to user ${user.username}`
      );
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
    res.send(account);
  } catch (error) {
    next(error);
  }
};

// transfer - params are account id
// "accounts/transfer/:from/:to/"
export const transferBetweenAccounts = async (req, res, next) => {
  try {
    const { from, to } = req.params;
    const { amount } = req.body;

    // find from and to account
    let sender = await Account.findById(from);
    let receiver = await Account.findById(to);

    if (!sender) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("Sender account does not exist");
    }

    if (!receiver) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("Receiver account does not exist");
    }
    if (!amount) {
      res.status(STATUS_CODES.BAD_REQUEST);
      throw new Error("Amount is required");
    }
    if (amount <= 0) {
      res.status(STATUS_CODES.FORBIDDEN);
      throw new Error(
        `Invalid amount ${amount}. It should be greater than zero`
      );
    }

    // check if the sender has enough money
    if (sender.credit < amount) {
      res.status(STATUS_CODES.FORBIDDEN);
      throw new Error("You don't have enough credit");
    }

    sender.credit -= amount;
    sender = await Account.findByIdAndUpdate(from, {
      $set: { credit: sender.credit },
    });

    receiver.credit += amount;
    receiver = await Account.findByIdAndUpdate(to, {
      $set: { credit: receiver.credit },
    });

    res.send(`transfer between ${from} - ${to} has been successful`);
  } catch (error) {
    next(error);
  }
};

// deposit cash
// accounts/deposit/:accountId
export const depositCashToUser = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const { amount } = req.body;
    let account = await Account.findById(accountId);

    if (!account) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("Account does not exist");
    }
    if (!amount) {
      res.status(STATUS_CODES.BAD_REQUEST);
      throw new Error("Amount is required");
    }
    if (amount <= 0) {
      res.status(STATUS_CODES.FORBIDDEN);
      throw new Error(
        `Invalid amount ${amount}. It should be greater than zero`
      );
    }

    account.cash += amount;
    account = await Account.findByIdAndUpdate(accountId, {
      $set: { cash: account.cash },
    });

    res.send(`Success deposit ${amount} to ${accountId}`);
  } catch (error) {
    next(error);
  }
};

// withdraw cash
// accounts/withdraw/:accountId
export const withdrawCashFromUser = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const { amount } = req.body;
    let account = await Account.findById(accountId);

    if (!account) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("Account does not exist");
    }
    if (!amount) {
      res.status(STATUS_CODES.BAD_REQUEST);
      throw new Error("Amount is required");
    }
    if (amount <= 0) {
      res.status(STATUS_CODES.FORBIDDEN);
      throw new Error(
        `Invalid amount ${amount}. It should be greater than zero`
      );
    }

    if (account.cash < amount) {
      res.status(STATUS_CODES.FORBIDDEN);
      throw new Error("You don't have enough cash");
    }

    account.cash -= amount;
    account = await Account.findByIdAndUpdate(accountId, {
      $set: { cash: account.cash },
    });
    res.send(`Success withdraw ${amount} from ${accountId}`);
  } catch (error) {
    next(error);
  }
};

// update credit
// accounts/credit/:accountId
export const updateCreditOnAccount = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const { amount } = req.body;
    let account = await Account.findById(accountId);

    if (!account) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("Account does not exist");
    }
    if (!amount) {
      res.status(STATUS_CODES.BAD_REQUEST);
      throw new Error("Amount is required");
    }
    if (amount <= 0) {
      res.status(STATUS_CODES.FORBIDDEN);
      throw new Error(
        `Invalid amount ${amount}. It should be greater than zero`
      );
    }

    account.credit += amount;
    account = await Account.findByIdAndUpdate(accountId, {
      $set: { credit: account.credit },
    });
    res.send(`Success updating ${amount} to credit - ${accountId}`);
  } catch (error) {
    next(error);
  }
};

// sort users by account ballance amount
// accounts/admin?filter=amount
export const filterCashAmountBetweenUsers = async (req, res, next) => {
  try {
    const accounts = await Account.find({}).sort({ cash: 1, credit: 1 });
    console.log(accounts);
    res.send(accounts);
  } catch (error) {
    next(error);
  }
};
