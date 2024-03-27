// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50,
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150,
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500,
      },
    ],
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47,
      },
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150,
      },
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400,
      },
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39,
      },
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140,
      },
    },
  ];
  
  /* EXAMPLE */
  
  // function getLearnerData(course, ag, submissions) {
  //   // here, we would process this data to achieve the desired result.
  //   const result = [
  //     {
  //       id: 125,
  //       avg: 0.985, // (47 + 150) / (50 + 150)
  //       1: 0.94, // 47 / 50
  //       2: 1.0 // 150 / 150
  //     },
  //     {
  //       id: 132,
  //       avg: 0.82, // (39 + 125) / (50 + 150)
  //       1: 0.78, // 39 / 50
  //       2: 0.833 // late: (140 - 15) / 150
  //     }
  //   ];
  
  //   return result;
  // }
  
  // const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  
  
  /* MAIN CODE */
  
  //  Using a Set to track seen learner_ids
  function getLearner(LearnerSubmissions) {
  const uniqueLearnerIDs = LearnerSubmissions
    .map(submission => submission.learner_id) 
    .filter((id, index, self) => self.indexOf(id) === index); 
  
  let learnerID = [];
  uniqueLearnerIDs.forEach((item) => {
    let obj = {};
    obj.id = item;
    learnerID.push(obj);
  }); 
  let leanerIDSubmissions = [];
  
    for (let i=0; i<learnerID.length; i++) {
    let newArray = LearnerSubmissions.filter((item) => item.learner_id === learnerID[i].id)
    leanerIDSubmissions.push(newArray);
    }
  
    for (let i=0; i<leanerIDSubmissions.length; i++) {
      for (let j=0; j<leanerIDSubmissions[i].length; j++) {
      leanerIDSubmissions[i][j].score = leanerIDSubmissions[i][j].submission.score;
      leanerIDSubmissions[i][j].submitted_at = leanerIDSubmissions[i][j].submission.submitted_at;
      delete leanerIDSubmissions[i][j].submission;
    }
  }  
    return leanerIDSubmissions;
  }
  // -----//------//
  
  // Sum of possible scores for all assignments 
  const sumOfPointsPossible = AssignmentGroup.assignments.reduce((accumulator, currentAssignment) => {
    return accumulator + currentAssignment.points_possible;
  }, 0);
  console.log(sumOfPointsPossible);
  
  // Sum of scores for each Leaner for all assignments
  const arrayOfLearners = getLearner(LearnerSubmissions);
  for ( let i in arrayOfLearners) {
  let sumOfPointsLearner = arrayOfLearners[i].map((item) => {
    return item.score;})
  .reduce((accumulate,score) => (accumulate+score));
    arrayOfLearners[i].totalScore = sumOfPointsLearner;
  }
  
  // ----- // ------ //
  console.log(arrayOfLearners);
  
  // ----- // ------ //
  
  // Creat array with Assiignment ID, Points and Date
  const idAndPoints = AssignmentGroup.assignments.map(assignment => ({
    id: assignment.id,
    points_possible: assignment.points_possible,
    due_date: assignment.due_at
  }));
  
  console.log(idAndPoints);
  
  
  // Calculate average score for each learner 
  let leanersOutput = [];
  for (let i=0; i<arrayOfLearners.length; i++) {
    let obj = {};
    obj.id = arrayOfLearners[i][0].learner_id;
    obj.avg = Math.floor((arrayOfLearners[i].totalScore/ sumOfPointsPossible)*100)/100;
    for (let k in arrayOfLearners) {
      for (let i=0; i<idAndPoints.length; i++) {
        for (let j=0; j<arrayOfLearners[k].length; j++) {
          if (arrayOfLearners[k][j].assignment_id === idAndPoints[i].id) {            
                 obj[`id${idAndPoints[i].id}`] = Math.floor((arrayOfLearners[k][j].score/idAndPoints[i].points_possible)*100)/100;
          }
  
    }
       }
    }
    leanersOutput.push(obj);
  }
  
  
  console.log(leanersOutput);
  
  
  // ------ /// ---- //
  
  
  
  
  
  
  // let leanersOutput = [];
  // for (let i=0; i<arrayOfLearners.length; i++) {
  //   let obj = {};
  //   obj.id = arrayOfLearners[i][0].learner_id;
  //   obj.avg = Math.floor((arrayOfLearners[i].totalScore/ sumOfPointsPossible)*100)/100;  
  //   leanersOutput.push(obj);
  // }
  
  
  // console.log(leanersOutput);
  
  
  // for (let k in leanersOutput) {
  //   for (let i=0; i<idAndPoints.length; i++) {
  //     for (let j=0; j<arrayOfLearners[k].length; j++) {
  //       if (arrayOfLearners[k][j].assignment_id === idAndPoints[i].id) {
  //            leanersOutput[k][idAndPoints[i].id] = Math.floor((arrayOfLearners[k][j].score/idAndPoints[i].points_possible)*100)/100;
  //       }
  // }
  //    }
  // }
  // console.log(leanersOutput);
  
  
  
  /*let score = 0;
  let  score3 =  arrayOfLearners[0].map((assignment_scored) => {
    idAndPoints.forEach(assignment => {
    console.log(assignment.id);
    console.log(assignment_scored.assignment_id);
   if  (assignment_scored.assignment_id === assignment.id) {
         console.log(assignment_scored.score);
         console.log(assignment.points_possible);
        }
   score = Math.floor((assignment_scored.score/assignment.points_possible)*100)/100;  
  }); return score });
  
  console.log(score3);
  
  
   let score4 =  idAndPoints.map(assignment => {
      let learnScoreAssignment =  arrayOfLearners[0].map((assignment_scored) => {
      console.log(assignment.id);
     console.log(assignment_scored.assignment_id);
      if  (assignment_scored.assignment_id === assignment.id) {
         console.log(assignment_scored.score);
         console.log(assignment.points_possible);
        }
  return Math.floor((assignment_scored.score/assignment.points_possible)*100)/100;  
  }); 
     return learnScoreAssignment;
     });
  
  console.log(score4); 
  
  // Create array with Learner ID, Assignment ID, Score and Date
   let score5 = [];
    for (let i=0; i<idAndPoints.length; i++) {
      let obj = {};
      for (let j=0; j<arrayOfLearners[0].length; j++) {
        if (arrayOfLearners[0][j].assignment_id === idAndPoints[i].id) {
           obj[idAndPoints[i].id] = arrayOfLearners[0][j].score/idAndPoints[i].points_possible;
        }
  }
      score5.push(obj);
     }
  
  console.log(score5);*/
  // ------ /// ---- //
  
  
  
  
  ///////////////////
  
  
  
  
  
  
   // for (let i in uniqueLearnerIDs) {
   //   let obj = {};
   //   obj.learner_id = uniqueLearnerIDs[i];
        // learnerID.push(obj);
   //   console.log(obj);
   // }
  
  
  
  
  