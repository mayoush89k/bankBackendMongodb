import User from "../models/userModel.js";
import Account from "../models/accountModel.js";
import { randomInt } from "crypto";
import STATUS_CODES from "../constants/statusCodes.js";
import { deleteAllAccountsOfUser } from "./accountController.js";

export const getAllRoutesAndResponds = async (req, res, next) => {
  try {
    // const users = await User.find({})
    // res.send(users)
  } catch (error) {
    next(error);
  }
};

// / - route
// get all users
export const getAllUsers = async (req, res, next) => {
  try {
    // const users = await User.find({});
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

// /users - route
// create new user
export const createNewUser = async (req, res, next) => {
  try {
    // when creating a new user , the bank must have create also his bank account direct.
    const { username, password } = req.body;
    let newUser = await User.create({
      username,
      password,
    });
    const account = await Account.create({
      user: newUser._id,
      accountNumber: randomInt(99999),
      cash: 0,
      credit: 0,
    });
    newUser = await User.findByIdAndUpdate(newUser._id, {
      $set: {
        accounts: [account._id],
      },
    });
    newUser.accounts = [account._id]
    res.status(STATUS_CODES.CREATED).send(newUser);
  } catch (error) {
    next(error);
  }
};

// users/:userId - route
// get user by id
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("No user is not found");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

// users/:userId - route
// delete user by id
export const deleteUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userId);
    await deleteAllAccountsOfUser(req, res, next)
    await User.findByIdAndDelete(req.params.userId)
    res.send(`user with id ${user._id} has been deleted`);
  } catch (error) {
    next(error);
  }
};

// users?filter=name - route
// sort user by name
export const filterNamesOfUsers = async (req, res, next) => {
  try {
    const user = await User.find({}).sort({ username: 1 });
    res.send(user);
  } catch (error) {
    next(error);
  }
};
