import path from 'path'
import fs from 'fs'

import sharp from 'sharp'

import { FileInfo } from './types/FileInfo'
import { ImageResizedOptions } from './types/Sharp'

export const convertFilesToWebp = async (fileInfos: FileInfo[], resizeImageOptions: ImageResizedOptions) => {
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
      .resize(
        resizeImageOptions.width,
        resizeImageOptions.height,
        {
          fit: resizeImageOptions.fit,
        })
      .toFile(newWebpFilePath, () => { })
  }
}
