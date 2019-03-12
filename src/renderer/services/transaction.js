import { TRANSACTION_TYPES } from '@config'
import { crypto } from '@arkecosystem/crypto'

export default class TransactionService {
  /*
   * Get id for transaction.
   * @param {Object} transaction
   * @return {String}
   */
  static getId (transaction) {
    return crypto.getId(transaction)
  }

  /*
   * Get bytes for transaction.
   * @param {Object} transaction
   * @return {String}
   */
  static getBytes (transaction) {
    return crypto.getBytes(transaction, true, true).toString('hex')
  }

  /*
   * Get bytes for transaction.
   * @param {Object} wallet
   * @param {Transaction} transactionObject
   * @param {Object} vm
   * @return {Object}
   */
  static async ledgerSign (wallet, transactionObject, vm) {
    transactionObject.senderPublicKey(wallet.publicKey)
    if (transactionObject.data.type === TRANSACTION_TYPES.VOTE) {
      transactionObject.data.recipientId = wallet.address
    }
    transactionObject.data.signature = await vm.$store.dispatch('ledger/signTransaction', {
      transactionHex: this.getBytes(transactionObject.data).toString('hex'),
      accountIndex: wallet.ledgerIndex
    })
    if (!transactionObject.data.signature) {
      throw new Error(vm.$t('TRANSACTION.LEDGER_USER_DECLINED'))
    }
    let transaction = transactionObject.getStruct()
    transaction.recipientId = transactionObject.data.recipientId
    transaction.id = this.getId(transaction)

    return transaction
  }
}
