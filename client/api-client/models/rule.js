"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleOperationEnum = exports.RuleFieldEnum = void 0;
/**
    * @export
    * @enum {string}
    */
var RuleFieldEnum;
(function (RuleFieldEnum) {
    RuleFieldEnum["Name"] = "name";
    RuleFieldEnum["TransactionId"] = "transactionId";
    RuleFieldEnum["PaymentChannel"] = "paymentChannel";
})(RuleFieldEnum = exports.RuleFieldEnum || (exports.RuleFieldEnum = {}));
/**
    * @export
    * @enum {string}
    */
var RuleOperationEnum;
(function (RuleOperationEnum) {
    RuleOperationEnum["Contains"] = "contains";
    RuleOperationEnum["Equals"] = "equals";
})(RuleOperationEnum = exports.RuleOperationEnum || (exports.RuleOperationEnum = {}));
