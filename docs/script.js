import { compile_function } from './app.js';

const editor = document.getElementById('editor');
const output = document.getElementById('output');
const errorBox = document.getElementById('error');

function renderRst(rst) {
  try {
    const result = compile_function(rst);
    errorBox.textContent = '';
    output.textContent = result.body || '';
  } catch (error) {
    output.textContent = '';
    errorBox.textContent = 'Error: ' + error.message;
    console.error(error);
  }
}

async function main() {
  const response = await fetch('./content.rst');
  const rst = await response.text();

  editor.value = rst;
  renderRst(rst);

  editor.addEventListener('input', () => {
    renderRst(editor.value);
  });
}

main().catch((error) => {
  editor.value = '';
  output.textContent = '';
  errorBox.textContent = 'Error: ' + error.message;
  console.error(error);
});