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
import { DailyDataPointsDTO } from './daily-data-points-dto';
import { Transaction } from './transaction';
/**
 *
 * @export
 * @interface SummaryStatsDTO
 */
export interface SummaryStatsDTO {
  /**
   *
   * @type {number}
   * @memberof SummaryStatsDTO
   */
  numRules: number;
  /**
   *
   * @type {number}
   * @memberof SummaryStatsDTO
   */
  numAccounts: number;
  /**
   *
   * @type {number}
   * @memberof SummaryStatsDTO
   */
  totalSpend: number;
  /**
   *
   * @type {string}
   * @memberof SummaryStatsDTO
   */
  costliestDate?: string;
  /**
   *
   * @type {Transaction}
   * @memberof SummaryStatsDTO
   */
  largestTransaction?: Transaction;
  /**
   *
   * @type {Array<Transaction>}
   * @memberof SummaryStatsDTO
   */
  transactions: Array<Transaction>;
  /**
   *
   * @type {Array<DailyDataPointsDTO>}
   * @memberof SummaryStatsDTO
   */
  dailyDataPoints: Array<DailyDataPointsDTO>;
}
