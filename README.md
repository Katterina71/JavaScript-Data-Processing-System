# JavaScript Processing System

## Overview
This project represents of a JavaScript-based assignment that focuses on data processing and manipulation within the educational domain. The primary goal was to develop a script capable of analyzing and transforming educational data into a structured and insightful format.

## Task Description
The script created for this project, named getLearnerData(), performs the following key operations:

1. **Data Input:** Accepts three specific types of data as input parameters:

* `CourseInfo` object
* `AssignmentGroup` object
* Array of `LearnerSubmission` objects
  
2. **Output:** Returns an array of objects. Each object contains a learner's ID, their weighted average score, and individual assignment scores as percentage values.
3. **Validation:** Ensure the AssignmentGroup belongs to the correct course by matching `course_id`. Throw an error for invalid data.
4. **Error Handling:** Manage errors gracefully, such as division by zero or unexpected data types.
5. **Assignment Inclusion:** Exclude assignments not yet due or adjust scores for late submissions accordingly.
   
## Objectives Achieved
Throughout this project, the following core JavaScript programming concepts and techniques were successfully applied and demonstrated:

* **JavaScript Syntax Mastery:** Accurate use of JavaScript syntax for defining variables, functions, and leveraging data structures like objects and arrays.
* **Control Flow Implementation:** Effective utilization of control structures such as conditionals (`if-else` statements) and loops (`for, while`) to guide the program's logic based on varying data conditions.
* **Data Organization:** Organization and management of complex data through the strategic use of arrays and objects, facilitating easy access and manipulation of data points.
* **Function Development:** Creation of reusable, modular functions aimed at reducing code repetition and enhancing the script's maintainability.
* **Looping and Iteration:** Employing loops and array methods for efficient data traversal and manipulation, especially in handling collections of data.
* **Error Handling:** Graceful management of potential code failures through the implementation of `try/catch` blocks, ensuring the program's robustness against unexpected data or runtime errors.

## Completion Statement
This project has been  completed, with the `getLearnerData()` function meeting all specified requirements and objectives. The script has been thoroughly tested with various data scenarios to ensure accuracy and reliability in its output.
