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
        points_possible: 50, // change for checking
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
        due_at: "2023-13-15",
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
  
  
  
  
  
  /*VALIDATE FUNCTIONS */
  
  //Checking if the course id is valid
  function getLearnerData(assignmentGroup,courseInfo) {
  // Validate course and assignment group
  if (assignmentGroup.course_id !== courseInfo.id) {
    throw new Error("AssignmentGroup does not belong to the provided CourseInfo");
  }
  }
  
  /* MAIN CODE */
    
  
  //Filter assignments based on due date whish isn't start
  function getFuterAssignment(assignmentGroup) {
    const currentDate = new Date();
    const validAssignments = assignmentGroup.assignments.filter(assignment => {
      const dueDate = new Date(assignment.due_at);
      return dueDate > currentDate && assignment.points_possible > 0; // Avoided null and undefined values
    }); 
    return validAssignments;
  }
  
  // Return an array of objects, where each object represents a learner and has the following properties:
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
     // CHECKING //
    // console.log(`arrayOfLearners:`);
    // console.log(leanerIDSubmissions);
    // END CHECKING //
    
    return leanerIDSubmissions;
  }
  
  
  // -----//------//
  
  // --- // ---- // NEW MAIN CODE // ---- // --- //
  
  const futerAssignments = getFuterAssignment(AssignmentGroup);
  let arrayOfLearners = getLearner(LearnerSubmissions);
  
   // CHECKING //
  // console.log(`Futer assignments:`);
  // console.log(futerAssignments);
   // CHECKING //
  
  // Remove all valid assignments from the array of learners
  
  
  
  
  //------------------///
  // Sum of possible scores for all assignments 
  const sumOfPointsPossible = AssignmentGroup.assignments.reduce((accumulator, currentAssignment) => {
    return accumulator + currentAssignment.points_possible;
  }, 0);
     // CHECKING //
  // console.log(sumOfPointsPossible);
    // END CHECKING //
  
    
  // Sum of scores for each Leaner for all assignments
  // const arrayOfLearners = getLearner(LearnerSubmissions);
  for ( let i in arrayOfLearners) {
  let sumOfPointsLearner = arrayOfLearners[i].map((item) => {
    return item.score;})
  .reduce((accumulate,score) => (accumulate+score));
    arrayOfLearners[i].totalScore = sumOfPointsLearner;
  }
  
  // ----- // ------ //
   // CHECKING //
  // console.log(arrayOfLearners);
   // CHECKING //
  
  // ----- // ------ //
  
  // Creat array with Assiignment ID, Points and Date
  const idAndPoints = AssignmentGroup.assignments.map(assignment => ({
    id: assignment.id,
    points_possible: assignment.points_possible,
    due_date: assignment.due_at
  }));
  
   // CHECKING //
  // console.log(idAndPoints);
   // CHECKING //
  
  // Calculate average score for each learner 
  let leanersOutput = [];
  for (let i=0; i<arrayOfLearners.length; i++) {
    let obj = {};
    obj.id = arrayOfLearners[i][0].learner_id;
    obj.avg = Math.floor((arrayOfLearners[i].totalScore/ sumOfPointsPossible)*100)/100;
      for (let k=0; k<idAndPoints.length; k++) {
        for (let j=0; j<arrayOfLearners[i].length; j++) {
          if (arrayOfLearners[i][j].assignment_id === idAndPoints[k].id) {      
                  if (Date.parse(arrayOfLearners[i][j].submitted_at) <= Date.parse(idAndPoints[k].due_date)) {        
                    obj[`ast_id${idAndPoints[k].id}`] = Math.floor((arrayOfLearners[i][j].score/idAndPoints[k].points_possible)*100)/100; 
                  }  else  {
                    arrayOfLearners[i][j].score -= idAndPoints[k].points_possible*0.1;
                    arrayOfLearners[i][j].score = Math.max(arrayOfLearners[i][j].score, 0); // Ensure score does not go negative   
                    obj[`ast_id${idAndPoints[k].id}`] = Math.floor((arrayOfLearners[i][j].score/idAndPoints[k].points_possible)*100)/100; 
                  } 
                 }
             }
  }
    leanersOutput.push(obj);
  }
  console.log(leanersOutput);