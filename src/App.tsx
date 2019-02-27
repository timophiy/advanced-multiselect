import React, { Component } from 'react';
import AdvancedSelect from './components/AdvancedSelect';
import './App.css';

// some data for testing
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'banana', label: 'Banana' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'cocoa', label: 'Cocoa' },
  { value: 'orange', label: 'Orange' },
  { value: 'apple', label: 'Apple' },
  { value: 'tomato', label: 'Tomato' },
  { value: 'pen', label: 'Pen' },
  { value: 'pencil', label: 'Pencil' },
  { value: 'paper', label: 'Paper' }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <AdvancedSelect
          options={options}
          mode="multiple"
          maxTagCount={2}
          placeholder="Please select" />
      </div>
    );
  }
}

export default App;
