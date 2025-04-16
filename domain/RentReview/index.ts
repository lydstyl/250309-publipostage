import { DocxOptions } from '../DocxOptions/index.js'

export type CommonRentReviewData = {
  BAILLEUR: string
  CIVILITÉ: string
  LOCATAIRE: string
  DATE_COURRIER: string
  TRIMESTRE: string
  REGLEMENT: string
  SIGNATURE: string
}
export type RentReviewData1 = CommonRentReviewData & {
  nind: number
  ai: number
  lhc: number
  charges: number
}
export type RentReviewData2 = CommonRentReviewData & {
  NIND: string
  AI: string
  LHC: string
  NLHC: string
  CHARGES: string
  NOUVEAU_LOYER: string
  TYPE_INDICE: string
}
// export type RentReviewOptions = RentReviewData1
export type RentReviewOptions2 = DocxOptions & {
  data: RentReviewData2
}
