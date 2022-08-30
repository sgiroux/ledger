/* tslint:disable */
/* eslint-disable */
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
import { User } from './user';
/**
 * 
 * @export
 * @interface PlaidItem
 */
export interface PlaidItem {
    /**
     * 
     * @type {number}
     * @memberof PlaidItem
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof PlaidItem
     */
    itemId: string;
    /**
     * 
     * @type {string}
     * @memberof PlaidItem
     */
    updateType: string;
    /**
     * 
     * @type {string}
     * @memberof PlaidItem
     */
    accessToken: string;
    /**
     * 
     * @type {string}
     * @memberof PlaidItem
     */
    transactionSyncCursor?: string;
    /**
     * 
     * @type {User}
     * @memberof PlaidItem
     */
    user: User;
    /**
     * 
     * @type {Array<PlaidAccount>}
     * @memberof PlaidItem
     */
    plaidAccounts: Array<PlaidAccount>;
}
