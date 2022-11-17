const path = require('path');
const fs = require('fs');

const DIST_PATH = path.resolve(__dirname, '../../', 'dist');
const SRC_PATH = path.resolve(__dirname, '../../', 'src');
const PUBLIC_PATH = path.resolve(__dirname, '../../', 'public');
const ROOT_PATH = path.resolve(__dirname, '../../');
const DEFAULT_PORT = 3000;
const IGNORE_PATH = ['index.tsx', 'react-app-env.d.ts'];

const getEntry = () => {
  const result = {};
  const componentsPath = path.resolve(SRC_PATH, './components');
  const res = fs.readdirSync(componentsPath);
  res.forEach((item) => {
    if (!IGNORE_PATH.includes(item)) {
      result[item] = path.resolve(componentsPath, item, './index.tsx');
    }
  });
  console.log(Object.keys(result).length + ' components packing!');
  console.log(result);
  return result;
};

module.exports = {
  DIST_PATH,
  SRC_PATH,
  PUBLIC_PATH,
  ROOT_PATH,
  DEFAULT_PORT,
  getEntry,
};
