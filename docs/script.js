import { compile_function } from './app.js';

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const errorBox = document.getElementById('error');

function renderRst(rst) {
  try {
    const result = compile_function(rst);

    errorBox.textContent = '';
    preview.innerHTML = result.body || '';

    const oldDynamic = document.getElementById('rst-dynamic-header');
    if (oldDynamic) oldDynamic.remove();

    if (result.header) {
      const wrapper = document.createElement('div');
      wrapper.id = 'rst-dynamic-header';
      wrapper.innerHTML = result.header;
      document.head.append(...wrapper.childNodes);
    }
  } catch (error) {
    preview.innerHTML = '';
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
  preview.innerHTML = '';
  errorBox.textContent = 'Error: ' + error.message;
  editor.value = '';
  console.error(error);
});