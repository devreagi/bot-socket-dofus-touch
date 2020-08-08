import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import DocumentReadingBeginMessage from "@/protocol/network/messages/DocumentReadingBeginMessage";
import QuestListMessage from "@/protocol/network/messages/QuestListMessage";
import QuestStartedMessage from "@/protocol/network/messages/QuestStartedMessage";
import QuestStepInfoMessage from "@/protocol/network/messages/QuestStepInfoMessage";
import QuestStepInfoRequestMessage from "@/protocol/network/messages/QuestStepInfoRequestMessage";
import QuestValidatedMessage from "@/protocol/network/messages/QuestValidatedMessage";
import QuestActiveDetailedInformations from "@/protocol/network/types/QuestActiveDetailedInformations";
import QuestActiveInformations from "@/protocol/network/types/QuestActiveInformations";
import LiteEvent from "@/utils/LiteEvent";

export default class Quests {
  private account: Account;
  private finishedQuests: number[];
  private activeQuests: number[];

  private onQuestStepInfo = new LiteEvent<QuestStepInfoMessage>();

  constructor(account: Account) {
    this.account = account;
    this.finishedQuests = [];
    this.activeQuests = [];
  }

  public get QuestStepInfo() {
    return this.onQuestStepInfo.expose();
  }

  public isActive(questId: number) {
    return this.activeQuests.includes(questId);
  }

  public isCompleted(questId: number) {
    return this.finishedQuests.includes(questId);
  }

  public async currentStep(questId: number) {
    const info = await this.questInfos(questId);
    if (info._type === "QuestActiveDetailedInformations") {
      const infos = info as QuestActiveDetailedInformations;
      return infos.stepId;
    }
    return -1;
  }

  public async objectivesNeeded(questId: number): Promise<number[]> {
    const info = await this.questInfos(questId);
    if (info._type === "QuestActiveDetailedInformations") {
      const infos = info as QuestActiveDetailedInformations;
      return infos.objectives
        .filter(objective => objective.objectiveStatus)
        .map(objective => objective.objectiveId);
    }
    return [];
  }

  public async needObjective(questId: number, objectiveId: number) {
    const objectives = await this.objectivesNeeded(questId);
    return objectives.includes(objectiveId);
  }

  public UpdateQuestListMessage(message: QuestListMessage) {
    this.finishedQuests = message.finishedQuestsIds;
    this.activeQuests = message.activeQuests.map(q => q.questId);
  }

  public UpdateQuestStartedMessage(message: QuestStartedMessage) {
    this.activeQuests.push(message.questId);
  }

  public UpdateQuestStepInfoMessage(message: QuestStepInfoMessage) {
    this.onQuestStepInfo.trigger(message);
  }

  public UpdateQuestValidatedMessage(message: QuestValidatedMessage) {
    this.finishedQuests.push(message.questId);

    const index = this.activeQuests.indexOf(message.questId);
    if (index > -1) {
      this.activeQuests.splice(index, 1);
    }
  }

  public UpdateDocumentReadingBeginMessage(
    message: DocumentReadingBeginMessage
  ) {
    this.account.state = AccountStates.TALKING;
  }

  private questInfos(
    questId: number
  ): Promise<QuestActiveInformations | QuestActiveDetailedInformations> {
    return new Promise((resolve, reject) => {
      if (!this.isActive(questId)) {
        return reject();
      }

      const timeoutId = setTimeout(() => reject(), 5000);

      this.QuestStepInfo.once(message => {
        clearTimeout(timeoutId);
        resolve(message.infos);
      });

      this.account.network.sendMessageFree("QuestStepInfoRequestMessage", {
        questId
      } as QuestStepInfoRequestMessage);
    });
  }
}
