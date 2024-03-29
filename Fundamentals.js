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
      learner_id: 1,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140,
      },
    },
  ];
  
  /*VALIDATE FUNCTIONS */
  
  //Checking if the course id is valid
  function assignmentsBelongsToCourse(assignmentGroup, courseInfo) {
    // Validate course and assignment group
    if (assignmentGroup.course_id !== courseInfo.id) {
      console.warn(
        `AssignmentGroup ${assignmentGroup.name} ID ${assignmentGroup.course_id} does not belong to the provided CourseInfo ${courseInfo.name}  ID ${courseInfo.id}`,
      );
      throw new Error(
        "AssignmentGroup does not belong to the provided CourseInfo",
      );
    }
  }
  
  //Filter assignments based on due date whish isn't start
  function removeFutureAssignment(assignmentGroup) {
    const currentDate = Date.now();
    const validAssignments = assignmentGroup.assignments.filter((assignment) => {
      const dueDate = Date.parse(assignment.due_at);
      if (dueDate <= currentDate && assignment.points_possible > 0)
        return assignment;
    });
    // console.log(validAssignments);
    return validAssignments;
  }
  
  //  VALIDATION //
  
  // VALIDATION DATA //
  function isString(value) {
    return typeof value === "string" && !(value instanceof String);
  }
  
  function isNumber(value) {
    return (
      typeof value === "number" && !isNaN(parseFloat(value)) && isFinite(value)
    );
  }
  
  function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime()); // getTime() returns NaN for invalid dates
  }
  
  function validateCourseInfo(courseInfo) {
    if (!isNumber(courseInfo.id)) {
      console.log(
        `Error in CourseInfo array. Please check course ${courseInfo.name} courseInfo.id must be a number`,
      );
      throw new Error(`Error in CourseInfo array.`);
    }
  
    if (!isString(courseInfo.name)) {
      console.log(
        `Error in CourseInfo array. Please check course ${courseInfo.id}. Course Name must be a string`,
      );
      throw new Error(`Error in CourseInfo array`);
    }
  
    // If all checks pass, return true
    return true;
  }
  
  function validateAssignmentGroup(assignment) {
    if (!isNumber(assignment.id)) {
      console.log(
        `Please check assignment ${assignment.name} Assignment id must be a number`,
      );
      throw new Error(`Error in AssignmentGroup array.`);
    }
  
    if (!isString(assignment.name)) {
      console.log(
        `Please check assignment ${assignment.id}. Assignment Name must be a string`,
      );
      throw new Error(`Error in AssignmentGroup array`);
    }
  
    if (!isNumber(assignment.course_id)) {
      console.log(
        `Please check assignment ${assignment.id} course_id must be a number`,
      );
      throw new Error(`Error in AssignmentGroup array.`);
    }
  
    if (!isNumber(assignment.group_weight)) {
      console.log(
        `Please check assignment ${assignment.id} group_weight must be a number`,
      );
      throw new Error(`Error in AssignmentGroup array.`);
    }
  
    // Check each assignment
    assignment.assignments.forEach((item) => {
      if (!isNumber(item.id)) {
        console.log(
          `Please check assignment ${item.name} assignments.id must be a number`,
        );
        throw new Error(`Error in AssignmentGroup array.`);
      }
  
      if (!isString(item.name)) {
        console.log(
          `Please check assignment ${item.id} assignments.name Name must be a string`,
        );
        throw new Error(`Error in AssignmentGroup array`);
      }
  
      if (!isValidDate(item.due_at)) {
        console.warn(
          ` Please check assignment ${item.id} assignments.due_at must be a Date`,
        );
        throw new Error(`Error in AssignmentGroup array.`);
      }
  
      if (!isNumber(item.points_possible)) {
        console.log(
          `Please check assignment ${item.id} assignments.points_possible must be a number`,
        );
        throw new Error(`Error in AssignmentGroup array.`);
      }
    });
  
    // If all checks pass, return true
    return true;
  }
  
  function validateLearnerData(submission) {
    if (!isNumber(submission.learner_id)) {
      console.warn(`Please check learners ID`);
      throw new Error(`Error in LearnerSubmission array.`);
    }
  
    if (!isNumber(submission.assignment_id)) {
      console.warn(
        `Please check learner ${submission.learner_id}.assignment_id must be a number`,
      );
      throw new Error(`Error in LearnerSubmission array.`);
    }
  
    if (!isValidDate(submission.submission.submitted_at)) {
      console.warn(
        `Please check learner ${submission.learner_id} in assignment ${submission.assignment_id} submitted_at must be a Date`,
      );
      throw new Error(`Error in LearnerSubmission array.`);
    }
  
    if (!isNumber(submission.submission.score)) {
      console.warn(
        `Please check learner ${submission.learner_id} in assignment ${submission.assignment_id} score must be a number`,
      );
      throw new Error(`Error in LearnerSubmission array.`);
    }
    // If all checks pass, return true
    return true;
  }
  
  // Check Score in AssignmentGroup and LearnerSubmissions arrays
  function validateScoreData(learnerassignment, assignment) {
    assignment.forEach((element) => {
      if (element.points_possible <= 0) {
        console.warn(
          `Please check assignment ID ${element.id} points_possible must be a greater 0`,
        );
        throw new Error(`Error in Assignment array.`);
      }
    });
  
    learnerassignment.forEach((learner) => {
      if (learner.submission.score < 0) {
        console.warn(
          `Please check Learner ${learner.learner_id} assignment ID ${learner.assignment_id} Score must be a greater 0`,
        );
        throw new Error(`Error in LearnerSubmissions array.`);
      }
    });
  
    assignment.forEach((array) => {
      learnerassignment.filter((learner) => {
        if (
          learner.assignment_id === array.id &&
          learner.submission.score > array.points_possible
        ) {
          console.warn(
            `Please check learner ${learner.learner_id}  assignment ID ${learner.assignment_id} SCORE must be less than or equal to ${array.points_possible}`,
          );
          throw new Error(`Error in LearnerSubmissions array.`);
        }
      });
    });
  }
  
  // START VALIDATION //
  
  // Checking all data for LearnerSubmissions array
  function validationData(courseInfo, assignmentGroup, learnerSubmissions) {
    try {
      // Check coursInfo
      validateCourseInfo(courseInfo);
      validateAssignmentGroup(assignmentGroup);
  
      assignmentsBelongsToCourse(assignmentGroup, courseInfo);
  
      learnerSubmissions.forEach((submission) => {
        validateLearnerData(submission);
      });
      validateScoreData(learnerSubmissions, assignmentGroup.assignments);
    } catch (error) {
      console.error(
        "Please check the data for the following error:",
        error.message,
      );
      return true;
    }
  }
  
  // END VALIDATION //
  
  /* MAIN CODE */
  function roundNumber(numberOne, numberTwo) {
    const number = Math.floor((numberOne / numberTwo) * 100) / 100;
    return number;
  }
  
  function getAssignmentsData(AssignmentGroup) {
    const assignmentData = AssignmentGroup.map((assignment) => ({
      id: assignment.id,
      points_possible: assignment.points_possible,
      due_date: assignment.due_at,
    }));
    return assignmentData;
  }
  
  // Return an array of objects, where each object represents a learner and has the following properties:
  
  function getLearner(LearnerSubmissions, idAndPoints) {
    const uniqueLearnerIDs = LearnerSubmissions.map(
      (submission) => submission.learner_id,
    ).filter((id, index, self) => self.indexOf(id) === index);
  
    // Array of learner IDs
    let learnerID = [];
    uniqueLearnerIDs.forEach((item) => {
      let obj = {};
      obj.id = item;
      learnerID.push(obj);
    });
  
    // Array of learner IDs and their properties
    let leanerIDSubmissions = [];
    for (let i = 0; i < learnerID.length; i++) {
      let newArray = LearnerSubmissions.filter(
        (item) => item.learner_id === learnerID[i].id,
      );
      leanerIDSubmissions.push(newArray);
    }
  
    //First analyze and transform submisson data for each learner
    for (let i = 0; i < leanerIDSubmissions.length; i++) {
      for (let j = 0; j < leanerIDSubmissions[i].length; j++) {
        leanerIDSubmissions[i][j].score =
          leanerIDSubmissions[i][j].submission.score;
        leanerIDSubmissions[i][j].submitted_at =
          leanerIDSubmissions[i][j].submission.submitted_at;
        // add information about each Assignment
        const currentAssigment = idAndPoints.find(
          (assignment) =>
            assignment.id === leanerIDSubmissions[i][j].assignment_id,
        );
        leanerIDSubmissions[i][j].points_possible =
          currentAssigment.points_possible;
  
        // check submision date and change score if it was late
        if (
          Date.parse(leanerIDSubmissions[i][j].submitted_at) >
          Date.parse(currentAssigment.due_date)
        ) {
          leanerIDSubmissions[i][j].score -=
            leanerIDSubmissions[i][j].points_possible * 0.1;
          leanerIDSubmissions[i][j].score = Math.max(
            leanerIDSubmissions[i][j].score,
            0,
          );
        }
        leanerIDSubmissions[i][j].percentage = roundNumber(
          leanerIDSubmissions[i][j].score,
          leanerIDSubmissions[i][j].points_possible,
        );
        delete leanerIDSubmissions[i][j].submission;
        delete leanerIDSubmissions[i][j].submitted_at;
      }
    }
    // add total score for each learner
    leanerIDSubmissions.forEach((learners) => {
      const sumSubmitted = learners.reduce(
        (accumulator, learner) => accumulator + learner.score,
        0,
      );
      learners.totalScore = sumSubmitted;
    });
    return leanerIDSubmissions;
  }
  
  // -----//------//
  
  // MAIN FUNCTION //
  function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
    // VALIDATION //
  
    const errorFind = validationData(
      CourseInfo,
      AssignmentGroup,
      LearnerSubmissions,
    );
  
    if (errorFind) {
      return;
    }
  
    // Remove all future assignments
    const currentAssignments = removeFutureAssignment(AssignmentGroup);
    //get all assignments info from AssignmentGroup
    const assignmentData = getAssignmentsData(currentAssignments);
  
    // Remove all futurer assignments from learner submissions
    const learnersCurrentAssignment = LearnerSubmissions.filter((submission) =>
      assignmentData.some(
        (assignment) => assignment.id === submission.assignment_id,
      ),
    );
  
    // Get learner data
    const arrayOfLearners = getLearner(learnersCurrentAssignment, assignmentData);
  
    // Total posibble points for all assignments
    const sumOfPointsPossible = currentAssignments.reduce(
      (accumulator, currentAssignment) => {
        return accumulator + currentAssignment.points_possible;
      },
      0,
    );
  
    // Generate output array
    let leanersOutput = [];
    let i = 0;
    while (i < arrayOfLearners.length) {
      let obj = {};
      obj.id = arrayOfLearners[i][0].learner_id;
      // obj.avg = Math.floor((arrayOfLearners[i].totalScore/sumOfPointsPossible)*100)/100;
      obj.avg = roundNumber(arrayOfLearners[i].totalScore, sumOfPointsPossible);
      for (let j in assignmentData) {
        for (let k in arrayOfLearners[i]) {
          if (arrayOfLearners[i][k].assignment_id === assignmentData[j].id) {
            obj[`${assignmentData[j].id}`] = arrayOfLearners[i][k].percentage;
          }
        }
      }
      leanersOutput.push(obj);
      i++;
    }
    return leanersOutput;
  }
  
  // MAIN CODE //
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);
  