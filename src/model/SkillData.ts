import SkillItem from "./SkillItem";
export default class SkillData {
    _skills: { [key: string]: SkillItem } = {}
    Add(id: string, name: string) {
        if (!this._skills[id]) {
            this._skills[id] = new SkillItem(id, name);
        }
    }
}

