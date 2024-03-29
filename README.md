# JavaScript Data Processing System

## Overview
This project represents of a JavaScript-based assignment that focuses on data processing and manipulation within the educational domain. The primary goal was to develop a script capable of analyzing and transforming educational data into a structured and insightful format.

Visit the completed project [JavaScript Processing System Page](https://htmlpreview.github.io/?https://github.com/Katterina71/jsSBA308/blob/main/index.html).


## Task Description
The script created for this project, named getLearnerData(), performs the following key operations:

1. **Data Input:** Accepts three specific types of data as input parameters:


* `CourseInfo` object, which looks like this:
```
{
  "id": number,
  "name": string,
}
```
* `AssignmentGroup` object, which looks like this:
```{
  "id": number,
  "name": string,
  // the ID of the course the assignment group belongs to
  "course_id": number,
  // the percentage weight of the entire assignment group
  "group_weight": number,
  "assignments": [AssignmentInfo],
}
``````
* Each `AssignmentInfo object` within the `assignments` array looks like this:
``````
{
  "id": number,
  "name": string,
  // the due date for the assignment
  "due_at": Date string,
  // the maximum points possible for the assignment
  "points_possible": number,
}
``````

* Array of `LearnerSubmission`` objects, which each look like this:
```
{
    "learner_id": number,
    "assignment_id": number,
    "submission": {
      "submitted_at": Date string,
      "score": number
    }
}
``````

2. **Output:** Returns an array of objects. Each object contains a learner's ID, their weighted average score, and individual assignment scores as percentage values.
3. **Validation:** Ensure the AssignmentGroup belongs to the correct course by matching `course_id`. Throw an error for invalid data.
4. **Error Handling:** Manage errors gracefully, such as division by zero or unexpected data types.


## Additional Considerations
**Exclude Un-due Assignments:** If an assignment's due date has not yet passed, exclude it from the results and the average score calculations. This ensures that only relevant and due assignments contribute to the learner's performance metrics.
**Late Submission Penalty:** For submissions that are late (where `submitted_at` is `past due_at`), deduct 10 percent of the total points possible from the learner's score for that particular assignment. This penalty reflects the importance of meeting deadlines and affects the learner's total score accordingly.

   
## Objectives Achieved
Throughout this project, the following core JavaScript programming concepts and techniques were successfully applied and demonstrated:

* **JavaScript Syntax Mastery:** Accurate use of JavaScript syntax for defining variables, functions, and leveraging data structures like objects and arrays.
* **Control Flow Implementation:** Effective utilization of control structures such as conditionals (`if-else` statements) and loops (`for, while`) to guide the program's logic based on varying data conditions.
* **Data Organization:** Organization and management of complex data through the strategic use of arrays and objects, facilitating easy access and manipulation of data points.
* **Function Development:** Creation of reusable, modular functions aimed at reducing code repetition and enhancing the script's maintainability.
* **Looping and Iteration:** Employing loops and array methods for efficient data traversal and manipulation, especially in handling collections of data.

* **Error Handling:** Graceful management of potential code failures through the implementation of `try/catch` blocks, ensuring the program's robustness against unexpected data or runtime errors:
  
    1.  **Checking All Data Types in Arrays:** Ensure every item in the array adheres to the expected data type to prevent type-related errors and inconsistencies in data processing.
    2.  **Divided by 0 if Don't Have points_possible:** Guard against division by zero by verifying that `points_possible` is a positive number before performing any division operations to calculate scores.
    3.  **Negative Score or points_possible:** Validate that both `scores` and `points_possible` are non-negative to maintain logical correctness in scoring algorithms.
    4.  **Score Greater Than points_possible:** Check that no score exceeds its corresponding `points_possible` to prevent illogical score distributions and maintain the integrity of results.
    5.  **Checking All Students Submit Assignment:** Verify that submissions exist for all students to ensure comprehensive evaluation and avoid missing data during the analysis of assignments.

Data output:
```
[
  { '1': 0.94, '2': 1, id: 125, avg: 0.985 },
  { '1': 0.78, '2': 0.833, id: 132, avg: 0.82 }
]
```

## Completion Statement
This project has been  completed, with the `getLearnerData()` function meeting all specified requirements and objectives. The script has been thoroughly tested with various data scenarios to ensure accuracy and reliability in its output.
