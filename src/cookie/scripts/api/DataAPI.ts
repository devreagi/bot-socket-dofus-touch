import Account from "@/account";
import DataManager from "@/protocol/data";
import Items from "@/protocol/data/classes/Items";
import { DataTypes } from "@/protocol/data/DataTypes";

export default class DataAPI {
  constructor(account: Account) {
    //
  }

  public async item(gid: number): Promise<Items> {
    const item = await DataManager.get<Items>(DataTypes.Items, gid);
    return item[0];
  }
}
