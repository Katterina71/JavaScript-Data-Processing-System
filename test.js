
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
  
function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
    // Validate course and assignment group
    if (assignmentGroup.course_id !== courseInfo.id) {
      throw new Error("AssignmentGroup does not belong to the provided CourseInfo");
    }
  
    // Current date for comparison
    const currentDate = new Date();
  
    // Filter assignments based on due date and points possible
    const validAssignments = assignmentGroup.assignments.filter(assignment => {
      const dueDate = new Date(assignment.due_at);
      return dueDate > currentDate && assignment.points_possible > 0;
    });
  
    // Process each learner submission
    let learnersData = learnerSubmissions.reduce((acc, submission) => {
      const assignment = validAssignments.find(a => a.id === submission.assignment_id);
      if (!assignment) return acc; // Skip if assignment not valid or not found
  
      // Calculate the percentage score, adjust for late submissions if needed
      const dueDate = new Date(assignment.due_at);
      const submittedAt = new Date(submission.submission.submitted_at);
      let scorePercentage = (submission.submission.score / assignment.points_possible) * 100;
      if (submittedAt > dueDate) { // Deduct 10% for late submissions
        scorePercentage -= 10 * (assignment.points_possible / 100);
      }
      scorePercentage = Math.max(scorePercentage, 0); // Ensure score is not negative
  
      // Find or initialize the learner's data
      let learnerData = acc.find(data => data.id === submission.learner_id) || {
        id: submission.learner_id,
        avg: 0, // This will be calculated later
        totalWeightedScore: 0, // For internal calculation
        totalWeight: 0 // For internal calculation
      };
  
      // Add/update the score for the specific assignment
      learnerData[assignment.id] = scorePercentage;
  
      // Update weighted score and weight for average calculation
      learnerData.totalWeightedScore += scorePercentage * assignment.points_possible;
      learnerData.totalWeight += assignment.points_possible;
  
      // Calculate average if needed
      if (learnerData.totalWeight > 0) {
        learnerData.avg = (learnerData.totalWeightedScore / learnerData.totalWeight);
      }
  
      // If this is a new learner, add them to the accumulator
      if (!acc.find(data => data.id === submission.learner_id)) {
        acc.push(learnerData);
      }
  
      return acc;
    }, []);
  
    // Remove temporary keys used for calculations
    learnersData = learnersData.map(learner => {
      delete learner.totalWeightedScore;
      delete learner.totalWeight;
      return learner;
    });
  
    return learnersData;
  }


  console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));