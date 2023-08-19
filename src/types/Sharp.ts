import * as sharp from "sharp"

export type ImageResizedOptions = {
  height: number
  width: number
  fit: sharp.ResizeOptions['fit']
}
