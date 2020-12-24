document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const mark = document.getElementById('mark'),
    model = document.getElementById('model'),
    link = document.getElementById('linkIn'),
    check = document.getElementById('noSearch'),
    urlParam = new URLSearchParams(window.location.search);

  const optionsList = model.querySelectorAll('option');
  let classOptions = [];
  optionsList.forEach((elem) => {
    classOptions.push(elem.value);
  });

  const generateHref = (noSearch) => {
    let baseURL = 'https://oqqo-studio.ru/constructor', //http://127.0.0.1:5500/index.html
        params = window.location.search.replace( '?', '');
    if (noSearch) {
      params = params.length == 0 ? '' : `&${params}`;
      link.href = `${baseURL}?noMyCar=true${params}`;
    } else if (mark.value && model.value) {
      params = params.length == 0 ? '' : `&${params}`;
      let value = model.value.replace(`${mark.value}_`, '');
      link.href = `${baseURL}?mark=${mark.value}&model=${value}${params}`;
    } else {
      params = params.length == 0 ? '' : `?${params}`;
      link.href = `${params}`;
    }
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
    model.addEventListener('change', () => {
      generateHref();
    });
    mark.value = 'BMW';
    let event = new Event('change');
    mark.dispatchEvent(event);
  };
  changeMark();

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

  // Changing items when the label is gift
  const searchGift = () => {
    let product = document.getElementById('product'),
        links = product.querySelectorAll('.product__card'),
        images = product.querySelectorAll('.product__image'),
        subtitle = product.querySelectorAll('.product__subtitle'),
        price = product.querySelectorAll('.product__price'),
        desc = product.querySelectorAll('.product__desc'),
        parameters = window.location.search.replace('?', '');    
    if(urlParam.get('utm_gift')) {
      images[0].src = 'https://justbecome.pro/static/oqqo/img/4.png';
      images[1].src = 'https://justbecome.pro/static/oqqo/img/2.png';
      images[2].src = 'https://justbecome.pro/static/oqqo/img/5.png';

      subtitle[0].textContent = 'Подарочный чехол';
      subtitle[1].textContent = 'Подарочная обложка';
      subtitle[2].textContent = 'Подарочный комплект';

      desc[0].innerHTML = '• 3D Чехол<br>• Магнитный держатель<br>• Подарочная коробка';
      desc[1].innerHTML = '• Обложка для автодокументов<br>• Подарочная коробка';
      desc[2].innerHTML = '• 3D-Чехол<br>• Обложка для автодокументов<br>• Магнитный держатель<br>• Подарочная коробка';

      price[0].textContent = '4000 ₽';
      price[1].textContent = '3500 ₽';
      price[2].innerHTML = '7000 ₽ <span class="product__after">6000 ₽</span>';
    } else {
      for(let i = 0; i < 3; i++) {
        images[i].src = `https://justbecome.pro/static/oqqo/img/${i + 1}.png`;
      }
    }
    for(let i = 0; i < 3; i++) {
      links[i].href = 'https://oqqo-studio.ru/ctest' + `?utm_tovar=${i + 1}&` + parameters;
    }
  };
  searchGift();
});