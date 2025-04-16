import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx'
import { writeFileSync } from 'fs'

// === Données à personnaliser ===
const bailleur = {
  nom: 'SCI LOGIS ANGE',
  adresse: '259 rue de Wallers\n59590 RAISMES'
}

const locataire = {
  nom: 'ZUREK',
  logement: 'Appartement n°3',
  adresse: '32 B rue Henri Durre\n59590 RAISMES'
}

const ville = 'Raismes'
const date = '25/12/2024'
const loyerHC = 492.0
const charges = 54.0
const nouvelIndice = 145.17
const ancienIndice = 140.65 // exemple

const nouveauLoyerHC = +(loyerHC * (nouvelIndice / ancienIndice)).toFixed(2)
const loyerTotal = +(nouveauLoyerHC + charges).toFixed(2)

// === Création du document ===
const doc = new Document({
  sections: [
    {
      children: [
        // Bailleur
        new Paragraph({
          children: [
            new TextRun(bailleur.nom),
            new TextRun('\n' + bailleur.adresse)
          ]
        }),
        new Paragraph({ text: '', spacing: { after: 200 } }),

        // Locataire
        new Paragraph({
          children: [
            new TextRun(locataire.nom),
            new TextRun('\n' + locataire.logement),
            new TextRun('\n' + locataire.adresse)
          ]
        }),
        new Paragraph({ text: '', spacing: { after: 200 } }),

        // Date alignée à droite
        new Paragraph({
          children: [new TextRun(`à ${ville}, le ${date}`)],
          alignment: AlignmentType.RIGHT
        }),
        new Paragraph({ text: '', spacing: { after: 200 } }),

        // Objet
        new Paragraph({
          children: [
            new TextRun({
              text: 'Objet : Révision annuelle du loyer',
              bold: true,
              underline: {}
            })
          ]
        }),
        new Paragraph({ text: '', spacing: { after: 300 } }),

        // Formule d’appel vide
        new Paragraph(','),

        new Paragraph({ text: '', spacing: { after: 200 } }),

        // Corps du texte
        new Paragraph(
          'Conformément aux dispositions de votre bail, la valeur de votre loyer est indexée sur l’évolution de l’Indice de Référence des Loyers de l’INSEE du deuxième trimestre de chaque année.'
        ),

        new Paragraph(
          `Récemment publié, cet indice s’établit désormais à ${nouvelIndice}.`
        ),

        new Paragraph('La formule de calcul de votre loyer est la suivante :'),

        new Paragraph({
          text: 'Nouveau loyer hors charges = Loyer hors charges × Nouvel indice ÷ Ancien indice'
          // italics: true
        }),

        new Paragraph({ text: '', spacing: { after: 100 } }),

        new Paragraph(
          `En conséquence, le montant de votre nouveau loyer hors charges indexé est de ${nouveauLoyerHC.toFixed(
            2
          )} € :`
        ),

        new Paragraph({
          text: `${nouveauLoyerHC.toFixed(
            2
          )} = ${loyerHC} × ${nouvelIndice} ÷ ${ancienIndice}`
          // italics: true
        }),

        new Paragraph({ text: '', spacing: { after: 200 } }),

        new Paragraph(
          `En ajoutant vos charges actuelles (${charges} €) nous obtenons votre nouveau loyer charges comprises: ${loyerTotal.toFixed(
            2
          )} €.`
        ),

        new Paragraph({ text: '', spacing: { after: 200 } }),

        new Paragraph(
          'Je vous remercie de bien vouloir appliquer cette augmentation lors du règlement de votre loyer de février 2025.'
        ),

        new Paragraph({ text: '', spacing: { after: 300 } }),

        new Paragraph(
          'Je vous prie de bien vouloir agréer, , l’expression de mes sentiments cordiaux.'
        ),

        new Paragraph({ text: '', spacing: { after: 400 } }),

        new Paragraph('Gabriel Brun, gérant de la SCI LOGIS ANGE')
      ]
    }
  ]
})

// === Génération du fichier .docx ===
Packer.toBuffer(doc).then((buffer) => {
  writeFileSync('revision-loyer.docx', buffer)
  console.log("✅ Fichier 'revision-loyer.docx' généré avec succès !")
})
