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
        due_at: "3467-12-15",
        points_possible: 500,
      },
  
      {
        id: 4,
        name: "Code the World",
        due_at: "3468-12-15",
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
        submitted_at: "2023-13-25",
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
  
  
  
  
  /*VALIDATE FUNCTIONS */
  
  //Checking if the course id is valid
  function assignmentsBelongsToCourse(assignmentGroup,courseInfo) {
  // Validate course and assignment group
  if (assignmentGroup.course_id !== courseInfo.id) {
    console.warn(`AssignmentGroup ${assignmentGroup.name} ID ${assignmentGroup.course_id} does not belong to the provided CourseInfo ${courseInfo.name}  ID ${courseInfo.id}`);
    throw new Error("AssignmentGroup does not belong to the provided CourseInfo");
  }
  }
  
  //Filter assignments based on due date whish isn't start
  function removeFuterAssignment(assignmentGroup) {
    const currentDate = Date.now();
    const validAssignments = assignmentGroup.assignments.filter(assignment => {
      const dueDate = Date.parse(assignment.due_at);  
      if (dueDate <= currentDate && assignment.points_possible > 0) 
        return assignment;
    }); 
    // console.log(validAssignments);
    return validAssignments;
  }
  
  //  VALIDATION //
  
  function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }
  
  function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime()); // getTime() returns NaN for invalid dates
  }
  
  function validateLearnerSubmission(submission) {
    if (!isNumber(submission.learner_id)) {
      throw new Error('learner_id must be a number');
    }
  
    if (!isNumber(submission.assignment_id)) {
      throw new Error('assignment_id must be a number');
    }
  
    if (!isValidDate(submission.submission.submitted_at)) {
      throw new Error('submitted_at must be a valid date string');
    }
  
    if (!isNumber(submission.submission.score)) {
      throw new Error('score must be a number');
    }
  
    // If all checks pass, return true
    return true;
  }
  
  
  
  
  // START VALIDATION //
  
  // Checking all data for LearnerSubmissions array
  LearnerSubmissions.forEach(submission => {
  try {
    const submissionCheck = submission;
    if (validateLearnerSubmission(submissionCheck)) {
      console.log(`Submission ${submissionCheck.assignment_id} for Learner ${submissionCheck.learner_id} is valid.`);
    }
  } catch (error) {
    console.error(error.message);
  }
  
  })
  
  // Checking all data for LearnerSubmissions array
  LearnerSubmissions.forEach(submission => {
  try {
    const submissionCheck = submission;
    if (validateLearnerSubmission(submissionCheck)) {
      console.log(`Submission ${submissionCheck.assignment_id} for Learner ${submissionCheck.learner_id} is valid.`);
    }
  } catch (error) {
    console.error(error.message);
  }
  
  })
  
  
  // END VALIDATION //
  
  
  
  /* MAIN CODE */
    
  
  function getAssignmentsData(AssignmentGroup) {
  const assignmentData = AssignmentGroup.map(assignment => ({
      id: assignment.id,
      points_possible: assignment.points_possible,
      due_date: assignment.due_at
  }));
   return assignmentData;
  }
  
  // Return an array of objects, where each object represents a learner and has the following properties:
  
  function getLearner(LearnerSubmissions, idAndPoints) {
  const uniqueLearnerIDs = LearnerSubmissions
    .map(submission => submission.learner_id) 
    .filter((id, index, self) => self.indexOf(id) === index); 
  
  // Array of learner IDs
  let learnerID = [];
  uniqueLearnerIDs.forEach((item) => {
    let obj = {};
    obj.id = item;
    learnerID.push(obj);
  }); 
  
  
  // Array of learner IDs and their properties
  let leanerIDSubmissions = [];
    for (let i=0; i<learnerID.length; i++) {
    let newArray = LearnerSubmissions.filter((item) => item.learner_id === learnerID[i].id)
    leanerIDSubmissions.push(newArray);
    }
  
  //First analyze and transform submisson data for each learner
    for (let i=0; i<leanerIDSubmissions.length; i++) {
      for (let j=0; j<leanerIDSubmissions[i].length; j++) {
      leanerIDSubmissions[i][j].score = leanerIDSubmissions[i][j].submission.score;
      leanerIDSubmissions[i][j].submitted_at = leanerIDSubmissions[i][j].submission.submitted_at;
        // add information about each Assignment
      const currentAssigment = idAndPoints.find((assignment) => (assignment.id === leanerIDSubmissions[i][j].assignment_id)); 
      leanerIDSubmissions[i][j].points_possible = currentAssigment.points_possible;
  
      // check submision date and change score if it was late
        if (Date.parse(leanerIDSubmissions[i][j].submitted_at) > Date.parse(currentAssigment.due_date)) {        
            leanerIDSubmissions[i][j].score -=  leanerIDSubmissions[i][j].points_possible*0.1;
            leanerIDSubmissions[i][j].score = Math.max(leanerIDSubmissions[i][j].score, 0);
        }    
        leanerIDSubmissions[i][j].percentage = Math.floor(( leanerIDSubmissions[i][j].score/leanerIDSubmissions[i][j].points_possible)*100)/100;    
      delete leanerIDSubmissions[i][j].submission;
      delete leanerIDSubmissions[i][j].submitted_at;
    }
  }  
      // add total score for each learner
      leanerIDSubmissions.forEach((learners) => {
      const sumSubmitted = learners.reduce((accumulator, learner) => accumulator + learner.score, 0,);
      learners.totalScore = sumSubmitted;     
    })
    return leanerIDSubmissions;
  }
  
  // -----//------//
  
  
  // MAIN FUNCTION //
  function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
    
  // VALIDATION //
    assignmentsBelongsToCourse(AssignmentGroup,CourseInfo);
  
  
  
  
    
  // Remove all futer assignments
  const currentAssignments = removeFuterAssignment(AssignmentGroup);
  const assignmentData = getAssignmentsData(currentAssignments);
  
  // Remove all futer assignments from learner submissions
  const learnersCurrentAssignment = LearnerSubmissions.filter(submission => 
    assignmentData.some(assignment => assignment.id === submission.assignment_id)
    );
    
  // Get learner data  
  const arrayOfLearners = getLearner(learnersCurrentAssignment, assignmentData);
  
  // Total posibble points for all assignments
  const sumOfPointsPossible = currentAssignments.reduce((accumulator, currentAssignment) => {
    return accumulator + currentAssignment.points_possible;
  }, 0);
  
  // Generate output array
  let leanersOutput = [];
  for (let i=0; i<arrayOfLearners.length; i++) {
    let obj = {};
    obj.id = arrayOfLearners[i][0].learner_id;
    obj.avg = Math.floor((arrayOfLearners[i].totalScore/sumOfPointsPossible)*100)/100;
    for (let j in assignmentData) {
      for (let k in arrayOfLearners[i]){
        if (arrayOfLearners[i][k].assignment_id === assignmentData[j].id) {
           obj[`${assignmentData[j].id}`] = arrayOfLearners[i][k].percentage; }
      }
    }
    leanersOutput.push(obj);
  }
  return leanersOutput;
  }
  
  
  
  // MAIN CODE //
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)
  console.log(result);
  
  