'use strict'
import path from 'path'

const emptyString = ''
const forwardSlashChar = '/'

export const pathConvertPosix = (posixPathStr: string) => {
  const posixPath = posixPathStr?.trim() ?? emptyString

  if (posixPath === emptyString) {
    return emptyString
  }

  return path.join(...posixPath.split(forwardSlashChar))
}
