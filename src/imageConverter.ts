import path from 'path'
import fs from 'fs'

import sharp from 'sharp'

import { FileInfo } from './types/FileInfo'

export const convertFilesToWebp = async (fileInfos: FileInfo[]) => {
  for (const fileInfo of fileInfos) {
    console.log(`${fileInfo.type}: ${fileInfo.fileAbsolutePath}`)

    const newWebpFilePath = path.join(
      fileInfo.directoryAbsolutePath,
      `${fileInfo.fileNameNoExt}.webp`,
    )
    if (fs.existsSync(newWebpFilePath)) {
      fs.rmSync(newWebpFilePath)
    }

    await sharp(fileInfo.fileAbsolutePath)
      .unflatten()
      .webp()
      .resize(40, 40, {
        fit: 'fill',
      })
      .toFile(newWebpFilePath, () => {})
  }
}
