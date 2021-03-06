import axios from 'axios'
import { MARKET } from '@config'
import i18n from '@/i18n'
import alertEvents from '@/plugins/alert-events'
import dayjs from 'dayjs'
import { keys, min, max } from 'lodash'
import logger from 'electron-log'

class CryptoCompare {
  /**
   * Fetch market data from API.
   * @param {String} token
   * @return {(Object|null)} Return API response data or null on failure
   */
  async fetchMarketData (token) {
    const params = {
      fsyms: token,
      tsyms: keys(MARKET.currencies).join(',')
    }

    try {
      const uri = `https://api.coingecko.com/api/v3/coins/persona`
      const response = await axios.get(uri, { params })
      const data = response.data.market_data ? response.data.market_data : {}
      return this.__transformMarketResponse(data)
    } catch (error) {
      logger.error(error)
      alertEvents.$error(i18n.t('COMMON.FAILED_FETCH', {
        name: i18n.t('MARKET.MARKET'),
        msg: error.message
      }))
    }
  }

  /**
   * Returns the price of the last 24h
   * @param {String} token
   * @param {String} currency
   * @return {(Object|null)} Return API response data or null on failure
   */
  async historicPerDay (token, currency) {
    return this.__fetchHistoricalData(token, currency, 24, 'hour', 'HH:mm')
  }

  /**
   * Returns the price of the last week
   * @param {String} token
   * @param {String} currency
   * @return {(Object|null)} Return API response data or null on failure
   */
  async historicPerWeek (token, currency) {
    return this.__fetchHistoricalData(token, currency, 7, 'day', 'ddd')
  }

  /**
   * Returns the price of the last month
   * @param {String} token
   * @param {String} currency
   * @return {(Object|null)} Return API response data or null on failure
   */
  async historicPerMonth (token, currency) {
    return this.__fetchHistoricalData(token, currency, 30, 'day', 'DD')
  }

  /**
   * Returns the price of the last quarter
   * @param {String} token
   * @param {String} currency
   * @return {(Object|null)} Return API response data or null on failure
   */
  async historicPerQuarter (token, currency) {
    return this.__fetchHistoricalData(token, currency, 120)
  }

  /**
   * Returns the price of the last year
   * @param {String} token
   * @param {String} currency
   * @return {(Object|null)} Return API response data or null on failure
   */
  async historicPerYear (token, currency) {
    return this.__fetchHistoricalData(token, currency, 365)
  }

  /**
   * Returns the price according to the type
   * @param {String} type
   * @param {String} token
   * @param {String} currency
   * @return {(Object|null)} Return API response data or null on failure
   */
  async historicByType (type, token, currency) {
    // TODO_TEMPORARY_DISABLE
    // const method = `historicPer${capitalize(type)}`
    return null
  }

  /**
 * Fetch historical data from API.
 * @param {String} token
 * @param {String} currency
 * @param {Number} limit
 * @param {String} type
 * @param {String} dateFormat
 * @return {(Object|null)} Return API response data or null on failure
 */
  async __fetchHistoricalData (token, currency, limit, type = 'day', dateFormat = 'DD.MM') {
    const date = Math.round(new Date().getTime() / 1000)
    const uri = `${MARKET.source.baseUrl}/data/histo${type}`
    const params = {
      fsym: token,
      tsym: currency,
      toTs: date,
      limit
    }

    try {
      const response = await axios.get(uri, { params })
      return this.__transformHistoricalResponse(response.data.Data, dateFormat)
    } catch (error) {
      logger.error(error)
      alertEvents.$error(i18n.t('COMMON.FAILED_FETCH', {
        name: i18n.t('MARKET.HISTORICAL_DATA'),
        msg: error.message
      }))
    }
  }

  /**
   * Normalize market data reponse to a object
   * @param {Object} response
   * @return {Object}
   */
  __transformMarketResponse (response) {
    const marketData = {}
    marketData.price = response.current_price.btc
    marketData.currency = 'BTC'
    marketData.date = response.last_updated
    marketData.change24h = response.price_change_percentage_24h
    return marketData
  }

  /**
   * Prepare the historical data response to be used in charts
   * @param {Object} response
   * @param {String} dateFormat
   * @return {Object}
   */
  __transformHistoricalResponse (response, dateFormat) {
    const labels = response.map(value => dayjs(value.time * 1000).format(dateFormat))
    const datasets = response.map(value => value.close)

    return {
      labels,
      datasets,
      min: min(datasets),
      max: max(datasets)
    }
  }
}

export default new CryptoCompare()
