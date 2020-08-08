import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import ExchangeBuyMessage from "@/protocol/network/messages/ExchangeBuyMessage";
import ExchangeBuyOkMessage from "@/protocol/network/messages/ExchangeBuyOkMessage";
import ExchangeLeaveMessage from "@/protocol/network/messages/ExchangeLeaveMessage";
import ExchangeOnHumanVendorRequestMessage from "@/protocol/network/messages/ExchangeOnHumanVendorRequestMessage";
import ExchangeStartOkHumanVendorMessage from "@/protocol/network/messages/ExchangeStartOkHumanVendorMessage";
import ObjectItemToSellInHumanVendorShop from "@/protocol/network/types/ObjectItemToSellInHumanVendorShop";
import LiteEvent from "@/utils/LiteEvent";

export default class Merchants {
  public get MerchantOpened() {
    return this.onMerchantOpened.expose();
  }

  public get ObjectBuyed() {
    return this.onObjectBuyed.expose();
  }

  private account: Account;

  private objectInfos: ObjectItemToSellInHumanVendorShop[] = [];

  private onMerchantOpened = new LiteEvent<void>();
  private onObjectBuyed = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
  }

  public open(cellId: number): boolean {
    const merchant = this.account.game.map.merchants.find(
      m => m.cellId === cellId
    );
    if (!merchant) {
      return false;
    }
    this.account.network.sendMessageFree(
      "ExchangeOnHumanVendorRequestMessage",
      {
        humanVendorCell: cellId,
        humanVendorId: merchant.id
      } as ExchangeOnHumanVendorRequestMessage
    );
    return true;
  }

  public objectsInShop() {
    return this.objectInfos;
  }

  public buy(gid: number, qty: number): boolean {
    const item = this.objectInfos.find(o => o.objectGID === gid);
    if (!item) {
      return false;
    }

    qty = qty <= 0 ? item.quantity : qty > item.quantity ? item.quantity : qty;

    this.account.network.sendMessageFree("ExchangeBuyMessage", {
      objectToBuyId: item.objectUID,
      quantity: qty
    } as ExchangeBuyMessage);
    return true;
  }

  public UpdateExchangeLeaveMessage(message: ExchangeLeaveMessage) {
    if (this.account.state !== AccountStates.TALKING) {
      return;
    }
    this.account.state = AccountStates.NONE;
    this.objectInfos = [];
  }

  public UpdateExchangeStartOkHumanVendorMessage(
    message: ExchangeStartOkHumanVendorMessage
  ) {
    this.account.state = AccountStates.TALKING;
    this.objectInfos = message.objectsInfos;
    this.onMerchantOpened.trigger();
  }

  public UpdateExchangeBuyOkMessage(message: ExchangeBuyOkMessage) {
    this.onObjectBuyed.trigger();
  }
}
