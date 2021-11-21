const fs = require('fs')
const { loadImage } = require('canvas')

const getNumberOfFilesInFolder = (folderName) => {
    const files = fs.readdirSync(`./layers/${folderName}`)
    return files.length - 1 // -1 to remove .DS_Store
}

const normalizePath = (index, folderName) => {
    return `./layers/${folderName}/${folderName}-${index}.png`
}

const loadImageFromFile = async (fileName) => {
    return await loadImage(fileName)
}


module.exports = { getNumberOfFilesInFolder, normalizePath, loadImageFromFile}