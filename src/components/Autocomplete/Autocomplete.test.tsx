import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AutoComplete from './Autocomplete';
import userEvent from '@testing-library/user-event';

test('Test if input label is displayed', () => {
  const labelName = 'Enter input..'
  render(<AutoComplete dropdownData={[]} inputLabel={labelName} showInputlabel={true}/>);
  const linkElement = screen.getByLabelText(labelName);
  expect(linkElement).toBeInTheDocument();
});

test('Test if input label is not displayed when showInputlabel is false or undfined.', () => {
  const labelName = 'Enter input..'
  render(<AutoComplete dropdownData={[]} inputLabel={labelName} showInputlabel={false}/>);
  const linkElement = screen.queryByLabelText(labelName);
  expect(linkElement).not.toBeInTheDocument();
});

test('Dropdown list should not be displayed when input not focused.', () => {
  render(<AutoComplete dropdownData={['Apple']}/>);
  const linkElement = screen.queryByRole('listitem');
  expect(linkElement).not.toBeInTheDocument();
});

test('Dropdown list should be displayed when input is focused.', () => {
  const screeenRender = render(<AutoComplete dropdownData={['Apple']}/>);
  const linkElement = screeenRender.getByRole('textbox');
  userEvent.click(linkElement);
  const listElement = screeenRender.queryByRole('listitem');
  expect(listElement).toBeInTheDocument();
});

test('Dropdown list should contain same number of length as dropdown data.', () => {
  const li = ['Apple'];
  render(<AutoComplete dropdownData={li}/>);
  const linkElement = screen.getByRole('textbox');
  userEvent.click(linkElement);
  const listElement = screen.queryAllByRole('listitem');
  expect(listElement).toHaveLength(li.length);
});

test('List dropdown should not be visible when dropdown data is empty.', () => {
  render(<AutoComplete dropdownData={[]}/>);
  const listElement = screen.queryByRole('listitem');
  expect(listElement).not.toBeInTheDocument();
});

test('Test if default value is populated in input textbox if default value found in dropdown data', () => {
  const list = ['Apple', 'Banana'];
  const defaultValue= 'Banana';
  render(<AutoComplete dropdownData={list} defaultValue={defaultValue}/>);
  const domElement = screen.queryByDisplayValue(defaultValue);
  expect(domElement).toBeInTheDocument();
});

test('Default value should not be populated in input textbox if default value is not found in dropdown data', () => {
  const list = ['Apple', 'Banana'];
  const defaultValue= 'Mango';
  render(<AutoComplete dropdownData={list} defaultValue={defaultValue}/>);
  const domElement = screen.queryByDisplayValue(defaultValue);
  expect(domElement).not.toBeInTheDocument();
});


test('Test if default value is populated in input textbox if default value found in dropdown data object', () => {
  const list = [{fruit: 'Apple'}, {fruit: 'Banana'}];
  const defaultValue= 'Banana';
  render(<AutoComplete dropdownData={list} defaultValue={defaultValue} objectProperty='fruit'/>);
  const domElement = screen.queryByDisplayValue(defaultValue);
  expect(domElement).toBeInTheDocument();
});

test('No search result should be displayed if user search does not match dropdown data.', () => {
  const list = [{fruit: 'Apple'}, {fruit: 'Banana'}];
  render(<AutoComplete dropdownData={list} objectProperty='fruit'/>);
  const inputElement = screen.getByRole('textbox'); 
  userEvent.type(inputElement, 'Mango')
  const domElement = screen.getByText(/No results found./i);
  expect(domElement).toBeInTheDocument();
});

test('No search result should be displayed if user search does not match dropdown data.', () => {
  const list = [{fruit: 'Apple'}, {fruit: 'Banana'}];
  render(<AutoComplete dropdownData={list} objectProperty='fruit'/>);
  const inputElement = screen.getByRole('textbox'); 
  userEvent.type(inputElement, 'Banana')
  const domElement = screen.queryAllByRole('listitem');
  expect(domElement).toHaveLength(1);
});

test('Test if custom placeholder is displayed.', () => {
  const placeholder = 'Enter or search...'
  render(<AutoComplete dropdownData={[]} placeHolder={placeholder}/>);
  const linkElement = screen.queryByPlaceholderText(placeholder);
  expect(linkElement).toBeInTheDocument();
});

test('During initial render, number of dropdown data displayed in dropdown should be same as initialVisibleData', () => {
  const data = [];
  for (let i=0; i<1500; i++) {
    data.push(i);
  }
  render(<AutoComplete dropdownData={data} />);
  const linkElement = screen.getByRole('textbox');
  userEvent.click(linkElement);
  const listElement = screen.queryAllByRole('listitem');
  expect(listElement).toHaveLength(1000);
});

test('During initial render, number of dropdown data displayed in dropdown should be same as initialVisibleData that user choose to customize.', () => {
  const data = [];
  for (let i=0; i<1500; i++) {
    data.push(i);
  }
  render(<AutoComplete dropdownData={data} initialVisibleData={500}/>);
  const linkElement = screen.getByRole('textbox');
  userEvent.click(linkElement);
  const listElement = screen.queryAllByRole('listitem');
  expect(listElement).toHaveLength(500);
});


test('Test if triggerOnFocusEvent is trigerred during onFocus.', () => {
  const data = [];
  for (let i=0; i<50; i++) {
    data.push(i);
  }
  const triggerOnFocusEvent = jest.fn();
  render(<AutoComplete dropdownData={data} triggerOnFocusEvent={triggerOnFocusEvent}/>);
  const linkElement = screen.getByRole('textbox');
  userEvent.click(linkElement);
  expect(triggerOnFocusEvent).toHaveBeenCalled();
});



