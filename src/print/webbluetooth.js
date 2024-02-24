// types.js

export const BluetoothServiceUUID = Number | String;
export const BluetoothCharacteristicUUID = Number | String;
export const BluetoothDescriptorUUID = Number | String;

export const BluetoothManufacturerData = new Map();
export const BluetoothServiceData = new Map();

export const BluetoothDataFilter = {
  dataPrefix: undefined,
  mask: undefined,
};

export const BluetoothManufacturerDataFilter = {
  companyIdentifier: 0,
};

export const BluetoothServiceDataFilter = {
  service: undefined,
};

export const BluetoothLEScanFilter = {
  name: undefined,
  namePrefix: undefined,
  services: undefined,
  manufacturerData: undefined,
  serviceData: undefined,
};

export const BluetoothLEScanOptions = {
  filters: undefined,
  keepRepeatedDevices: undefined,
  acceptAllAdvertisements: undefined,
};

export const BluetoothLEScan = {
  active: false,
  stop: () => {},
};

export const RequestDeviceOptions = {
  filters: [],
  optionalServices: undefined,
  optionalManufacturerData: undefined,
} || {
  acceptAllDevices: false,
  optionalServices: undefined,
  optionalManufacturerData: undefined,
};

export const BluetoothAdvertisingEvent = {
  device: {},
  uuids: [],
  manufacturerData: {},
  serviceData: {},
  name: undefined,
  appearance: undefined,
  rssi: undefined,
  txPower: undefined,
};

export const BluetoothRemoteGATTDescriptor = {
  characteristic: {},
  uuid: '',
  value: undefined,
  readValue: async () => new DataView(),
  writeValue: async (value) => {},
};

export const BluetoothCharacteristicProperties = {
  broadcast: false,
  read: false,
  writeWithoutResponse: false,
  write: false,
  notify: false,
  indicate: false,
  authenticatedSignedWrites: false,
  reliableWrite: false,
  writableAuxiliaries: false,
};

export const CharacteristicEventHandlers = {
  oncharacteristicvaluechanged: (ev) => {},
};

export const BluetoothRemoteGATTCharacteristic = {
  service: {},
  uuid: '',
  properties: BluetoothCharacteristicProperties,
  value: undefined,
  getDescriptor: async (descriptor) => BluetoothRemoteGATTDescriptor,
  getDescriptors: async (descriptor) => [BluetoothRemoteGATTDescriptor],
  readValue: async () => new DataView(),
  writeValue: async (value) => {},
  writeValueWithResponse: async (value) => {},
  writeValueWithoutResponse: async (value) => {},
  startNotifications: async () => BluetoothRemoteGATTCharacteristic,
  stopNotifications: async () => BluetoothRemoteGATTCharacteristic,
  addEventListener: (type, listener, useCapture) => {},
};

export const ServiceEventHandlers = {
  onserviceadded: (ev) => {},
  onservicechanged: (ev) => {},
  onserviceremoved: (ev) => {},
};

export const BluetoothRemoteGATTService = {
  device: {},
  uuid: '',
  isPrimary: false,
  getCharacteristic: async (characteristic) => BluetoothRemoteGATTCharacteristic,
  getCharacteristics: async (characteristic) => [BluetoothRemoteGATTCharacteristic],
  getIncludedService: async (service) => BluetoothRemoteGATTService,
  getIncludedServices: async (service) => [BluetoothRemoteGATTService],
  addEventListener: (type, listener, useCapture) => {},
};

export const BluetoothRemoteGATTServer = {
  device: {},
  connected: false,
  connect: async () => BluetoothRemoteGATTServer,
  disconnect: () => {},
  getPrimaryService: async (service) => BluetoothRemoteGATTService,
  getPrimaryServices: async (service) => [BluetoothRemoteGATTService],
};

export const BluetoothDeviceEventHandlers = {
  onadvertisementreceived: (ev) => {},
  ongattserverdisconnected: (ev) => {},
};

export const WatchAdvertisementsOptions = {
  signal: undefined,
};

export const BluetoothDevice = {
  id: '',
  name: undefined,
  gatt: undefined,
  forget: async () => {},
  watchAdvertisements: async (options) => {},
  unwatchAdvertisements: () => {},
  watchingAdvertisements: false,
  addEventListener: (type, listener, useCapture) => {},
};

export const Bluetooth = {
  getDevices: async () => [BluetoothDevice],
  getAvailability: async () => false,
  onavailabilitychanged: (ev) => {},
  referringDevice: undefined,
  requestDevice: async (options) => BluetoothDevice,
  requestLEScan: async (options) => BluetoothLEScan,
  addEventListener: (type, listener, useCapture) => {},
};

export const Navigator = {
  bluetooth: Bluetooth,
};
