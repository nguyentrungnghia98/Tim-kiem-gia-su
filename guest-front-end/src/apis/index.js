import TagSkillClass from './tagSkill';
import UserClass from './user';
import ContractClass from './contract';
import ConversationClass from './conversation';

export const TagSkill = new TagSkillClass();
export const User = new UserClass();
export const Contract = new ContractClass();
export const Conversation = new ConversationClass();

export default {
  TagSkill,
  User,
  Contract,
  Conversation
}