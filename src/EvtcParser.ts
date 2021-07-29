import JSZip from 'jszip'
import BinaryReader from './BinaryReader'

class EvtcParser {

  version: string = ""
  _revision: number = 0
  _id: number = 0

  constructor() {


  }
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

  async parse(file: File) {
    let name = file.name.toLowerCase()
    let ext = this._getExt(name)
    if (!this._checkIsLogFile(ext)) {
      console.error('不是正确的日志文件')
      return
    }
    let arrayBuffer: ArrayBuffer;
    if (this._isZip(ext)) {
      arrayBuffer = await this._readZipBuffer(file)
    } else {
      arrayBuffer = await this._readBuffer(file)
    }
    let reader = new BinaryReader(arrayBuffer)
    this.parseFightData(reader)
    this.parseAgentData(reader)
    this.parseSkillData(reader)
  }
  parseFightData(reader: BinaryReader) {
    this.version = reader.readString(12)
    this._revision = reader.readUint8()
    this._id = reader.readUint16()
    reader.readSkip()
    console.log(this.version)
    console.log(this._revision)
    console.log(this._id)
  }
  _getAgentProfString(prof: number, elite: number): string {
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
  parseAgentData(reader: BinaryReader) {
    let agentCount = reader.readInt32();
    console.log(`agentCount:${agentCount}`)
    for (let i = 0; i < agentCount; i++) {
      let agent = reader.readUint64();
      let prof = reader.readUint32();
      let elite = reader.readUint32();
      let toughness = reader.readUint16();
      let concentration = reader.readUint16();
      let healing = reader.readUint16();
      let hbWidth = (2 * reader.readUint16());
      let condition = reader.readUint16();
      let hbHeight = (2 * reader.readUint16());
      let name = reader.readString(68, false);
      console.log(name);
    }
  }
  parseSkillData(reader: BinaryReader) {
    let skillCount = reader.readUint32();
    for (let i = 0; i < skillCount; i++) {
      let skillId = reader.readInt32();
      let name = reader.readString(64);

      console.log(name);
    }
  }
  parseCombatList(reader: BinaryReader) {
    let time = reader.readInt64();
    let srcAgent = reader.readUint64();
    let dstAgent = reader.readUint64();
    let value = reader.readInt32();
    let buffDmg = reader.readInt32();
    let overstackValue = reader.readUint16();
    let skillId = reader.readUint16();
    let srcInstid = reader.readUint16();
    let dstInstid = reader.readUint16();
    let srcMasterInstid = reader.readUint16();
    reader.readSkip(9);
    let iff = reader.readUint8();
    let buff = reader.readUint8();
    let result = reader.readUint8();
    let isActivation = reader.readUint8();
    let isBuffRemove = reader.readUint8();
    let isNinety = reader.readUint8();
    let isFifty = reader.readUint8();
    let isMoving = reader.readUint8();
    let isStateChange = reader.readUint8();
    let isFlanking = reader.readUint8();
    let isShields = reader.readUint8();
    let isOffcycle = reader.readUint8();
    reader.readSkip();

  }
  completeAgents() { }
  preProcessEvtcData() { }
}

export default EvtcParser
