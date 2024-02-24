import { Buffer } from "buffer"

export default class BufferHelper {
  constructor() {
    this.buffers = []
    this.size = 0
  }

  get length() {
    return this.size
  }

  concat = buffer => {
    this.buffers.push(buffer)
    this.size += buffer.length
    return this
  }

  empty = () => {
    this.buffers = []
    this.size = 0
    return this
  }

  toBuffer = () => Buffer.concat(this.buffers, this.size)

  toString = encoding => this.toBuffer().toString(encoding)

  load = (stream, callback) => {
    stream.on("data", trunk => {
      this.concat(trunk)
    })
    stream.on("end", () => {
      callback(null, this.toBuffer())
    })
    stream.once("error", callback)
  }
}
