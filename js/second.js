document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const danMark = document.getElementById('mark'),
    danModel = document.getElementById('model'),
    danLink = document.getElementById('linkIn'),
    danCheck = document.getElementById('noSearch');

  const optionsList = danModel.querySelectorAll('option');
  let classOptions = [];
  optionsList.forEach((elem) => {
    classOptions.push(elem.value);
  });

  const generateHref = (noSearch) => {
    let baseURL = 'https://oqqo-studio.ru/constructor', //http://127.0.0.1:5500/index.html
        params = window.location.search.replace( '?', '');
    if (noSearch) {
      params = params.length == 0 ? '' : `&${params}`;
      danLink.href = `${baseURL}?noMyCar=true${params}`;
    } else if (danMark.value && danModel.value) {
      params = params.length == 0 ? '' : `&${params}`;
      let value = danModel.value.replace(`${danMark.value}_`, '');
      danLink.href = `${baseURL}?mark=${danMark.value}&model=${value}${params}`;
    } else {
      params = params.length == 0 ? '' : `?${params}`;
      danLink.href = `${params}`;
    }
  };
  generateHref();

  const getOptionFordanModel = () => {
    danModel.innerHTML = ``;
    const addOption = (val1, val2) => {
      const option = document.createElement('option');
      option.value = val1;
      do {
        val2 = val2.replace(/[_]+/, ' ');
      } while (val2.match(/_/));
      option.textContent = val2;
      danModel.appendChild(option);
    };
    classOptions.forEach((elem) => {
      if (elem.substring(0, danMark.value.length) === danMark.value) {
        addOption(elem, elem.substring(danMark.value.length + 1));
      }
    });
  };

  const changedanMark = () => {
    danMark.addEventListener('change', () => {
      getOptionFordanModel();
      generateHref();
    });
    danModel.addEventListener('change', () => {
      generateHref();
    });
    danMark.value = 'BMW';
    let event = new Event('change');
    danMark.dispatchEvent(event);
  };
  changedanMark();

  const noSearchMyCar = () => {
    danCheck.addEventListener('change', () => {
      if (danCheck.danChecked) {
        danMark.disabled = true;
        danModel.disabled = true;
        generateHref(danCheck.danChecked);
      } else {
        danMark.disabled = false;
        danModel.disabled = false;
        generateHref(null);
      }
    });
  };
  noSearchMyCar();

  // Changing items when the label is gift
  const searchGiftDan = () => {
    let productDan = document.getElementById('productDan'),
        danLinks = productDan.querySelectorAll('.productDan__card'),
        imagesDan = productDan.querySelectorAll('.productDan__image'),
        subtitleDan = productDan.querySelectorAll('.productDan__subtitle'),
        priceDan = productDan.querySelectorAll('.productDan__price'),
        descDan = productDan.querySelectorAll('.productDan__desc'),
        urlParamDan = new URLSearchParams(window.location.search),
        parametersDan = window.location.search.replace('?', '');    
    if(urlParamDan.get('utm_gift')) {
      imagesDan[0].src = 'https://justbecome.pro/static/oqqo/img/4.png';
      imagesDan[1].src = 'https://justbecome.pro/static/oqqo/img/2.png';
      imagesDan[2].src = 'https://justbecome.pro/static/oqqo/img/5.png';

      // -- Тут можно редактировать текст --
      
      subtitleDan[0].textContent = 'Подарочный чехол';
      subtitleDan[1].textContent = 'Подарочная портмоне';
      subtitleDan[2].textContent = 'Подарочный комплект';

      descDan[0].innerHTML = '• 3D Чехол<br>• Магнитный держатель<br>• Подарочная коробка';
      descDan[1].innerHTML = '• Портмоне для автодокументов<br>• Подарочная коробка';
      descDan[2].innerHTML = '• 3D-Чехол<br>• Портмоне для автодокументов<br>• Магнитный держатель<br>• Подарочная коробка';

      priceDan[0].textContent = '4000 ₽';
      priceDan[1].textContent = '3500 ₽';
      priceDan[2].innerHTML = '7000 ₽ <span class="productDan__after">6000 ₽</span>';

      // -----------------------------------
    } else {
      for(let i = 0; i < 3; i++) {
        imagesDan[i].src = `https://justbecome.pro/static/oqqo/img/${i + 1}.png`;
      }
    }
    for(let i = 0; i < 3; i++) {
      danLinks[i].href = 'https://oqqo-studio.ru/constructor' + `?utm_tovar=${i + 1}&` + parametersDan;
    }
  };
  searchGiftDan();
});