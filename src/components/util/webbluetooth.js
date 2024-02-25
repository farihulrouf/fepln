// Bluetooth Types
const BluetoothServiceUUID = Number | String;
const BluetoothCharacteristicUUID = Number | String;
const BluetoothDescriptorUUID = Number | String;

const BluetoothManufacturerData = new Map();
const BluetoothServiceData = new Map();

// Bluetooth Data Filter Interfaces
const BluetoothDataFilter = {
  dataPrefix: undefined,
  mask: undefined,
};

const BluetoothManufacturerDataFilter = {
  ...BluetoothDataFilter,
  companyIdentifier: Number,
};

const BluetoothServiceDataFilter = {
  ...BluetoothDataFilter,
  service: BluetoothServiceUUID,
};

// Bluetooth LE Scan Interfaces
const BluetoothLEScanFilter = {
  name: undefined,
  namePrefix: undefined,
  services: undefined,
  manufacturerData: undefined,
  serviceData: undefined,
};

const BluetoothLEScanOptions = {
  filters: undefined,
  keepRepeatedDevices: undefined,
  acceptAllAdvertisements: undefined,
};

const BluetoothLEScan = {
  ...BluetoothLEScanOptions,
  active: false,
  stop: () => {},
};

// Request Device Options
const RequestDeviceOptions = {
  filters: [],
  optionalServices: undefined,
  optionalManufacturerData: undefined,
} || {
  acceptAllDevices: false,
  optionalServices: undefined,
  optionalManufacturerData: undefined,
};

// Bluetooth Advertising Event
const BluetoothAdvertisingEvent = {
  device: undefined,
  uuids: [],
  manufacturerData: new Map(),
  serviceData: new Map(),
  name: undefined,
  appearance: undefined,
  rssi: undefined,
  txPower: undefined,
};

// Bluetooth Remote GATT Descriptor
const BluetoothRemoteGATTDescriptor = {
  characteristic: undefined,
  uuid: String,
  value: undefined,
  readValue: async () => new DataView(),
  writeValue: async (value) => {},
};

// Bluetooth Characteristic Properties
const BluetoothCharacteristicProperties = {
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

// Characteristic Event Handlers
const CharacteristicEventHandlers = {
  oncharacteristicvaluechanged: (ev) => {},
};

// Bluetooth Remote GATT Characteristic
const BluetoothRemoteGATTCharacteristic = {
  service: undefined,
  uuid: String,
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

// Service Event Handlers
const ServiceEventHandlers = {
  onserviceadded: (ev) => {},
  onservicechanged: (ev) => {},
  onserviceremoved: (ev) => {},
};

// Bluetooth Remote GATT Service
const BluetoothRemoteGATTService = {
  device: undefined,
  uuid: String,
  isPrimary: false,
  getCharacteristic: async (characteristic) => BluetoothRemoteGATTCharacteristic,
  getCharacteristics: async (characteristic) => [BluetoothRemoteGATTCharacteristic],
  getIncludedService: async (service) => BluetoothRemoteGATTService,
  getIncludedServices: async (service) => [BluetoothRemoteGATTService],
  addEventListener: (type, listener, useCapture) => {},
};

// Bluetooth Remote GATT Server
const BluetoothRemoteGATTServer = {
  device: undefined,
  connected: false,
  connect: async () => BluetoothRemoteGATTServer,
  disconnect: () => {},
  getPrimaryService: async (service) => BluetoothRemoteGATTService,
  getPrimaryServices: async (service) => [BluetoothRemoteGATTService],
};

// Bluetooth Device Event Handlers
const BluetoothDeviceEventHandlers = {
  onadvertisementreceived: (ev) => {},
  ongattserverdisconnected: (ev) => {},
};

// Watch Advertisements Options
const WatchAdvertisementsOptions = {
  signal: undefined,
};

// Bluetooth Device
const BluetoothDevice = {
  id: String,
  name: undefined,
  gatt: undefined,
  forget: async () => {},
  watchAdvertisements: async (options) => {},
  unwatchAdvertisements: () => {},
  watchingAdvertisements: false,
  addEventListener: (type, listener, useCapture) => {},
};

// Bluetooth API
const Bluetooth = {
  getDevices: async () => [BluetoothDevice],
  getAvailability: async () => false,
  onavailabilitychanged: (ev) => {},
  referringDevice: undefined,
  requestDevice: async (options) => BluetoothDevice,
  requestLEScan: async (options) => BluetoothLEScan,
  addEventListener: (type, listener, useCapture) => {},
};

// Navigator Interface
const Navigator = {
  bluetooth: Bluetooth,
};
