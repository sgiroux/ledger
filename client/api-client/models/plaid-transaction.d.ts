/**
 * Vault API
 * Vault API
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { PlaidAccount } from './plaid-account';
/**
 *
 * @export
 * @interface PlaidTransaction
 */
export interface PlaidTransaction {
    /**
     *
     * @type {string}
     * @memberof PlaidTransaction
     */
    paymentChannel: PlaidTransactionPaymentChannelEnum;
    /**
     *
     * @type {number}
     * @memberof PlaidTransaction
     */
    id: number;
    /**
     *
     * @type {string}
     * @memberof PlaidTransaction
     */
    name: string;
    /**
     *
     * @type {number}
     * @memberof PlaidTransaction
     */
    amount: number;
    /**
     *
     * @type {string}
     * @memberof PlaidTransaction
     */
    isoCurrencyCode: string | null;
    /**
     *
     * @type {string}
     * @memberof PlaidTransaction
     */
    transactionId: string;
    /**
     *
     * @type {string}
     * @memberof PlaidTransaction
     */
    date: string;
    /**
     *
     * @type {string}
     * @memberof PlaidTransaction
     */
    datetime: string | null;
    /**
     *
     * @type {boolean}
     * @memberof PlaidTransaction
     */
    pending: boolean;
    /**
     *
     * @type {string}
     * @memberof PlaidTransaction
     */
    categoryId: string | null;
    /**
     *
     * @type {Array<string>}
     * @memberof PlaidTransaction
     */
    category: Array<string> | null;
    /**
     *
     * @type {string}
     * @memberof PlaidTransaction
     */
    merchantName: string | null;
    /**
     *
     * @type {PlaidAccount}
     * @memberof PlaidTransaction
     */
    plaidAccount: PlaidAccount;
}
/**
    * @export
    * @enum {string}
    */
export declare enum PlaidTransactionPaymentChannelEnum {
    Online = "online",
    InStore = "in store",
    Other = "other"
}
