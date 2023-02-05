
export const init = () => {
  console.log('import script1 from init');
  import('./script1');
};

init();
