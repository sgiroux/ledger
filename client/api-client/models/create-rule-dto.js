"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRuleDTOOperationEnum = exports.CreateRuleDTOFieldEnum = void 0;
/**
    * @export
    * @enum {string}
    */
var CreateRuleDTOFieldEnum;
(function (CreateRuleDTOFieldEnum) {
    CreateRuleDTOFieldEnum["Name"] = "name";
    CreateRuleDTOFieldEnum["TransactionId"] = "transactionId";
    CreateRuleDTOFieldEnum["PaymentChannel"] = "paymentChannel";
})(CreateRuleDTOFieldEnum = exports.CreateRuleDTOFieldEnum || (exports.CreateRuleDTOFieldEnum = {}));
/**
    * @export
    * @enum {string}
    */
var CreateRuleDTOOperationEnum;
(function (CreateRuleDTOOperationEnum) {
    CreateRuleDTOOperationEnum["Contains"] = "contains";
    CreateRuleDTOOperationEnum["Equals"] = "equals";
})(CreateRuleDTOOperationEnum = exports.CreateRuleDTOOperationEnum || (exports.CreateRuleDTOOperationEnum = {}));
