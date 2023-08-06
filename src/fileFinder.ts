import path from 'path'
import fs from 'fs'

import { minimatch } from 'minimatch'

import { fileTypeToString } from './utils/fileUtils'
import { FileInfo } from './types/FileInfo'

export const getFileDetails = (fileAbsolutePath: string): FileInfo => {
  if (!path.isAbsolute(fileAbsolutePath)) {
    throw `Error: expected absolute file path for '${fileAbsolutePath}'`
  }

  const parsedFilePath = path.parse(fileAbsolutePath)
  const fileStats = fs.lstatSync(fileAbsolutePath)
  const fileType = fileTypeToString(fileStats)

  const fileDetails: FileInfo = {
    fileName: parsedFilePath.base,
    fileNameNoExt: parsedFilePath.name,
    fileExt: parsedFilePath.ext,
    fileAbsolutePath,
    directoryAbsolutePath: parsedFilePath.dir,
    type: fileType,
    stats: fileStats,
  }

  return fileDetails
}

export const getFilesInDirSync = (
  searchPath: string,
  globPattern?: string,
): FileInfo[] => {
  const filesDetails: FileInfo[] = new Array<FileInfo>()

  if (!fs.existsSync(searchPath)) {
    console.warn(`Skipping, path does not exist: ${searchPath}`)
    return filesDetails;
  }

  console.log(`Finding files in path: ${searchPath}`)
  const fileNames = fs.readdirSync(searchPath)

  for (const fileName of fileNames) {
    if (!!globPattern && !minimatch(fileName, globPattern)) {
      continue
    }

    const fileAbsolutePath = path.join(searchPath, fileName)

    if (!fs.existsSync(fileAbsolutePath)) {
      console.error(`File '${fileName}' not found at ${fileAbsolutePath}`)
      continue
    }

    const fileDetails = getFileDetails(fileAbsolutePath)
    filesDetails.push(fileDetails)
  }

  return filesDetails
}
