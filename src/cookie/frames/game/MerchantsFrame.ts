import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import ExchangeBuyOkMessage from "@/protocol/network/messages/ExchangeBuyOkMessage";
import ExchangeLeaveMessage from "@/protocol/network/messages/ExchangeLeaveMessage";
import ExchangeStartOkHumanVendorMessage from "@/protocol/network/messages/ExchangeStartOkHumanVendorMessage";

export default class MerchantsFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "ExchangeLeaveMessage",
      this.HandleExchangeLeaveMessage,
      this
    );
    Frames.dispatcher.register(
      "ExchangeStartOkHumanVendorMessage",
      this.HandleExchangeStartOkHumanVendorMessage,
      this
    );
    Frames.dispatcher.register(
      "ExchangeBuyOkMessage",
      this.HandleExchangeBuyOkMessage,
      this
    );
  }

  private async HandleExchangeLeaveMessage(
    account: Account,
    message: ExchangeLeaveMessage
  ) {
    account.game.merchants.UpdateExchangeLeaveMessage(message);
  }

  private async HandleExchangeStartOkHumanVendorMessage(
    account: Account,
    message: ExchangeStartOkHumanVendorMessage
  ) {
    account.game.merchants.UpdateExchangeStartOkHumanVendorMessage(message);
  }

  private async HandleExchangeBuyOkMessage(
    account: Account,
    message: ExchangeBuyOkMessage
  ) {
    account.game.merchants.UpdateExchangeBuyOkMessage(message);
  }
}
