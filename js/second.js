document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const mark = document.getElementById('mark'),
    model = document.getElementById('model'),
    link = document.getElementById('linkIn'),
    check = document.getElementById('noSearch');

  const optionsList = model.querySelectorAll('option');
  let classOptions = [];
  optionsList.forEach((elem) => {
    classOptions.push(elem.value);
  });

  const generateHref = (noSearch) => {
    let baseURL = 'https://oqqo-studio.ru/constructor';
    if (noSearch) {
      link.href = `${baseURL}?noMyCar=true`;
    } else if (mark.value && model.value) {
      let value = model.value.replace(`${mark.value}_`, '');
      link.href = `${baseURL}?mark=${mark.value}&model=${value}`;
    } else link.href = '#';
  };
  generateHref();

  const getOptionForModel = () => {
    model.innerHTML = ``;
    const addOption = (val1, val2) => {
      const option = document.createElement('option');
      option.value = val1;
      do {
        val2 = val2.replace(/[_]+/, ' ');
      } while (val2.match(/_/));
      option.textContent = val2;
      model.appendChild(option);
    };
    classOptions.forEach((elem) => {
      if (elem.substring(0, mark.value.length) === mark.value) {
        addOption(elem, elem.substring(mark.value.length + 1));
      }
    });
  };

  const changeMark = () => {
    mark.addEventListener('change', () => {
      getOptionForModel();
      generateHref();
    });
    mark.value = 'BMW';
    let event = new Event('change');
    mark.dispatchEvent(event);
  };
  changeMark();

  model.addEventListener('change', () => {
    generateHref();
  });

  const noSearchMyCar = () => {
    check.addEventListener('change', () => {
      if (check.checked) {
        mark.disabled = true;
        model.disabled = true;
        generateHref(check.checked);
      } else {
        mark.disabled = false;
        model.disabled = false;
        generateHref(null);
      }
    });
  };
  noSearchMyCar();

});