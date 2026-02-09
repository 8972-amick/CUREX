import prisma from "../db/prisma.js";                            

export const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({
        message: "Symptoms are required"
      });
    }

    // Convert input from userto lowercase
    const symptomList = symptoms.map(s => s.toLowerCase());

    // this finds the matchining symptoms in the database
    const matchedSymptoms = await prisma.symptom.findMany({
      where: {
        name: {
          in: symptomList
        }
      }
    });

    if (matchedSymptoms.length === 0) {
      return res.json({
        possibleConditions: [],
        advice: "No matching symptoms found. Please consult a doctor."
      });
    }

    // Find diseases linked to these symptoms
    const diseases = await prisma.disease.findMany({
      where: {
        symptoms: {
          some: {
            symptomId: {
              in: matchedSymptoms.map(s => s.id)
            }
          }
        }
      },
      include: {
        symptoms: {
          include: {
            symptom: true
          }
        }
      }
    });

    res.json({
      possibleConditions: diseases.map(d => d.name),
      matchedSymptoms: matchedSymptoms.map(s => s.name),
      disclaimer: "This is not a medical diagnosis."
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
