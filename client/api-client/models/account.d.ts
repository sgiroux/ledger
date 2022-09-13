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
import { Item } from './item';
import { Transaction } from './transaction';
/**
 *
 * @export
 * @interface Account
 */
export interface Account {
  /**
   *
   * @type {number}
   * @memberof Account
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof Account
   */
  accountId: string;
  /**
   *
   * @type {string}
   * @memberof Account
   */
  mask: string | null;
  /**
   *
   * @type {string}
   * @memberof Account
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof Account
   */
  officialName: string | null;
  /**
   *
   * @type {string}
   * @memberof Account
   */
  subtype: string | null;
  /**
   *
   * @type {string}
   * @memberof Account
   */
  type: string;
  /**
   *
   * @type {Item}
   * @memberof Account
   */
  item: Item;
  /**
   *
   * @type {Array<Transaction>}
   * @memberof Account
   */
  transactions: Array<Transaction>;
}
