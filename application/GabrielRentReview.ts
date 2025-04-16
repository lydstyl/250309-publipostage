import { GabrielRentReviewData1 } from '../domain/RentReview/GabrielRentReview/index.js'
import { StAmandRentReviewData1 } from '../domain/RentReview/GabrielRentReview/StAmand/index.js'
import { RentReviewData1 } from '../domain/RentReview/index.js'
import { RentReview } from '../infrastructure/RentReview.js'

export class GabrielRentReview extends RentReview {
  constructor(data: GabrielRentReviewData1) {
    const newData: RentReviewData1 = {
      ...data,
      BAILLEUR: 'Gabriel BRUN\n259 rue de Wallers\n59590 RAISMES',
      SIGNATURE: 'Gabriel BRUN'
    }
    super(newData)
  }
}
export class StAmandRentReview extends GabrielRentReview {
  constructor(data: StAmandRentReviewData1) {
    const newOptions: GabrielRentReviewData1 = {
      ...data,
      LOCATAIRE: `${data.LOCATAIRE_NOM}\n1 bis cour Patrice\n59230 ST AMAND LES EAUX`
    }
    super(newOptions)
  }
}
// todo class RoubaixRentReview
