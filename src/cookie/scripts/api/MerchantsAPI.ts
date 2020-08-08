import Account from "@/account";
import MerchantBuyAction from "../actions/merchants/MerchantBuyAction";
import OpenMerchantAction from "../actions/merchants/OpenMerchantAction";

export default class MerchantsAPI {
  private account: Account;
  constructor(account: Account) {
    this.account = account;
  }

  public async open(cellId: number) {
    await this.account.scripts.actionsManager.enqueueAction(
      new OpenMerchantAction(cellId),
      true
    );
    return true;
  }

  public async buy(gid: number, qty: number) {
    await this.account.scripts.actionsManager.enqueueAction(
      new MerchantBuyAction(gid, qty),
      true
    );
    return true;
  }

  public objectsInShop() {
    return this.account.game.merchants.objectsInShop();
  }
}
