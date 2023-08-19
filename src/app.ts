import path from 'path'
import os from 'os'
import readline from 'readline'

import { pathConvertPosix } from './utils/pathUtils'
import { getFilesInDirSync } from './fileFinder'
import { convertFilesToWebp } from './imageConverter'
import { FileInfo } from './types/FileInfo'
import { ImageResizedOptions } from './types/Sharp'

const readlineUserInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const logMatchingFiles = (foundFiles: FileInfo[]) => {
  console.log('Files Found:')
  foundFiles.forEach(f => console.log(`> ${f.fileAbsolutePath}`))
}

export const app = async () => {
  const searchFilePath = path.join(os.homedir(), pathConvertPosix('temp'))

  const imageFileName = 'image'
  const fileExt = 'svg'
  const matchGlobExpression = `*${imageFileName}*.${fileExt}`

  const fileInfos = getFilesInDirSync(searchFilePath, matchGlobExpression)

  if (!fileInfos || fileInfos.length === 0) {
    throw new Error('No Files Found')
  }

  logMatchingFiles(fileInfos)

  const resizeOptions: ImageResizedOptions = {
    width: 40,
    height: 40,
    fit: 'fill',
  }

  readlineUserInput.question(
    'Press enter to convert above files to Webp, or Ctrl+C to exit',
    () => {
      convertFilesToWebp(fileInfos, resizeOptions)
    },
  )
}
