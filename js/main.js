document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  let model = document.getElementById('model');
  const optionsList = model.querySelectorAll('option');
  let param = false;
  let classOptions = [];
  optionsList.forEach((elem) => {
    classOptions.push(elem.value);
  });

  let triggerModel = 0,
      triggerRange = 0;

  
  // Constructor Launch
  const launcher = (carMark, carModel, flag, NoMyCar = false) => {
    const noSearh = document.getElementById('noSearh'),
      mark = document.getElementById('mark'),
      model = document.getElementById('model'),
      range = document.getElementById('range');
    const animate = () => {
      const loading = document.getElementById('loading');
      loading.style.display = 'block';
      setTimeout(() => {
        loading.style.display = 'none';
      }, 2000);
    };
    animate();

    $('input[id^=check]').each(function () {
      this.checked = false;
      this.disabled = false;
    });

    const changeMark = () => {
      mark.value = carMark;
      let event = new Event('change');
      mark.dispatchEvent(event);
    };

    const clickSlide = () => {
      const slides = document.querySelectorAll('.slider__item');
      slides.forEach((elem) => {
        if (elem.dataset.slickIndex == 0) {
          let img = elem.querySelector('img');
          $(img).click();
        }
      });

      setTimeout(() => {
        if (triggerRange === 0) $('#range').addClass('before');
        if (triggerModel === 0) $('.konstrukt__image').addClass('after');
      }, 1300);
      if (noSearh.checked) $('.konstrukt__image').removeClass('after');
      setTimeout(() => {
        $('#range').removeClass('before');
        $('.konstrukt__image').removeClass('after');
      }, 8000);
    };

    const changeModel = () => {
      model.value = !!carMark ? `${carMark}_${carModel}` : carModel; 
      let event = new Event('change');
      model.dispatchEvent(event);
    };

    const clickColor = () => {
      const check = document.getElementById('check2');
      $(check).click();
    };

    const clickCheckNoMyCar = () => {
      const check = document.getElementById('noSearh');
      console.log(check);
      $(check).click();
    }
    range.value = 0;
    if (flag) setTimeout(changeMark, 1);
    setTimeout(clickSlide, 1500);
    setTimeout(changeModel, 1800);
    setTimeout(clickColor, 2000);
    if(NoMyCar) setTimeout(clickCheckNoMyCar, 2000);
  };
  
  // Search parameters
  const searchParam = () => {
    const urlParam = new URLSearchParams(window.location.search);
    if(urlParam.get('mark') && urlParam.get('model')) {
      launcher(urlParam.get('mark'), urlParam.get('model'), !0);
      param = true;
    } else if (urlParam.get('noMyCar')) {
      launcher('BMW', '', !0, true);
      param = true;
    } else {
      launcher('BMW', 'BMW_3_series_VII_(G2x)_2018-2020', true);
    }
  };
  searchParam();

  // If no car needed
  const activeInput = () => {
    const check = document.getElementById('noSearh'),
      model = document.getElementById('model'),
      mark = document.getElementById('mark'),
      rezult = document.querySelector('.konstrukt-rezult'),
      form = document.getElementById('radio-form'),
      checkColor = document.getElementById('check3'),
      divModel = document.getElementById('block_model_car'),
      divColor = document.getElementById('block_color_car'),
      fieldMark = document.getElementsByName('field_mark'),
      fieldModel = document.getElementsByName('field_model'),
      fieldColor = document.getElementsByName('field_color'),
      colorCar = document.getElementById('color_car'),
      popup = document.getElementById('popup'),
      modelCar = document.getElementById('model_car');
    let active;
    colorCar.addEventListener('input', () => {
      fieldColor[0].value = colorCar.value;
    });
    modelCar.addEventListener('input', () => {
      fieldMark[0].value = modelCar.value;
    });
    check.addEventListener('change', () => {
      $('input[id^=check]').each(function () {
        if (this.checked === true && this.name !== 'other') active = this.name
      });

      if (check.checked) {
        popup.style.display = 'block';
        mark.disabled = true;
        model.disabled = true;
        form.classList.add('display');
        fieldModel[0].value = '-';
        divModel.classList.remove('display');
        divColor.classList.remove('display');
        if (document.body.clientWidth <= 567) {
          rezult.style.height = '435px';
        }
        $('input[id^=check]').each(function () {
          if (this.name === 'other') {
            $(this).click();
            this.checked = true;
          } else this.checked = false;
        });
      } else {
        popup.style.display = 'none';
        if (document.body.clientWidth <= 567) {
          rezult.style.height = '700px';
        }
        $('input[id^=check]').each(function () {
          if (this.name === active) {
            $(this).click();
            this.checked = true;
          }
        });
        fieldModel[0].value = model.value.slice(mark.value.length + 1);
        mark.disabled = false;
        model.disabled = false;
        form.classList.remove('display');
        divModel.classList.add('display');
        if (checkColor.checked === false) divColor.classList.add('display');
      }
    });
  };
  activeInput();

  const closePopup = () => {
    const popup = document.getElementById('popup');
    popup.addEventListener('click', event => {
      let target = event.target;
      if (target.classList.value === 'popup__close' || target.classList.value === 'konstrukt__button') {
        popup.style.display = 'none';
      }
    });
  };
  closePopup();

  // Flip Vertical
  const flipVertical = () => {
    const div = document.getElementById('block_vertical'),
      fieldIsMirror = document.getElementsByName('field_is_mirror'),
      button = document.getElementById('vertical');
    div.classList.remove('display');
    let count = 0;
    fieldIsMirror[0].value = 'no';
    button.addEventListener('click', () => {
      const car = document.getElementById('car');
      if (!car.src.match(/null.png/)) {
        car.classList.toggle('flip');
      }
      count++;
      if (count % 2 !== 0) fieldIsMirror[0].value = 'yes';
      else fieldIsMirror[0].value = 'no';
    });
  };
  flipVertical();

  let imgModel = document.createElement('img');
  // add Templates
  const addTemplates = () => {
    const mark = document.getElementById('mark'),
      model = document.getElementById('model'),
      options = model.querySelectorAll('option'),
      fieldMark = document.getElementsByName('field_mark');
    mark.addEventListener('change', (event) => {
      let target = event.target,
        slider = document.querySelector('.slider');

      const leftBlock = document.querySelector('.konstrukt-left__block'),
        rightBlock = document.querySelector('.konstrukt-right__block'),
        rezult = document.querySelector('.konstrukt__image');
      rezult.innerHTML = ``;
      leftBlock.innerHTML = ``;
      rightBlock.innerHTML = ``;

      const startSlider = (target) => {
        let count = 0;


        const activeSlider = () => {
          const leftBlock = document.querySelector('.konstrukt-left__block'),
            rightBlock = document.querySelector('.konstrukt-right__block'),
            left = document.createElement('span'),
            right = document.createElement('span');
          left.classList.add('slider-left');
          right.classList.add('slider-right');
          leftBlock.appendChild(left);
          rightBlock.appendChild(right);

          $('.slider').slick({
            centerMode: true,
            infinite: true,
            swipe: false,
            arrows: false,
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
          });

          getBgRezult();
          main();

          const clickArrow = () => {
            const leftArrow = document.querySelector('.slider-left'),
              rightArrow = document.querySelector('.slider-right');

            const clickSlider = () => {
              const slides = document.querySelectorAll('.slider__item');
              slides.forEach((elem) => {
                if (elem.classList.contains('slick-center')) {
                  let img = elem.querySelector('img');
                  $(img).click();
                }
              });
            };
            leftArrow.addEventListener('click', () => {
              $('.slider').slick('slickPrev');
              clickSlider();
            });
            rightArrow.addEventListener('click', () => {
              $('.slider').slick('slickNext');
              clickSlider();
            });
          };
          clickArrow();
        };
        activeSlider();
        const clickArrow = () => {
          const leftArrow = document.querySelector('.slider-left'),
            rightArrow = document.querySelector('.slider-right');

          const clickSlider = () => {
            const slides = document.querySelectorAll('.slider__item');
            slides.forEach((elem) => {
              if (elem.classList.contains('slick-center')) {
                let img = elem.querySelector('img');
                $(img).click();
              }
            });
          };
          leftArrow.addEventListener('click', clickSlider);
          rightArrow.addEventListener('click', clickSlider);
        };
        clickArrow();

        const createNewImg = () => {
          count++;
          let way = `https://justbecome.pro/static/oqqo/constructor/${target}/Templates/${count}.png`,
            item = document.createElement('div'),
            img = new Image();
          item.classList.add('slider__item');
          img.src = way;
          item.appendChild(img);

          const addNewIamge = () => {
            $('.slider').slick('slickAdd', item);
            createNewImg();
          };
          img.onload = addNewIamge;
          return;
        };
        createNewImg();
      };
      slider.innerHTML = ``;
      model.classList.add('display');
      slider.classList.remove('slick-initialized');
      slider.classList.remove('slick-slider');
      $('input[id^=check]').each(function () {
        this.checked = false;
      });
      $('input[name^=field]').each(function () {
        if (this.name !== 'field_is_mirror') this.value = '';
      });
      startSlider(target.value);
      for (let i = 0; i < options.length; i++) {
        if (options[i].value.substring(0, mark.value.length) === mark.value) {
          param ? param = false : launcher('', options[i].value, false);
          break;
        }
      }
      fieldMark[0].value = mark.value;
    });
  };
  addTemplates();

  let cloneImg = document.createElement('img');
  // Add bg for Rezult
  const getBgRezult = () => {
    const slider = document.querySelector('.slider'),
      model = document.getElementById('model'),
      fieldTemplate = document.getElementsByName('field_template'),
      rezult = document.querySelector('.konstrukt__image');

    slider.addEventListener('click', function (event) {
      let target = event.target;

      const slides = document.querySelectorAll('.slick-slide');
      if (target.closest('div.slider__item') && slides.length !== 3) {
        slides.forEach((item) => {
          item.classList.remove('center');
        });
        let elem = target.closest('div.slider__item');
        elem.classList.add('center');
        $('.slider').slick('slickGoTo', $(elem).data('slick-index'));
      } else if (target.closest('div.slider__item') && slides.length === 3) {
        slides.forEach((item) => {
          item.classList.remove('center');
        });
        let elem = target.closest('div.slider__item');
        elem.classList.add('center');
      }

      if (target.tagName === 'IMG') {
        cloneImg.src = target.src;
        cloneImg.classList.add('size__image');
        model.classList.remove('display');
        fieldTemplate[0].value = cloneImg.src;
        rezult.appendChild(cloneImg);
      }
    });
  };

  // Изолированный блок кода, внутри обработчика ошибки.
  const main = () => {

    // add option model
    const getOption = () => {
      const model = document.getElementById('model'),
        mark = document.getElementById('mark'),
        range = document.getElementById('range'),
        fieldModel = document.getElementsByName('field_model');
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
      model.addEventListener('change', (event) => {
        let target = event.target;
        range.value = 0;
        fieldModel[0].value = target.value.slice(mark.value.length + 1);
        getRadio(target.value.slice(mark.value.length + 1));
      });
    };
    getOption();

    // add Radio input
    const getRadio = (car) => {
      const form = document.getElementById('radio-form'),
        model = document.getElementById('model'),
        noSearh = document.getElementById('noSearh'),
        rezult = document.querySelector('.konstrukt__image'),
        fieldColor = document.getElementsByName('field_color'),
        range = document.getElementById('range'),
        div = document.getElementById('block_color_car');
      let carImg = document.getElementById('car');
      if (carImg) {
        rezult.removeChild(carImg);
      }
      form.classList.remove('display');
      model.addEventListener('change', () => {
        $('input[id^=check]').each(function () {
          this.checked = false;
          this.disabled = false;
          if (this.name === 'black') {
            $(this).click();
            this.checked = true;
          }
        });
      });
      form.addEventListener('change', event => {
        let target = event.target;
        fieldColor[0].value = target.name;
        const mark = document.getElementById('mark');
        let way = null;
        way = `https://justbecome.pro/static/oqqo/constructor/${mark.value}/Cars/${car}/`;
        const getCar = (color) => {
          if (color === 'null') {
            if (imgModel.src === `https://justbecome.pro/static/oqqo/constructor/null.png`) div.classList.remove('display');
            way = `https://justbecome.pro/static/oqqo/constructor/${color}.png`;
          } else {
            div.classList.add('display');
            way += `${color}.png`;
          }
          imgModel.src = way;
          imgModel.style.cssText = `
            display: block;
            position: absolute;
            bottom: 0;`;
          imgModel.id = 'car';
          imgModel.classList.add('ui-widget-content');
          imgModel.classList.remove('flip');
          setTimeout(() => {
            range.value = 25;
            imgModel.style.maxWidth = '125%';
            imgModel.style.width = '125%';
            rezult.appendChild(imgModel);
            addDragNDrop();
            editingSize();
          }, 200);
        };

        if (target.name === 'black') getCar('black');
        if (target.name === 'white') getCar('white');
        if (target.name === 'grey') getCar('grey');
        if (target.name === 'other') getCar('null');

        imgModel.onerror = () => {
          getCar('null');
        };
      });

      // Only one radio
      const onePoint = () => {
        const check = document.getElementById('noSearh'),
          fieldModel = document.getElementsByName('field_model'),
          divModel = document.getElementById('block_model_car'),
          fieldMark = document.getElementsByName('field_mark');
        $('#radio-form').eq(0).on('change', function (e) {
          if (e.target.name === 'black' || e.target.name === 'white' || e.target.name === 'grey') {
            const mark = document.getElementById('mark'),
              model = document.getElementById('model');
            divModel.classList.add('display');
            fieldMark[0].value = mark.value;
            fieldModel[0].value = model.value.substring(mark.value.length + 1);
            check.checked = false;
          }
          $('input[id^=check]').each(function () {
            if (e.target !== this) {
              this.checked = false;
              this.disabled = false;
            } else this.disabled = true;
          });
        });

      };
      onePoint();
    };

    // Move model
    const addDragNDrop = () => {
      const fieldPosition = document.getElementsByName('field_position');
      fieldPosition[0].value = `Position: 0X 0Y (В см.)`;
      const rezult = document.querySelector('.konstrukt__image'),
        elem = document.getElementById('car');
      const draggie = new Draggabilly(elem, {
        containment: 'body'
      });

      function notify(dragEvent, draggieInstance, event, pointer) {
        rezult.classList.remove('after');
        triggerModel = 1;
        var position = draggieInstance.position;
        var message = `Position: ${(position.x*0.0264).toFixed(2)}X ${((position.y - 258)*0.0264).toFixed(2)}Y (В см.)`;
        fieldPosition[0].value = message;
      }

      draggie.on('pointerDown', function (event, pointer) {
        notify('pointerDown', this, event, pointer);
      });

      draggie.on('dragStart', function (event, pointer) {
        notify('dragStart', this, event, pointer);
      });

      draggie.on('dragMove', function (event, pointer) {
        notify('dragMove', this, event, pointer);
      });

      draggie.on('dragEnd', function (event, pointer) {
        notify('dragEnd', this, event, pointer);
      });

      draggie.on('staticClick', function (event, pointer) {
        notify('staticClick', this, event, pointer);
      });

    };

    // Size editing model-img
    const editingSize = () => {
      const car = document.getElementById('car'),
        fieldScale = document.getElementsByName('field_scale'),
        range = document.getElementById('range');
      fieldScale[0].value = '125%';
      range.addEventListener('input', () => {
        $('#range').removeClass('before');
        triggerRange = 1;
        car.style.maxWidth = `${100 + (range.value * 1)}%`;
        car.style.width = `${100 + (range.value * 1)}%`;
        fieldScale[0].value = `${100 + (range.value * 1)}%`;
      });
    };
  };
});