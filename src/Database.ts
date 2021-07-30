import Dexie from 'dexie';
import ISkill from './interfaces/ISkill';
import ISpec from './interfaces/ISpec';

class Database extends Dexie {
    public skills: Dexie.Table<ISkill, number>;
    public specs: Dexie.Table<ISpec, number>;
    public constructor() {
        super("Database");
        this.version(1).stores({
            skills: "id",
            specs: "id"
        });
        this.skills = this.table("skills");
        this.specs = this.table("specs");
    }
}

export default Database