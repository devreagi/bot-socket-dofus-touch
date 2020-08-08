import Account from "@/account";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";

export default class OpenMerchantAction extends ScriptAction {
  public _name: string = "OpenMerchantAction";

  public cellId: number;

  constructor(cellId: number) {
    super();
    this.cellId = cellId;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.merchants.open(this.cellId)) {
      return ScriptAction.processingResult();
    }

    account.logger.logWarning("Merchants", "No merchants on this cell");
    return ScriptAction.failedResult();
  }
}
