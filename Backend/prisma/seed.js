import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const symptomNames = [
    "fever",
    "headache",
    "cough",
    "sore throat",
    "fatigue",
    "runny nose",
    "muscle ache",
    "nausea",
    "vomiting",
    "diarrhea",
    "rash",
    "itchiness",
    "shortness of breath",
    "chest pain",
    "abdominal pain",
    "dizziness",
    "loss of appetite",
  ];

  for (const name of symptomNames) {
    const existing = await prisma.symptom.findFirst({ where: { name } });
    if (!existing) {
      await prisma.symptom.create({ data: { name } });
    }
  }

  const allSymptoms = await prisma.symptom.findMany();

  const getSymptomIds = (names) =>
    allSymptoms.filter((s) => names.includes(s.name)).map((s) => s.id);

  const diseaseConfigs = [
    {
      name: "Common Cold",
      symptomNames: ["cough", "runny nose", "sore throat", "headache"],
    },
    {
      name: "Influenza (Flu)",
      symptomNames: ["fever", "headache", "cough", "fatigue", "muscle ache", "runny nose"],
    },
    {
      name: "Allergic Rhinitis",
      symptomNames: ["runny nose", "itchiness", "rash"],
    },
    {
      name: "Gastroenteritis",
      symptomNames: ["nausea", "vomiting", "diarrhea", "abdominal pain"],
    },
  ];

  for (const config of diseaseConfigs) {
    let disease = await prisma.disease.findFirst({ where: { name: config.name } });
    if (!disease) {
      disease = await prisma.disease.create({ data: { name: config.name } });
    }
    const symptomIds = getSymptomIds(config.symptomNames);
    for (const symptomId of symptomIds) {
      const existing = await prisma.diseaseSymptom.findFirst({
        where: { diseaseId: disease.id, symptomId },
      });
      if (!existing) {
        await prisma.diseaseSymptom.create({
          data: { diseaseId: disease.id, symptomId },
        });
      }
    }
  }

  console.log("Seed completed: symptoms and diseases added.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
