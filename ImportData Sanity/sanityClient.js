"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const client_1 = require("@sanity/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.client = (0, client_1.createClient)({
    projectId: process.env.projectId, // Replace with your Sanity project ID
    dataset: process.env.dataset, // Replace with your dataset name
    apiVersion: '2021-08-31',
    useCdn: true,
    token: process.env.token, // Replace with your Sanity API token
});
