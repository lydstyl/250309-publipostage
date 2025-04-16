import { RentReviewData1 } from '../domain/RentReview/index.js'
import { LogisAngeRentReviewData1 } from '../domain/RentReview/LogisAngeRentReview/index.js'
import { RentReview } from '../infrastructure/RentReview.js'

export class LogisAngeRentReview extends RentReview {
  constructor(data: LogisAngeRentReviewData1) {
    const addresses = [
      '32 rue Henrie Durre\n59590 RAISMES',
      '32 A rue Henrie Durre\n59590 RAISMES',
      '32 B rue Henrie Durre\nAppartement n°3\n59590 RAISMES',
      '32 B rue Henrie Durre\nAppartement n°4\n59590 RAISMES',
      '32 B rue Henrie Durre\nAppartement n°5\n59590 RAISMES',
      '32 B rue Henrie Durre\nAppartement n°6\n59590 RAISMES'
    ]
    const LOCATAIRE = `${data.LOCATAIRE_NOM}\n${addresses[data.LOT]}`

    const newData: RentReviewData1 = {
      ...data,
      LOCATAIRE,
      BAILLEUR: 'SCI LOGIS ANGE\n259 rue de Wallers\n59590 RAISMES',
      SIGNATURE: 'Gabriel Brun, gérant de la SCI LOGIS ANGE'
    }
    super(newData)
  }
}
