module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'npm run lint:fix',
    'react-scripts test --bail --watchAll=false --findRelatedTests --passWithNoTests',
    () => 'tsc-files --noEmit'
  ],
  '*.{js,jsx,ts,tsx,json,css,js}': ['npm run format']
};
