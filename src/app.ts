import path from 'path'
import os from 'os'
import readline from 'readline'

import { pathConvertPosix } from './utils/pathUtils'
import { getFilesInDirSync } from './fileFinder'
import { convertFilesToWebp } from './imageConverter'
import { FileInfo } from './types/FileInfo'

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

  const fileExt = 'svg'
  const matchGlobExpression = `*image*.${fileExt}`

  const fileInfos = getFilesInDirSync(searchFilePath, matchGlobExpression)

  if (!fileInfos || fileInfos.length === 0) {
    throw new Error('No Files Found')
  }

  logMatchingFiles(fileInfos)

  readlineUserInput.question(
    'Press enter to convert above files to Webp, or Ctrl+C to exit',
    () => {
      convertFilesToWebp(fileInfos)
    },
  )
}
