'use strict';

const taskInput = document.getElementById('task');
const categorySelect = document.getElementById('category');
const taskForm = document.getElementById('add-task-form');
const taskList = document.getElementById('task-list');
const clearAllBtn = document.getElementById('clear-all');
const allTab = document.getElementById('all-tab');
const workTab = document.getElementById('work-tab');
const personalTab = document.getElementById('personal-tab');

let tasks = [];
let currentFilter = 'all';

function createTaskHTML(task) {
	const categoryLabel = task.category.charAt(0).toUpperCase() + task.category.slice(1).toLowerCase();
	const isCategory =
		task.category === 'all'
			? ''
			: `
				<span class="task-list__category task-list__category--${task.category}">${categoryLabel}</span>
			`;
	return `
		<li class="task-list__item" data-id="${task.id}">
			<div class="task-list__item-left">
				<label>
					<input class="task-list__checkbox" type="checkbox" ${task.completed ? 'checked' : ''}>
					<span class="task-list__custom-checkbox"></span>
					<span class="task-list__task-name">${task.text}</span>
				</label>
			</div>
			<div class="task-list__item-right">
				${isCategory}
				<div class="task-list__btns">
					<button class="task-list__edit-btn"><i class="bi bi-pencil-square"></i></button>
					<button class="task-list__delete-btn"><i class="bi bi-trash3 task-control__btn-icon"></i></button>
				</div>
			</div>
		</li>
	`;
}

function saveTasks() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
	const storedTasks = localStorage.getItem('tasks');
	if (!storedTasks) return;

	tasks = JSON.parse(storedTasks);
	renderTasks(currentFilter);
}

function renderTasks(filter = 'all') {
	taskList.innerHTML = '';

	const filteredTasks = tasks.filter((task) => {
		if (filter === 'all') return true;
		return task.category === filter;
	});

	filteredTasks.forEach((task) => {
		taskList.insertAdjacentHTML('beforeend', createTaskHTML(task));
	});
}

taskForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const taskText = taskInput.value.trim();
	if (!taskText) {
		alert('Please enter a task.');
		return;
	}

	const category = categorySelect.value || 'all';
	const newTask = {
		id: crypto.randomUUID(),
		text: taskText,
		category: category,
		completed: false,
	};

	tasks.push(newTask);
	saveTasks();

	renderTasks(currentFilter);


	taskInput.value = '';
	categorySelect.value = '';
});

taskList.addEventListener('change', (e) => {
	if (!e.target.classList.contains('task-list__checkbox')) return;

	const taskItem = e.target.closest('.task-list__item');
	const taskId = taskItem.dataset.id;

	const targetTask = tasks.find((task) => task.id === taskId);
	targetTask.completed = !targetTask.completed;
	saveTasks();
});

taskList.addEventListener('click', (e) => {
	if (!e.target.closest('.task-list__delete-btn')) return;
	const taskItem = e.target.closest('.task-list__item');
	const taskId = taskItem.dataset.id;

	if (!confirm('Are you sure to delete this task?')) return;

	tasks = tasks.filter((task) => task.id !== taskId);
	saveTasks();

	taskItem.remove();
});

taskList.addEventListener('click', (e) => {
	if (!e.target.closest('.task-list__edit-btn')) return;

	const taskItem = e.target.closest('.task-list__item');
	const taskId = taskItem.dataset.id;
	const editTask = tasks.find((task) => task.id === taskId);

	const editTaskText = taskItem.querySelector('.task-list__task-name');
	const currentText = editTask.text;

	const editInput = document.createElement('input');
	editInput.type = 'text';
	editInput.value = currentText;
	editInput.classList.add('task-list__edit-input');

	editTaskText.replaceWith(editInput);
	editInput.focus();
	editInput.select();

	editInput.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			saveEdit();
		} else if (e.key === 'Escape') {
			cancelEdit();
		}
	});

	editInput.addEventListener('blur', () => {
		saveEdit();
	});

	function saveEdit() {
		const newText = editInput.value.trim();
		if (!newText) {
			alert('Please enter a task');
			editInput.focus();
			return;
		}

		editTask.text = newText;
		saveTasks();

		const newTaskText = document.createElement('span');
		newTaskText.classList.add('task-list__task-name');
		newTaskText.textContent = newText;

		editInput.replaceWith(newTaskText);
	}

	function cancelEdit() {
		const taskText = document.createElement('span');
		taskText.classList.add('task-list__task-name');
		taskText.textContent = currentText;

		editInput.replaceWith(taskText);
	}
});

clearAllBtn.addEventListener('click', (e) => {
	e.preventDefault();

	if (!tasks.length) return;

	if (!confirm('Are you sure to clear all tasks?')) return;

	tasks = [];
	saveTasks();

	taskList.innerHTML = '';
});

allTab.addEventListener('change', () => {
	currentFilter = 'all';
	renderTasks(currentFilter);
});

workTab.addEventListener('change', () => {
	currentFilter = 'work';
	renderTasks(currentFilter);
});

personalTab.addEventListener('change', () => {
	currentFilter = 'personal';
	renderTasks(currentFilter);
});

window.addEventListener('DOMContentLoaded', loadTasks);
