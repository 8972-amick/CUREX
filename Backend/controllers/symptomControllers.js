// import prisma from "../db/prisma.js";                            

// export const analyzeSymptoms = async (req, res) => {
//   try {
//     const { symptoms } = req.body; // Expecting an array of symptom names from the user

//     if (!symptoms || symptoms.length === 0) {
//       return res.status(400).json({
//         message: "Symptoms are required"
//       });
//     }

//     // Convert input from userto lowercase
//     const symptomList = symptoms.map(s => s.toLowerCase());

//     // this finds the matchining symptoms in the database
//     // const matchedSymptoms = await prisma.symptom.findMany({
//     //   where: {
//     //     name: {
//     //       in: symptomList
//     //     }
//     //   }
//     // });

//     const matchedSymptoms = await prisma.symptom.findMany({
//   where: {
//     OR: symptomList.map(name => ({
//       name: {
//         equals: name,
//         mode: "insensitive"
//       }
//     }))
//   }
// });

//     if (matchedSymptoms.length === 0) {
//       return res.json({
//         possibleConditions: [],// No conditions can be suggested without matching symptoms
//         advice: "No matching symptoms found. Please consult a doctor."
//       });
//     }

//     // Find diseases linked to these symptoms
//     const diseases = await prisma.disease.findMany({
//       where: {
//         symptoms: {
//           some: {
//             symptomId: {
//               in: matchedSymptoms.map(s => s.id) // Get the IDs of the matched symptoms
//             }
//           }
//         }
//       },
//       include: {
//         symptoms: {
//           include: {
//             symptom: true
//           }
//         }
//       }
//     });

//     res.json({
//       possibleConditions: diseases.map(d => d.name),
//       matchedSymptoms: matchedSymptoms.map(s => s.name),
//       disclaimer: "This is not a medical diagnosis."
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


import prisma from "../db/prisma.js";

export const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    // ✅ Validate input
    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({
        message: "Symptoms are required",
      });
    }

    // ✅ साफ input (trim + lowercase)
    const symptomList = symptoms.map((s) => s.trim().toLowerCase());

    console.log("Incoming:", symptoms);
    console.log("Processed:", symptomList);

    // ✅ Match symptoms (case-insensitive + flexible)
    const matchedSymptoms = await prisma.symptom.findMany({
      where: {
        OR: symptomList.map((name) => ({
          name: {
            contains: name, // more forgiving than equals
            mode: "insensitive",
          },
        })),
      },
    });

    console.log("Matched Symptoms:", matchedSymptoms);

    // ❌ No matches
    if (matchedSymptoms.length === 0) {
      return res.json({
        possibleConditions: [],
        matchedSymptoms: [],
        advice: "No matching symptoms found. Please consult a doctor.",
      });
    }

    const matchedIds = matchedSymptoms.map((s) => s.id);

    // ✅ Find diseases (IMPORTANT: adjust relation name if needed)
    const diseases = await prisma.disease.findMany({
      where: {
        symptoms: {
          // ⚠️ change to "diseaseSymptoms" if that's your schema
          some: {
            symptomId: {
              in: matchedIds,
            },
          },
        },
      },
      include: {
        symptoms: {
          include: {
            symptom: true,
          },
        },
      },
    });

    console.log("Diseases Found:", diseases);

    // ✅ Optional: ranking (better UX)
    const ranked = diseases.map((disease) => {
      const diseaseSymptomIds = disease.symptoms.map((ds) => ds.symptomId);

      const matchCount = diseaseSymptomIds.filter((id) =>
        matchedIds.includes(id)
      ).length;

      return {
        name: disease.name,
        matchCount,
        totalSymptoms: diseaseSymptomIds.length,
        matchPercentage: Math.round(
          (matchCount / diseaseSymptomIds.length) * 100
        ),
      };
    });

    // ✅ Sort by best match
    ranked.sort((a, b) => b.matchPercentage - a.matchPercentage);

    // ✅ Final response
    res.json({
      possibleConditions: ranked,
      matchedSymptoms: matchedSymptoms.map((s) => s.name),
      disclaimer: "This is not a medical diagnosis.",
    });
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};