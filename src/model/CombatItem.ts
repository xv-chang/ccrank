import BinaryReader from "../uitls/BinaryReader";
import { Activation } from "../enums/Activation";
import { BuffRemove } from "../enums/BuffRemove";
import { IFF } from "../enums/IFF";
import { StateChange } from "../enums/StateChange";

class CombatItem {
    Time: any = null;
    SrcAgent: any = null;
    DstAgent: any = null;
    Value: number = 0;
    BuffDmg: number = 0;
    OverstackValue: number = 0;
    SkillID: number = 0;
    SrcInstid: number = 0;
    DstInstid: number = 0;
    SrcMasterInstid: number = 0;
    DstMasterInstid: number = 0;
    IFFByte: number = 0;
    IFF: IFF = IFF.Unknown;
    IsBuff: number = 0;
    Result: number = 0;
    IsActivationByte: number = 0;
    IsActivation: Activation = Activation.Unknown;
    IsBuffRemoveByte: number = 0;
    IsBuffRemove: BuffRemove = 0;
    IsNinety: number = 0;
    IsFifty: number = 0;
    IsMoving: number = 0;
    IsStateChange: StateChange = StateChange.Unknown;
    IsFlanking: number = 0;
    IsShields: number = 0;
    IsOffcycle: number = 0;
    Pad: number = 0;
    Pad1: number = 0;
    Pad2: number = 0;
    Pad3: number = 0;
    Pad4: number = 0;

    ReadFrom(reader: BinaryReader) {
        this.Time = reader.ReadInt64();
        this.SrcAgent = reader.ReadUInt64();
        this.DstAgent = reader.ReadUInt64();
        this.Value = reader.ReadInt32();
        this.BuffDmg = reader.ReadInt32();
        this.OverstackValue = reader.ReadUInt16();
        this.SkillID = reader.ReadUInt16();
        this.SrcInstid = reader.ReadUInt16();
        this.DstInstid = reader.ReadUInt16();
        this.SrcMasterInstid = reader.ReadUInt16();
        reader.ReadSkip(9);
        this.IFF = reader.ReadByte();
        this.IsBuff = reader.ReadByte();
        this.Result = reader.ReadByte();
        this.IsActivation = reader.ReadByte();
        this.IsBuffRemove = reader.ReadByte();
        this.IsNinety = reader.ReadByte();
        this.IsFifty = reader.ReadByte();
        this.IsMoving = reader.ReadByte();
        this.IsStateChange = reader.ReadByte();
        this.IsFlanking = reader.ReadByte();
        this.IsShields = reader.ReadByte();
        this.IsOffcycle = reader.ReadByte();
        reader.ReadSkip();
    }

    ReadFrom2(reader: BinaryReader) {
        this.Time = reader.ReadInt64();
        this.SrcAgent = reader.ReadUInt64();
        this.DstAgent = reader.ReadUInt64();
        this.Value = reader.ReadInt32();
        this.BuffDmg = reader.ReadInt32();
        this.OverstackValue = reader.ReadUInt16();
        this.SkillID = reader.ReadUInt16();
        this.SrcInstid = reader.ReadUInt16();
        this.DstInstid = reader.ReadUInt16();
        this.SrcMasterInstid = reader.ReadUInt16();
        this.DstMasterInstid = reader.ReadUInt16();
        this.IFF = reader.ReadByte();
        this.IsBuff = reader.ReadByte();
        this.Result = reader.ReadByte();
        this.IsActivation = reader.ReadByte();
        this.IsBuffRemove = reader.ReadByte();
        this.IsNinety = reader.ReadByte();
        this.IsFifty = reader.ReadByte();
        this.IsMoving = reader.ReadByte();
        this.IsStateChange = reader.ReadByte();
        this.IsFlanking = reader.ReadByte();
        this.IsShields = reader.ReadByte();
        this.IsOffcycle = reader.ReadByte();
        this.Pad = reader.ReadUInt32();
        // this.Pad1 = pads[0];
        // this.Pad2 = pads[1];
        // this.Pad3 = pads[2];
        // this.Pad4 = pads[3];
    }

}

export default CombatItem