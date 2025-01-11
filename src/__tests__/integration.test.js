import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Initialization', () => {
    test('renders main app header', () => {
        render(<App />);
        const heading = screen.getByText('Task List Manager');
        expect(heading).toBeInTheDocument();
    });
});

describe('Task List Management', () => {
    test('can add a new task list', () => {
        render(<App />);

        // Add new list
        const addListButton = screen.getByText('Add list');
        fireEvent.click(addListButton);

        // Verify new list is added
        const taskLists = document.getElementsByClassName('task-list');
        expect(taskLists.length).toBe(1);
    });
});