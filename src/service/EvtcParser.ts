import JSZip from 'jszip'
import BinaryReader from '../uitls/BinaryReader'
import AgentItem from '../model/AgentItem'
import SkillItem from '../model/SkillItem'
import SkillData from '../model/SkillData'
import FightData from '../model/FightData'
import CombatItem from '../model/CombatItem'
import Player from '../model/Player'

class EvtcParser {
  version: string = ""
  _revision: number = 0
  _id: number = 0
  _allAgentsList: AgentItem[] = []
  _skillData: SkillData = new SkillData()
  _combatItems: CombatItem[] = []
  _playerList: Player[] = []

  _getExt(name: string): string {
    return name.substring(name.lastIndexOf('.'))
  }
  _checkIsLogFile(name: string): boolean {
    return name.indexOf('evtc') > -1
  }
  _isZip(ext: string): boolean {
    return ext == '.zevtc'
  }
  _readZipBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      JSZip.loadAsync(file).then(zip => {
        let keys = Object.keys(zip.files)
        let firstKey = keys[0];
        zip.file(firstKey)?.async('arraybuffer').then(r => {
          resolve(r)
        }).catch(e => {
          reject(e)
        })
      })
    })
  }
  _readBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      var reader = new FileReader()
      reader.onload = function (evt) {
        resolve(<ArrayBuffer>evt?.target?.result)
      }
      reader.onerror = function (e) {
        reject(e);
      }
      reader.readAsArrayBuffer(file)
    })
  }

  async Parse(file: File) {
    let name = file.name.toLowerCase()
    let ext = this._getExt(name)
    if (!this._checkIsLogFile(ext)) throw new Error("无效的日志文件");
    let arrayBuffer: ArrayBuffer;
    if (this._isZip(ext)) {
      arrayBuffer = await this._readZipBuffer(file)
    } else {
      arrayBuffer = await this._readBuffer(file)
    }
    let reader = new BinaryReader(arrayBuffer)
    this.ParseFightData(reader)
    this.ParseAgentData(reader)
    this.ParseSkillData(reader)
  }
  ParseFightData(reader: BinaryReader) {
    this.version = reader.ReadString(12)
    this._revision = reader.ReadByte()
    this._id = reader.ReadUInt16()
    reader.ReadSkip()
  }

  ParseAgentData(reader: BinaryReader) {
    let agentCount = reader.ReadInt32();
    for (let i = 0; i < agentCount; i++) {
      let agentItem = new AgentItem();
      agentItem.ReadFrom(reader);
      console.log(agentItem.Name);
      this._allAgentsList.push(agentItem);
    }
  }
  ParseSkillData(reader: BinaryReader) {
    let skillCount = reader.ReadUInt32();
    for (let i = 0; i < skillCount; i++) {
      let skillId = reader.ReadInt32();
      let name = reader.ReadString(64);
      this._skillData.Add(String(skillId), name);
    }
  }

  ParseCombatList(reader: BinaryReader) {

    if (this._revision > 0) {

    }



  }
  completeAgents() { }
  preProcessEvtcData() { }
}

export default EvtcParser
