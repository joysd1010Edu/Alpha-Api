const mongoose = require('mongoose');

const laptop = new mongoose.Schema({
    keyFeatures: {
        modelName: { type: String, required: true },
        cache: { type: Number, required: true },
        display: { type: String, required: true },
        generation: { type: Number, required: true },
        brand: { type: String, required: true },
        ram: { type: Number, required: true },
        ramType: { type: String, required: true },
        storage: { type: Number, required: true },
        regularPrice: { type: Number, required: true },
        emiPrice: { type: Number, required: true },
        discountedPrice: { type: Number, required: true },
        specialFeatures: [{ type: String }]
      },
      processor: {
        brand: { type: String, required: true },
        model: { type: String, required: true },
        generation: { type: Number, required: true },
        clockSpeed: { type: String, required: true },
        core: { type: Number, required: true },
        thread: { type: Number, required: true },
        cache: { type: Number, required: true }
      },
      display: {
        size: { type: String, required: true },
        resolution: { type: String, required: true },
        displayFeatures: [{ type: String }]
      },
      memory: {
        ramSize: { type: Number, required: true },
        ramFrequency: { type: Number, required: true },
        ramType: { type: String, required: true },
        totalRamSlots: { type: Number, required: true },
        maxRamCapacity: { type: Number, required: true },
        storageType: { type: String, required: true },
        storageSize: { type: Number, required: true },
        ssdSlot: { type: Number, required: true },
        extraSsdSlot: { type: Number, required: true },
        readSpeed: { type: Number },
        writeSpeed: { type: Number }
      },
      imageLinks: [{ type: String }],
      graphics: {
        brand: { type: String, required: true },
        model: { type: String, required: true },
        memorySize: { type: Number, required: true },
        memoryType: { type: String, required: true }
      },
      keyboard: {
        keyboardFeatures: [{ type: String }],
        touchpadFeatures: [{ type: String }]
      },
      camera: {
        webcamFeature: { type: String, required: true },
        audioFeature: { type: String, required: true }
      },
      audio: {
        speakerFeature: { type: String },
        microphoneFeature: { type: String }
      },
      ports: {
        opticalDrive: { type: Boolean, default: false },
        hdmiFeature: { type: Boolean },
        usbFeatures: [{ type: String }],
        headphonePort: { type: Boolean },
        audioPort: { type: Boolean },
        ioPorts: [{ type: String }]
      },
      network: {
        lanDetails: { type: String },
        wifiDetails: { type: String },
        bluetoothDetails: { type: String }
      },
      physicalDetails: {
        color: { type: String },
        weight: { type: String },
        thickness: { type: String },
        dimensions: { type: String }
      },
      batteryDetails: {
        capacity: { type: String },
        adapterWatt: { type: Number },
        adapterType: { type: String }
      },
      osDetails: {
        os: { type: String, required: true },
        architecture: { type: String, required: true }
      },
      warrantyDetails: {
        warrantyPeriod: { type: String, required: true },
        warrantyType: { type: String, required: true }
      },
      quantity: { type: Number, required: true }
    });

const Laptop = mongoose.model('Laptop', laptop, 'Laptop');

module.exports = Laptop;
