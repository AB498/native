import React from 'react';
import renderer, {act} from 'react-test-renderer';
import App from '../App';

jest.mock('../src/components/HeroSection', () => {
  const ReactNative = require('react-native');

  return function MockHeroSection() {
    return <ReactNative.Text>Hero Section</ReactNative.Text>;
  };
});

test('renders app', async () => {
  let tree: renderer.ReactTestRenderer;

  await act(async () => {
    tree = renderer.create(<App />);
  });

  expect(tree!).toBeTruthy();
});
