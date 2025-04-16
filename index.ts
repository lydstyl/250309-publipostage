import fs from 'fs'
import path from 'path'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { DocxOptions } from './domain/DocxOptions/index.js'
import {
  RentReviewOptions2,
  RentReviewOptions,
  RentReviewData1,
  RentReviewData2
} from './domain/RentReview/index.js'
import {
  GabrielRentReviewData1,
  GabrielRentReviewOptions
} from './domain/RentReview/GabrielRentReview/index.js'

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
    fs.writeFileSync(this.options.filtePath, outputBuffer)

    console.log('✅ Document généré :', this.options.filtePath)
  }
}

class RentReview extends Docx {
  options: RentReviewOptions2
  constructor(options: RentReviewOptions) {
    super(options)
    const newData = this.transformData(options.data)
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
      NOUVEAU_LOYER
    }
  }
}

class GabrielRentReview extends RentReview {
  constructor(options: GabrielRentReviewOptions) {
    const newOptions: RentReviewOptions = {
      ...options,
      data: {
        ...options.data,
        BAILLEUR: 'Gabriel BRUN\n259 rue de Wallers\n59590 RAISMES',
        SIGNATURE: 'Gabriel BRUN'
      }
    }
    super(newOptions)
  }
}

// DATA
// BAILLEUR: 'SCI LOGIS ANGE\n259 rue de Wallers\n59590 RAISMES',
const BAILLEUR = 'Gabriel BRUN\n259 rue de Wallers\n59590 RAISMES'

const CIVILITÉ = 'Monsieur'
// LOCATAIRE= 'ZUREK\nAppartement n°3\n32 B rue Henri Durre\n59590 RAISMES'
const LOCATAIRE =
  'TESTELIN Cyrille\n1 bis cour Patrice\n59230 ST AMAND LES EAUX'

const DATE_COURRIER = '16/04/2025'

const TYPE_INDICE = 'Indice de Référence des Loyers (IRL)'

// TRIMESTRE= '2ᵉ'
const TRIMESTRE = '1er'

const nind = 145.47
const ai = 143.46

const lhc = 457.7
const charges = 0
const REGLEMENT = 'juin 2025'

// SIGNATURE: 'Gabriel Brun, gérant de la SCI LOGIS ANGE'
const SIGNATURE = 'Gabriel BRUN'

const data: GabrielRentReviewData1 = {
  // BAILLEUR,
  CIVILITÉ,
  LOCATAIRE,
  DATE_COURRIER,
  TYPE_INDICE,
  TRIMESTRE,

  nind,
  ai,
  lhc,
  charges,

  REGLEMENT
  // SIGNATURE
}

// CREATE DOCX
new GabrielRentReview({
  templatePath: path.resolve(
    '/home/gab/apps/250309-publipostage',
    'templates',
    'template.docx'
  ),
  filtePath: path.resolve(
    '/home/gab/apps/250309-publipostage',
    'output',
    'revision-loyer.docx'
  ),
  data
}).generate()
