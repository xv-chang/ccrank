class ReaderBuffer {

  _dataview: DataView
  _offset: number

  constructor(arrayBuffer: ArrayBuffer) {
    this._dataview = new DataView(arrayBuffer)
    this._offset = 0
  }

  ReadSkip(length: number = 1) {
    this._offset += length
  }

  ReadByte(): number {
    let r = this._dataview.getUint8(this._offset)
    this._offset++
    return r
  }
  ReadUInt16(): number {
    let r = this._dataview.getUint16(this._offset, true)
    this._offset += 2
    return r
  }
  ReadUInt32(): number {
    let r = this._dataview.getUint32(this._offset, true)
    this._offset += 4
    return r
  }
  ReadInt32(): number {
    let r = this._dataview.getInt32(this._offset, true)
    this._offset += 4
    return r
  }
  ReadUInt64(): bigint {
    let r = this._dataview.getBigUint64(this._offset, true)
    this._offset += 8
    return r
  }
  ReadInt64(): bigint {
    let r = this._dataview.getBigInt64(this._offset, true)
    this._offset += 8
    return r
  }
  ReadString(length: number, nullTerminated: boolean = true): string {
    let bytes = new Uint8Array(this._dataview.buffer, this._offset, length)
    this._offset += length
    let decoder = new TextDecoder()
    if (nullTerminated) {
      for (var i = 0; i < length; i++) {
        let byte = bytes[i]
        if (byte == 0) {
          length = i
          break
        }
      }
    }
    let realBytes = bytes.slice(0, length)
    let str = decoder.decode(realBytes)
    return str
  }
}

export default ReaderBuffer
