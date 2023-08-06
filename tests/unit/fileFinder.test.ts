import path from 'path';

import 'jest';

import { getFileDetails, getFilesInDirSync } from "../../src/fileFinder";
import { FileType } from '../../src/types/FileInfo';

describe('getFileDetails', () => {
  it('should get details of test file with extension', async () => {
    // Arrange
    const testFilePath = path.join(__dirname, '..', 'data', 'testFile.json')

    // Act
    const result = getFileDetails(testFilePath)

    // Assert
    expect(result).toBeTruthy();

    const expectedFileType: FileType = 'FILE'
    expect(result.type).toBe(expectedFileType)
    expect(result.fileName).toBe('testFile.json')
    expect(result.fileExt).toBe('.json')
  });


  it('should get details of test file without extension', async () => {
    // Arrange
    const testFilePath = path.join(__dirname, '..', 'data', 'testFile')

    // Act
    const result = getFileDetails(testFilePath)

    // Assert
    expect(result).toBeTruthy();

    const expectedFileType: FileType = 'FILE'
    expect(result.type).toBe(expectedFileType)
    expect(result.fileName).toBe('testFile')
    expect(result.fileExt).toBeFalsy()
  });


  it('should throw for non-existing file', async () => {
    // Arrange
    const currentFileDir = __dirname;
    const currentDate = new Date();
    const nonExistingFilePath = path.join(currentFileDir, 'invalid', currentDate.toISOString());

    const invalidFileFn = () => getFileDetails(nonExistingFilePath)

    // Act + Assert
    expect(invalidFileFn).toThrowError()
  });
});

describe('getFilesInDirSync', () => {
  it('should check if current file can be found', async () => {
    // Arrange
    const testDataPath = path.join(__dirname, '..', 'data')

    // Act
    const result = getFilesInDirSync(testDataPath)

    // Assert
    expect(result.length).toBeGreaterThan(0)
  });
});
