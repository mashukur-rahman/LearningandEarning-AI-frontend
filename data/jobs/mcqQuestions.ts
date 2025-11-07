export interface MCQOption {
  id: string;
  text: string;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: MCQOption[];
  correctAnswer: string;
}

export const mcqQuestions: MCQQuestion[] = [
  {
    id: "q1",
    question: "What is the virtual DOM in React?",
    options: [
      {
        id: "q1-a",
        text: "A physical representation of the actual DOM in the browser",
      },
      {
        id: "q1-b",
        text: "An in-memory representation of the real DOM used for performance optimization",
      },
      {
        id: "q1-c",
        text: "A way to store component state",
      },
      {
        id: "q1-d",
        text: "A CSS framework for styling components",
      },
    ],
    correctAnswer: "q1-b",
  },
  {
    id: "q2",
    question: "What does CSS Flexbox's 'justify-content' property control?",
    options: [
      {
        id: "q2-a",
        text: "The alignment of items along the cross axis",
      },
      {
        id: "q2-b",
        text: "The spacing between flex items and the container",
      },
      {
        id: "q2-c",
        text: "The alignment of items along the main axis",
      },
      {
        id: "q2-d",
        text: "The size of flex items",
      },
    ],
    correctAnswer: "q2-c",
  },
  {
    id: "q3",
    question: "What HTTP status code indicates a successful request?",
    options: [
      {
        id: "q3-a",
        text: "404",
      },
      {
        id: "q3-b",
        text: "200",
      },
      {
        id: "q3-c",
        text: "500",
      },
      {
        id: "q3-d",
        text: "301",
      },
    ],
    correctAnswer: "q3-b",
  },
  {
    id: "q4",
    question: "What is the purpose of async/await in JavaScript?",
    options: [
      {
        id: "q4-a",
        text: "To create variables that can be accessed later",
      },
      {
        id: "q4-b",
        text: "To make asynchronous code look and behave more like synchronous code",
      },
      {
        id: "q4-c",
        text: "To automatically cache data",
      },
      {
        id: "q4-d",
        text: "To improve CSS rendering performance",
      },
    ],
    correctAnswer: "q4-b",
  },
  {
    id: "q5",
    question: "What is a closure in JavaScript?",
    options: [
      {
        id: "q5-a",
        text: "A function that closes the browser tab",
      },
      {
        id: "q5-b",
        text: "A function bundled with its lexical environment",
      },
      {
        id: "q5-c",
        text: "A way to define global variables",
      },
      {
        id: "q5-d",
        text: "An error handling mechanism",
      },
    ],
    correctAnswer: "q5-b",
  },
  {
    id: "q6",
    question: "What does useEffect hook do in React?",
    options: [
      {
        id: "q6-a",
        text: "Manages component styling",
      },
      {
        id: "q6-b",
        text: "Handles side effects in functional components",
      },
      {
        id: "q6-c",
        text: "Creates new DOM elements",
      },
      {
        id: "q6-d",
        text: "Manages form inputs only",
      },
    ],
    correctAnswer: "q6-b",
  },
  {
    id: "q7",
    question: "What is the difference between == and === in JavaScript?",
    options: [
      {
        id: "q7-a",
        text: "They are exactly the same",
      },
      {
        id: "q7-b",
        text: "== performs type coercion, === checks type and value without coercion",
      },
      {
        id: "q7-c",
        text: "=== performs type coercion, == checks type and value without coercion",
      },
      {
        id: "q7-d",
        text: "== is for strings, === is for numbers",
      },
    ],
    correctAnswer: "q7-b",
  },
  {
    id: "q8",
    question: "What is the purpose of the 'key' prop in React lists?",
    options: [
      {
        id: "q8-a",
        text: "To decrypt data in the component",
      },
      {
        id: "q8-b",
        text: "To help React identify which items have changed for optimal re-rendering",
      },
      {
        id: "q8-c",
        text: "To style list items",
      },
      {
        id: "q8-d",
        text: "To sort list items automatically",
      },
    ],
    correctAnswer: "q8-b",
  },
  {
    id: "q9",
    question: "What does the 'spread operator' (...) do in JavaScript?",
    options: [
      {
        id: "q9-a",
        text: "Combines multiple arrays or objects into one",
      },
      {
        id: "q9-b",
        text: "Spreads elements of an iterable into individual elements",
      },
      {
        id: "q9-c",
        text: "Creates a new scope for variables",
      },
      {
        id: "q9-d",
        text: "Defines optional function parameters",
      },
    ],
    correctAnswer: "q9-b",
  },
  {
    id: "q10",
    question: "What is the purpose of TypeScript?",
    options: [
      {
        id: "q10-a",
        text: "To replace JavaScript completely",
      },
      {
        id: "q10-b",
        text: "To add static typing and advanced features to JavaScript for better development experience",
      },
      {
        id: "q10-c",
        text: "To style websites",
      },
      {
        id: "q10-d",
        text: "To manage databases",
      },
    ],
    correctAnswer: "q10-b",
  },
];
