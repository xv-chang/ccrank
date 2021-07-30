import DataBase from '../Database'
import ISpec from '../interfaces/ISpec'
export default {
    async BatchAdd(specs: ISpec[]) {
        let db = new DataBase();
        await db.specs.bulkAdd(specs);
    },
    async CheckDataReady() {
        let db = new DataBase();
        let count = await db.specs.count();
        return count > 0;
    },
    async LoadSpecs() {
        let page = 0;
        while (true) {
            const response = await fetch(`https://api.guildwars2.com/v2/specializations?lang=zh&page=${page}&page_size=200`);
            if (!response.ok) {
                break;
            }
            const json = await response.json()
            this.BatchAdd(<ISpec[]>json)
            page++;
        }
    },
    async InitData() {
        let isReady = await this.CheckDataReady()
        if (!isReady) {
            await this.LoadSpecs();
        }

    },
}