import Message from "@/protocol/network/messages/Message";
import QuestActiveInformations from "@/protocol/network/types/QuestActiveInformations";
import QuestActiveDetailedInformations from "../types/QuestActiveDetailedInformations";

export default class QuestListMessage extends Message {
  public finishedQuestsIds: number[];
  public finishedQuestsCounts: number[];
  public activeQuests: Array<
    QuestActiveInformations | QuestActiveDetailedInformations
  >;

  constructor(
    finishedQuestsIds: number[],
    finishedQuestsCounts: number[],
    activeQuests: Array<
      QuestActiveInformations | QuestActiveDetailedInformations
    >
  ) {
    super();
    this.finishedQuestsIds = finishedQuestsIds;
    this.finishedQuestsCounts = finishedQuestsCounts;
    this.activeQuests = activeQuests;
  }
}
