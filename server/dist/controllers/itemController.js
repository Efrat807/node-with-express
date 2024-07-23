"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateUser = exports.getItemById = exports.getAllItems = exports.createItem = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
// let items: Item[] = [{ id: 1, name: 'item1' }];
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { name, level } = req.body;
        const newUser = new userModel_1.default(req.body);
        const savedUser = yield newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(500).send(error + ': Server Error');
    }
});
exports.createItem = createItem;
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(userModel_1.default);
        const users1 = yield userModel_1.default.find();
        // console.log(users1, ' usersssssss');
        res.json(users1);
    }
    catch (error) {
        res.status(500).send(error + ': Server Error');
    }
});
exports.getAllItems = getAllItems;
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.params.id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).send('user not found');
    }
});
exports.getItemById = getItemById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (yield userModel_1.default.findById(req.params.id));
    if (!user)
        res.status(404).send('user not found');
    else {
        const updatedUser = yield userModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    }
});
exports.updateUser = updateUser;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('fgsdfgs', req.params.id);
    try {
        const user = (yield userModel_1.default.findByIdAndDelete(req.params.id, { new: true }));
        console.log(user, ' - - user - - -');
        if (user)
            res.status(204).send();
        else
            res.status(404).send('user not found');
    }
    catch (error) {
        res.status(500).send('server error');
    }
});
exports.deleteItem = deleteItem;
