import GameRolePlayMerchantInformations from "@/protocol/network/types/GameRolePlayMerchantInformations";
import GameRolePlayMerchantWithGuildInformations from "@/protocol/network/types/GameRolePlayMerchantWithGuildInformations";

export default class MerchantEntry {
  public id: number = 0;
  public name: string = "";
  public cellId: number = 0;

  constructor(
    infos:
      | GameRolePlayMerchantInformations
      | GameRolePlayMerchantWithGuildInformations
  ) {
    this.id = infos.contextualId;
    this.name = infos.name;
    this.cellId = infos.disposition.cellId;
  }
}
