const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

const width = 508
const height = 508

const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')


const saveLayer = (name) => {
  fs.writeFileSync(`./images/new_image_${name}.png`, canvas.toBuffer("image/png"));
};

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function randomAsset(_layers, _index, name) {
  if (_layers.length <= _index) return
    const _layer = _layers[_index]
   fs.readdir(_layer.uri, async (err, files) => {
      let max = files.length
      let min = 0
      fileName = `${_layer.uri}/${files[randomInteger(min, max - 1)]}`

      const image = await loadImage(fileName);
      context.drawImage(image, _layer.x, _layer.y, _layer.width, _layer.height);
      saveLayer(name);  

      randomAsset(_layers, _index + 1, name)

    })
    
}


const layers = [

  {
    uri: './layers/background',
    x: 0,
    y: 0,
    width: 508,
    height: 508,
    order: 1
  },

  {
    uri: './layers/eye color',
    x: 0,
    y: 0,
    width: 500,
    height: 500,
    order: 2
  },

  {
    uri: './layers/ball',
    x: 150,
    y: 150,
    width: 200,
    height: 200,
    order: 3
  },
  {
    uri: './layers/top lid',
    x: 0,
    y: 0,
    width: 508,
    height: 508,
    order: 4
  },
  {
    uri: './layers/bottom lid',
    x: 0,
    y: 0,
    width: 508,
    height: 508,
    order: 5
  },


]

async function createFile(name) {
  await randomAsset(layers, 0, name)
}

createFile('test')
