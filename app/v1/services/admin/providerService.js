const db = require("../../../../config/pgsql");
class providerService {
  getQuestionPaper(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const table = `"question"`;
        const selectParams = `
        "question",
        "subject",
        "topic",
        "difficulty",
        "marks"`;

        const where1 = `difficulty = 'Easy'`;
        const where2 = `difficulty = 'Medium'`;
        const where3 = `difficulty = 'Hard'`;

        let paper1 = await db.select(table, selectParams, where1);
        let paper2 = await db.select(table, selectParams, where2);
        let paper3 = await db.select(table, selectParams, where3);

        if (!paper1.length || !paper2.length || !paper3.length) {
          throw {
            message: "QUESTION_NOT_FOUND",
            statusCode: 403,
          };
        }

        let totalMarks = 0;
        let easyQuestions = [];
        let mediumQuestions = [];
        let hardQuestions = [];

        for (let question of paper1) {
          while (totalMarks < 20) {
            let randomIndex = Math.floor(Math.random() * paper1.length);
            console.log("\n Random Index----------->", randomIndex);

            question = {
              question: paper1[randomIndex].question,
              subject: paper1[randomIndex].subject,
              topic: paper1[randomIndex].topic,
              difficulty: paper1[randomIndex].difficulty,
              marks: paper1[randomIndex].marks,
            };
            easyQuestions.push(question);
            totalMarks = totalMarks + paper1[randomIndex].marks;
          }
        }

        for (let question of paper2) {
          while (totalMarks < 70) {
            let randomIndex = Math.floor(Math.random() * paper2.length);
            console.log("Random Index----------->", randomIndex);

            question = {
              question: paper2[randomIndex].question,
              subject: paper2[randomIndex].subject,
              topic: paper2[randomIndex].topic,
              difficulty: paper2[randomIndex].difficulty,
              marks: paper2[randomIndex].marks,
            };
            mediumQuestions.push(question);
            totalMarks = totalMarks + paper2[randomIndex].marks;
          }
        }

        for (let question of paper3) {
          while (totalMarks < 100) {
            let randomIndex = Math.floor(Math.random() * paper3.length);
            console.log("Random Index----------->", randomIndex);

            question = {
              question: paper3[randomIndex].question,
              subject: paper3[randomIndex].subject,
              topic: paper3[randomIndex].topic,
              difficulty: paper3[randomIndex].difficulty,
              marks: paper3[randomIndex].marks,
            };

            hardQuestions.push(question);
            totalMarks = totalMarks + paper3[randomIndex].marks;
          }
        }

        return resolve({
          Easy: easyQuestions,
          Medium: mediumQuestions,
          Hard: hardQuestions,
          totalMarks,
        });
      } catch (error) {
        console.log(`\n get question paper error ${error}`, error);
        return reject(error);
      }
    });
  }
}

module.exports = new providerService();
