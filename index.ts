import fs from 'fs'
import path from 'path'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'

// Charge le template .docx
const templatePath = path.resolve(
  '/home/gab/apps/250309-publipostage',
  'template.docx'
)
const content = fs.readFileSync(templatePath, 'binary')

const zip = new PizZip(content)
const doc = new Docxtemplater(zip, {
  paragraphLoop: true,
  linebreaks: true
})

// Données à injecter dans les { variables }
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
const NIND = nind.toFixed(2).replace('.', ',')
const ai = 143.46
const AI = ai.toFixed(2).replace('.', ',')

const lhc = 457.7
const LHC = lhc.toFixed(2).replace('.', ',')
const nlhc = lhc * (nind / ai)
const NLHC = nlhc.toFixed(2).replace('.', ',')
const charges = 0
const CHARGES = charges.toFixed(2).replace('.', ',')
const NOUVEAU_LOYER = (nlhc + charges).toFixed(2).replace('.', ',')
const REGLEMENT = 'juin 2025'

// SIGNATURE: 'Gabriel Brun, gérant de la SCI LOGIS ANGE'
const SIGNATURE = 'Gabriel BRUN'

doc.setData({
  BAILLEUR,
  CIVILITÉ,
  LOCATAIRE,
  DATE_COURRIER,
  TYPE_INDICE,
  TRIMESTRE,
  NIND,
  AI,
  LHC,
  NLHC,
  CHARGES,
  NOUVEAU_LOYER,
  REGLEMENT,
  SIGNATURE
})

try {
  doc.render() // Remplacement des balises
} catch (error: any) {
  console.error('Erreur de génération :', error)
}

const outputBuffer = doc.getZip().generate({ type: 'nodebuffer' })
fs.writeFileSync('revision-loyer.docx', outputBuffer)

console.log('✅ Document généré : revision-loyer.docx')
