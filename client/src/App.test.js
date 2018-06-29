import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  const wrapper = render(<App />);
  // ReactDOM.unmountComponentAtNode(div);
  expect(wrapper.find('button')).length(1);
});
