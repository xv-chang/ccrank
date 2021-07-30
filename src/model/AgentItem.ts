import BinaryReader from "../uitls/BinaryReader"
import { AgentType } from "../enums/AgentType"

class AgentItem {
    ID: number = 0
    UniqueID: number = 0
    Agent: any = null
    Name: string = "UNKNOWN"
    Prof: string = "UNKNOWN"
    Toughness: number = 0
    Healing: number = 0
    Condition: number = 0
    Concentration: number = 0
    HitboxWidth: number = 0
    HitboxHeight: number = 0
    Type: AgentType = AgentType.NPC
    IsFake: boolean = false
    IsNotInSquadFriendlyPlayer: boolean = false

    static AgentCount: number = 0;
    _GetAgentProfString(prof: number, elite: number): string {
        if (elite == 0xFFFFFFFF) {
            if ((prof & 0xffff0000) == 0xffff0000) {
                return "GDG";
            }
            else {
                return "NPC";
            }
        } else if (elite == 0) {
            switch (prof) {
                case 1:
                    return "Guardian";
                case 2:
                    return "Warrior";
                case 3:
                    return "Engineer";
                case 4:
                    return "Ranger";
                case 5:
                    return "Thief";
                case 6:
                    return "Elementalist";
                case 7:
                    return "Mesmer";
                case 8:
                    return "Necromancer";
                case 9:
                    return "Revenant";
            }
        }
        else if (elite == 1) {
            switch (prof) {
                case 1:
                    return "Dragonhunter";
                case 2:
                    return "Berserker";
                case 3:
                    return "Scrapper";
                case 4:
                    return "Druid";
                case 5:
                    return "Daredevil";
                case 6:
                    return "Tempest";
                case 7:
                    return "Chronomancer";
                case 8:
                    return "Reaper";
                case 9:
                    return "Herald";
            }
        }
        console.error("Unknown profession")
        return ""
    }
    ReadFrom(reader: BinaryReader) {
        this.Agent = reader.ReadUInt64();
        let prof = reader.ReadUInt32();
        let elite = reader.ReadUInt32();
        this.Prof = this._GetAgentProfString(prof, elite);
        this.Toughness = reader.ReadUInt16();
        this.Concentration = reader.ReadUInt16();
        this.Healing = reader.ReadUInt16();
        this.HitboxWidth = (2 * reader.ReadUInt16());
        this.Condition = reader.ReadUInt16();
        this.HitboxHeight = (2 * reader.ReadUInt16());
        this.Name = reader.ReadString(68, false);
        this.UniqueID = AgentItem.AgentCount++
    }
}

export default AgentItem