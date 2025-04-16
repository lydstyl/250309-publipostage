import fs from 'fs'
import path from 'path'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { DocxOptions } from './domain/DocxOptions/index.js'
import {
  RentReviewOptions2,
  RentReviewData1,
  RentReviewData2
} from './domain/RentReview/index.js'
import { GabrielRentReviewData1 } from './domain/RentReview/GabrielRentReview/index.js'
import { StAmandRentReviewData1 } from './domain/RentReview/GabrielRentReview/StAmand/index.js'
import { LogisAngeRentReviewData1 } from './domain/RentReview/LogisAngeRentReview/index.js'

class Docx {
  options: DocxOptions
  constructor(options: DocxOptions) {
    this.options = options
  }
  generate() {
    const { templatePath, filtePath, data } = this.options

    // Charge le template .docx
    const content = fs.readFileSync(templatePath, 'binary')
    const zip = new PizZip(content)
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true
    })

    try {
      doc.render(data)
    } catch (error: any) {
      console.error('Erreur de génération :', error)
    }

    const outputBuffer = doc.getZip().generate({ type: 'nodebuffer' })
    fs.writeFileSync(filtePath, outputBuffer)

    console.log('✅ Document généré :', this.options.filtePath)
  }
}

class RentReview extends Docx {
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

class GabrielRentReview extends RentReview {
  constructor(data: GabrielRentReviewData1) {
    const newData: RentReviewData1 = {
      ...data,
      BAILLEUR: 'Gabriel BRUN\n259 rue de Wallers\n59590 RAISMES',
      SIGNATURE: 'Gabriel BRUN'
    }
    super(newData)
  }
}
class StAmandRentReview extends GabrielRentReview {
  constructor(data: StAmandRentReviewData1) {
    const newOptions: GabrielRentReviewData1 = {
      ...data,
      LOCATAIRE: `${data.LOCATAIRE_NOM}\n1 bis cour Patrice\n59230 ST AMAND LES EAUX`
    }
    super(newOptions)
  }
}

// todo class RoubaixRentReview

class LogisAngeRentReview extends RentReview {
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

// CREATE DOCX

new StAmandRentReview({
  DATE_COURRIER: '16/04/2025',

  CIVILITÉ: 'Monsieur',
  LOCATAIRE_NOM: 'TESTELIN Cyrille',
  TRIMESTRE: '1er',

  nind: 145.47,
  ai: 143.46,
  lhc: 457.7,
  charges: 0,

  REGLEMENT: 'juin 2025'
}).generate()

// new LogisAngeRentReview({
//   DATE_COURRIER: '16/04/2025',

//   LOT: 4,

//   CIVILITÉ: 'Monsieur',
//   LOCATAIRE_NOM: 'LEDUC Christian',
//   TRIMESTRE: '1er', // changer

//   nind: 145.47, // changer
//   ai: 143.46, // changer
//   lhc: 457.7, // changer
//   charges: 50, // changer

//   REGLEMENT: 'juin 2025' // changer
// }).generate()
