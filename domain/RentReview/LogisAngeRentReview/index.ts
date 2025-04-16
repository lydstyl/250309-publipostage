import { DocxOptions } from '../../DocxOptions/index.js'
import { GabrielRentReviewData1 } from '../GabrielRentReview/index.js'

export type LogisAngeRentReviewData1 = GabrielRentReviewData1
export type LogisAngeRentReviewOptions = DocxOptions & {
  data: LogisAngeRentReviewData1
}
