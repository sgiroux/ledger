"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRuleDTOOperationEnum = exports.UpdateRuleDTOFieldEnum = void 0;
/**
    * @export
    * @enum {string}
    */
var UpdateRuleDTOFieldEnum;
(function (UpdateRuleDTOFieldEnum) {
    UpdateRuleDTOFieldEnum["Name"] = "name";
    UpdateRuleDTOFieldEnum["TransactionId"] = "transactionId";
    UpdateRuleDTOFieldEnum["PaymentChannel"] = "paymentChannel";
})(UpdateRuleDTOFieldEnum = exports.UpdateRuleDTOFieldEnum || (exports.UpdateRuleDTOFieldEnum = {}));
/**
    * @export
    * @enum {string}
    */
var UpdateRuleDTOOperationEnum;
(function (UpdateRuleDTOOperationEnum) {
    UpdateRuleDTOOperationEnum["Contains"] = "contains";
    UpdateRuleDTOOperationEnum["Equals"] = "equals";
})(UpdateRuleDTOOperationEnum = exports.UpdateRuleDTOOperationEnum || (exports.UpdateRuleDTOOperationEnum = {}));
