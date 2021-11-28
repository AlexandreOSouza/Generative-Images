const fs = require('fs')
const { createCanvas } = require('canvas')
var crypto = require('crypto');


const { LAYERS } = require('./config/layersConfig')
const { getNumberOfFilesInFolder, normalizePath, loadImageFromFile } = require('./utils/assetsUtils.js')
const { randomInteger } = require('./utils/randomUtils')

var name = 'braitsch';
var hash = crypto.createHash('md5').update(name).digest('hex');
console.log(hash); // 9b74c9897bac770ffc029102a200c5de

const width = 508
const height = 508

const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')
context.fillStyle = '#fff'
context.fillRect(0, 0, width, height)

function createFile () {

  let layerLeght = LAYERS.length
  let index = 0
  hash = crypto.createHash('md5').update(name).digest('hex');
  LAYERS?.forEach(layer => {
    let numberOfFiles = getNumberOfFilesInFolder(layer.name)
    let assetsIndex = randomInteger(numberOfFiles)
    let path = normalizePath(assetsIndex, layer.name)
    let image = loadImageFromFile(path)
    image.then(img => {
      if (layer.r != 0) {
        context.rotate(layer.r * Math.PI / 180)
      }
      context.drawImage(img, layer.x, layer.y, layer.w, layer.h)
      fs.writeFileSync(`./images_output/new_image_test.png`, canvas.toBuffer("image/png"));
      index++
    })
  })

  if (index === layerLeght) {
    return hash
  }
}

console.log(createFile())

console.log('do')
