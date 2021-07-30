import DataBase from '../Database'
import ISkill from '../interfaces/ISkill'
export default {
    async BatchAdd(skills: ISkill[]) {
        let db = new DataBase();
        await db.skills.bulkAdd(skills);
    },
    async CheckDataReady() {
        let db = new DataBase();
        let count = await db.skills.count();
        return count > 0;
    },
    async LoadSkills() {
        let page = 0;
        while (true) {
            const response = await fetch(`https://api.guildwars2.com/v2/skills?lang=zh&page=${page}&page_size=200`);
            if (!response.ok) {
                break;
            }
            const json = await response.json()
            this.BatchAdd(<ISkill[]>json)
            page++;
        }
    },
    async InitData() {
        let isReady = await this.CheckDataReady()
        if (!isReady) {
            await this.LoadSkills();
        }

    },
}