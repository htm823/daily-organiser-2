# Daily Organiser

🇬🇧 English | [🇯🇵 Japanese](README.ja.md)

A simple task management application.

Organise work and personal tasks separately.

Built with HTML, CSS, and JavaScript.

## Live Demo
👉🏻 https://daily-organiser-2.vercel.app/

## Preview
![Daily Organiser](./do2_1.gif)

## Background
While using Notion on a daily basis, I realised that the feature I relied on most was its to-do list. This inspired me to build a lightweight task management application focused on only the essential functionality.

I also found the Notion desktop application inconvenient for quickly jotting down small tasks, as it required opening another window. Although the browser version is available, signing in before first use adds unnecessary friction.

With this in mind, I designed Daily Organiser around a simple concept: allow users to capture tasks instantly without requiring an account or sign-in.

## Features

### Add & View Tasks
Quickly capture new tasks and manage them from a single list.

### Edit Tasks
Update task details whenever they change.

### Delete Tasks
Remove individual tasks or clear multiple tasks when needed.

### Task Completion
Mark tasks as complete with a checkbox and visual strikethrough, making progress easy to track.

### Local Storage
Keep tasks stored in the browser without requiring an account.

### Category Filtering
Switch between **All**, **Work**, and **Personal** tasks for better organisation.

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Deployment
- Vercel

## Technology Choices
I chose to build the application with HTML, CSS, and vanilla JavaScript so I could focus on implementing fundamental CRUD operations, local storage, and filtering functionality.

Rather than relying on a framework, I wanted to strengthen my understanding of DOM manipulation and data management using core web technologies.

## System Design
To make it easy to switch between different types of tasks, I created three tabs: **All**, **Work**, and **Personal**.

The active tab is highlighted with an accent colour so users can immediately recognise which category they are viewing.

Each task also displays a category label, making it easier to distinguish work and personal tasks when viewing the complete list.

## Implementation Highlights
I structured the application with a clear separation between data management and UI rendering.

All tasks are stored in a single `tasks` array, which serves as the source of truth for creating, editing, deleting, and updating task status. The interface is always rendered from this data, helping to keep the UI consistent with the underlying state.

To improve usability, leading and trailing whitespace is automatically removed from user input before saving.

The application also supports keyboard interactions, allowing users to **save with the Enter key** and **cancel with the Escape key**, making task management more efficient without relying solely on the mouse.

## Challenges & Solutions
One of the main challenges was deciding how to manage task data and assign unique IDs.

To solve this, I represented each task as an object containing its **ID, task content, category, and completion status**.

This structure made it straightforward to edit, delete, and update individual tasks while also providing a scalable foundation for adding new features in the future.

## Future Improvements
My next priority is to improve the application's accessibility.

I plan to add appropriate accessibility attributes, such as `aria-label`, to form controls and buttons so the interface is easier to use with screen readers.

I also intend to review the colour palette and improve colour contrast to make the interface more accessible and easier to read.


## License & Usage
This repository is publicly available for portfolio purposes.

The source code is **not open source** and is provided solely to demonstrate my development work and technical skills.

## Explore More Projects

You can find more of my projects on my GitHub profile.

👉🏻 https://github.com/htm823

