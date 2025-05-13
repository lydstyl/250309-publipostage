import { StAmandRentReview } from './application/GabrielRentReview.js'
import { LogisAngeRentReview } from './application/LogisAngeRentReview.js'

// todo new MailMerge

// CREATE DOCX
// new StAmandRentReview({
//   DATE_COURRIER: '07/05/2025',

//   CIVILITÉ: 'Monsieur',
//   LOCATAIRE_NOM: 'TESTELIN Cyrille',
//   TRIMESTRE: '1er',

//   nind: 145.47,
//   ai: 143.46,
//   lhc: 457.7,
//   charges: 0,

//   REGLEMENT: 'juin 2025'
// }).generate()

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

new LogisAngeRentReview({
  DATE_COURRIER: '15/07/2025',

  LOT: 6,

  CIVILITÉ: 'Monsieur',
  LOCATAIRE_NOM: 'MAHIEU Jean-Yves',
  TRIMESTRE: '2ième', // ok

  nind: 200, // change this
  ai: 145.17, // ok for 2025
  lhc: 345, // ok for 2025
  charges: 50, // ok for 2025

  REGLEMENT: 'septembre 2025' // ok for 2025
}).generate()
