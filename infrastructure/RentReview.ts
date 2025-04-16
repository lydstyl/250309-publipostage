import path from 'path'
import {
  RentReviewOptions2,
  RentReviewData1,
  RentReviewData2
} from '../domain/RentReview/index.js'
import { Docx } from './Docx.js'

export class RentReview extends Docx {
  options: RentReviewOptions2
  constructor(data: RentReviewData1) {
    const templatePath = path.resolve(
      '/home/gab/apps/250309-publipostage',
      'templates',
      'template.docx'
    )
    const filtePath = path.resolve(
      '/home/gab/apps/250309-publipostage',
      'output',
      'revision-loyer.docx'
    )
    super({
      templatePath,
      filtePath,
      data: {}
    })
    const newData = this.transformData(data)
    this.options.data = newData
  }
  toFrenchNumber(num: number) {
    return num.toFixed(2).replace('.', ',')
  }
  transformData(data: RentReviewData1): RentReviewData2 {
    const NIND = this.toFrenchNumber(data.nind)
    const AI = this.toFrenchNumber(data.ai)
    const LHC = this.toFrenchNumber(data.lhc)
    const nlhc = data.lhc * (data.nind / data.ai)
    const NLHC = this.toFrenchNumber(nlhc)
    const CHARGES = this.toFrenchNumber(data.charges)
    const NOUVEAU_LOYER = this.toFrenchNumber(nlhc + data.charges)
    return {
      ...data,
      NIND,
      AI,
      LHC,
      CHARGES,
      NLHC,
      NOUVEAU_LOYER,
      TYPE_INDICE: 'Indice de Référence des Loyers (IRL)' // change only for commercial local
    }
  }
}
