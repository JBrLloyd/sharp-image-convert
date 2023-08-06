'use strict'
import { Stats } from 'fs'

export type FileType =
  | 'FILE'
  | 'DIR'
  | 'SYMLINK'
  | 'FIFO'
  | 'SOCKET'
  | 'CHAR_DEVICE'
  | 'BLOCK_DEVICE'
  | null

export type FileInfo = {
  fileName: string
  fileNameNoExt: string
  fileExt: string | null
  fileAbsolutePath: string
  directoryAbsolutePath: string
  type?: FileType
  stats?: Stats
}
