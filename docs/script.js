import { compile_function } from './app.js';

async function main() {
  const response = await fetch('./content.rst');
  const rst = await response.text();

  const result = compile_function(rst);

  document.head.insertAdjacentHTML('beforeend', result.header || '');
  document.getElementById('app').innerHTML = result.body;
}

main().catch((error) => {
  document.getElementById('app').textContent = 'Error: ' + error.message;
  console.error(error);
});