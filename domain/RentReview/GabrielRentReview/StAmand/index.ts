import { DocxOptions } from '../../../DocxOptions/index.js'

export type StAmandRentReviewData1 = {
  CIVILITÉ: string
  //   LOCATAIRE: string
  LOCATAIRE_NOM: string // on sait l'adresse mais pas le nom du locataire
  DATE_COURRIER: string
  //   TYPE_INDICE: string
  TRIMESTRE: string
  REGLEMENT: string

  nind: number
  ai: number
  lhc: number
  charges: number
}
export type StAmandRentReviewOptions = DocxOptions & {
  data: StAmandRentReviewData1
}
