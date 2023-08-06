import { Stats } from 'fs'

import { FileType } from '../types/FileInfo'

export const fileTypeToString = (fileStat: Stats): FileType => {
  if (fileStat.isFile()) {
    return 'FILE'
  }

  if (fileStat.isDirectory()) {
    return 'DIR'
  }

  if (fileStat.isSymbolicLink()) {
    return 'SYMLINK'
  }

  if (fileStat.isFIFO()) {
    return 'FIFO'
  }

  if (fileStat.isSocket()) {
    return 'SOCKET'
  }

  if (fileStat.isCharacterDevice()) {
    return 'CHAR_DEVICE'
  }

  if (fileStat.isBlockDevice()) {
    return 'BLOCK_DEVICE'
  }

  return null
}
