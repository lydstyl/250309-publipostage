import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx'
import { writeFileSync } from 'fs'

// === Données personnalisables ===
const bailleur = {
  nom: 'Monsieur Martin Propriétaire',
  adresse: '25 rue des Lilas\n75010 Paris'
}

const locataire = {
  nom: 'Jean Dupont',
  adresse: '12 rue de la Paix\n75001 Paris'
}

const date = 'Paris, le 16 avril 2025'
const loyerActuel = 750
const nouveauLoyer = 780
const dateEffet = '1er mai 2025'

// === Création du document ===
const doc = new Document({
  sections: [
    {
      children: [
        // Adresse du bailleur
        new Paragraph({
          children: [
            new TextRun(bailleur.nom),
            new TextRun('\n'),
            new TextRun(bailleur.adresse)
          ]
        }),

        new Paragraph({ text: '', spacing: { after: 200 } }),

        // Adresse du locataire
        new Paragraph({
          children: [
            new TextRun(locataire.nom),
            new TextRun('\n'),
            new TextRun(locataire.adresse)
          ]
        }),

        new Paragraph({ text: '', spacing: { after: 200 } }),

        // Date alignée à droite
        new Paragraph({
          children: [new TextRun(date)],
          alignment: AlignmentType.RIGHT
        }),

        new Paragraph({ text: '', spacing: { after: 300 } }),

        // Objet du courrier
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

        // Formule d’appel
        new Paragraph('Madame, Monsieur,'),

        new Paragraph({ text: '', spacing: { after: 200 } }),

        // Corps de lettre
        new Paragraph(
          `Conformément à la clause de révision annuelle prévue dans le bail de location, nous vous informons que le loyer sera révisé à compter du ${dateEffet}.`
        ),

        new Paragraph(
          `Le loyer mensuel passera ainsi de ${loyerActuel} € à ${nouveauLoyer} € par mois. Cette augmentation tient compte de l'indice de référence des loyers (IRL) publié par l'INSEE.`
        ),

        new Paragraph(
          'Nous vous remercions de prendre en compte cette modification à compter de la date mentionnée ci-dessus.'
        ),

        new Paragraph({ text: '', spacing: { after: 300 } }),

        // Formule de politesse
        new Paragraph(
          'Nous vous prions d’agréer, Madame, Monsieur, l’expression de nos salutations distinguées.'
        ),

        new Paragraph({ text: '', spacing: { after: 500 } }),

        // Signature
        new Paragraph(bailleur.nom)
      ]
    }
  ]
})

// === Écriture du fichier ===
Packer.toBuffer(doc).then((buffer) => {
  writeFileSync('revision-loyer.docx', buffer)
  console.log("✅ Fichier 'revision-loyer.docx' généré avec mise en page !")
})
