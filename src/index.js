const fs = require('fs')
const { createCanvas } = require('canvas')

const { LAYERS } = require('./config/layersConfig')
const { getNumberOfFilesInFolder, normalizePath, loadImageFromFile } = require('./utils/assetsUtils.js')
const { randomInteger } = require('./utils/randomUtils')

const width = 508
const height = 508

const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')


function createFile () {
  LAYERS?.forEach(layer => {
    let numberOfFiles = getNumberOfFilesInFolder(layer.name)
    let assetsIndex = randomInteger(numberOfFiles)
    let path = normalizePath(assetsIndex, layer.name)
    let image = loadImageFromFile(path)

    image.then(img => {
      context.drawImage(img, layer.x, layer.y, layer.w, layer.h)
      fs.writeFileSync(`./images_output/new_image_test.png`, canvas.toBuffer("image/png"));
    })
  })
}

createFile()