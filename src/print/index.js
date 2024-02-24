import * as EPToolkit from "./EPToolkit"

export const textTo64Buffer = (text, opts) => {
  const defaultOptions = {
    beep: false,
    cut: false,
    tailingLine: false,
    encoding: "UTF8"
  }

  const options = {
    ...defaultOptions,
    ...opts
  }
  return EPToolkit.exchange_text(text, options)
}

export const billTo64Buffer = (text, opts) => {
  const defaultOptions = {
    beep: true,
    cut: true,
    encoding: "UTF8",
    tailingLine: true
  }
  const options = {
    ...defaultOptions,
    ...opts
  }
  return EPToolkit.exchange_text(text, options)
}
