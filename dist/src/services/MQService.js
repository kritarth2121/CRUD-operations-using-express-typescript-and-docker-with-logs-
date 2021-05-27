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
exports.publishToQueue = void 0;
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const CONN_URL = 'amqps://fanikcpk:Xc7BemQ50rXN_F85Mr3P7dkdZuSOai7z@puffin.rmq2.cloudamqp.com/fanikcpk';
let ch = null;
callback_api_1.default.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
    });
});
const publishToQueue = (queueName, data) => __awaiter(void 0, void 0, void 0, function* () {
    ch.sendToQueue(queueName, new Buffer(data));
});
exports.publishToQueue = publishToQueue;
process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});
//# sourceMappingURL=MQService.js.map