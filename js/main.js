document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // All the necessary elements
  const mark = document.getElementById('mark'),
        model = document.getElementById('model'),
        noSearch = document.getElementById('noSearch'),
        range = document.getElementById('range'),
        colorCar = document.getElementById('color_car'),
        colorCar2 = document.getElementById('color_car_2'),
        modelCar = document.getElementById('model_car'),
        fieldMark = document.getElementsByName('case_mark'),
        fieldModel = document.getElementsByName('case_model'),
        fieldColor = document.getElementsByName('case_color'),
        fieldScale =  document.getElementsByName('case_scale'),
        fieldIsMirror = document.getElementsByName('case_is_mirror'),
        fieldTemplate = document.getElementsByName('case_template'),
        fieldPosition = document.getElementsByName('case_position'),
        result = document.querySelector('konstrukt-rezult'),
        image = document.querySelector('#konstrukt__image'),
        form = document.getElementById('radio-form'),
        popup = document.getElementById('popup'),
        divModel = document.getElementById('block_model_car'),
        divColor = document.getElementById('block_color_car'),
        divColor2 = document.getElementById('block_color_car_2'),
        divVertical = document.getElementById('block_vertical'),
        buttonVertical = document.getElementById('vertical'),
        options = model.querySelectorAll('option'),
        slider = document.querySelector('.slider'),
        loading = document.getElementById('loading'),
        urlParam = new URLSearchParams(window.location.search),
        leftArrow = document.querySelector('.slider-left'),
        rightArrow = document.querySelector('.slider-right'),

        // Update script
        fieldTovar = document.getElementsByName('product'),
        fieldCoverMark = document.getElementsByName('obl_mark'),
        fieldCoverModel = document.getElementsByName('obl_model'),
        fieldCoverColor = document.getElementsByName('obl_color'),
        fieldCoverIsMirror = document.getElementsByName('obl_is_mirror'),
        fieldCoverTemplate = document.getElementsByName('obl_template'),
        fieldCoverPosition = document.getElementsByName('obl_position'),
        fieldCoverScale =  document.getElementsByName('obl_scale'),
        productRadio = document.querySelectorAll('.product__radio'),
        buttonCase = document.getElementById('button-case'),

        radioCase = document.getElementById('case'),
        radioCover = document.getElementById('cover'),
        radioCaseCover = document.getElementById('caseCover'),
        
        modal = document.getElementById('modal');


  let imgModel = document.createElement('img'),
      cloneImgModel = document.createElement('img'),
      draggie = {},
      sum = 0,
      count = 0,
      countStart = 0,
      countStartCover = 0,
      countChangeButtons = 0,
      settingsCase = {},
      settingsCover = {};
             
            
  class Constructor {
    constructor(mode = 'case') {
      this.param = false;
      this.classOptions = [];
      this.triggerModel = 0;
      this.triggerRange = 0;

      this.carMark = '';
      this.carModel = '';
      this.flag = false;
      this.NoMyCar = false;
      this.carChange = '';

      this.mode = mode;
    }

    start() {
      this.fillInClassOptions();
      this.searchParam();
      this.flipVertical();

      if(this.mode === 'case') {
        image.classList.add('konstrukt__image');
      } else {
        image.classList.add('konstrukt-cover__image');
      }
    }

    clearConstructor() {
      range.value = 0;

      if(imgModel.id === 'car') {
        image.removeChild(imgModel);
        image.removeChild(cloneImgModel);
      }

      model.classList.add('display');
      $('input[id^=check]').each(function () {
        this.checked = false;
      });

      if(noSearch.checked) {
        let event = new Event('click');
        noSearch.dispatchEvent(event);
      }

      const slides = document.querySelectorAll('.slick-slide');

      if(slides.length) {
        slides.forEach(elem => {
          $('.slider').slick('slickRemove', elem.dataset.slickIndex);
        });
      }
      if(slider.classList.contains('slick-initialized')) {
        $('.slider').slick('unslick');
        draggie.destroy();
      }
      slider.textContent = '';
      popup.style.display = 'none';
      mark.disabled = false;
      model.disabled = false;
      divModel.classList.add('display');
      divColor.classList.add('display');
      colorCar.value = '';
      colorCar2.value = '';
      modelCar.value = '';  
    }

    launcher(carMark, carModel, flag, NoMyCar = false) {
      loading.style.display = 'flex';
  
      $('input[id^=check]').each(function () {
        this.checked = false;
        this.disabled = false;
      });
  
      const changeMark = () => {
        mark.value = carMark;
        let event = new Event('change');
        mark.dispatchEvent(event);
      };
      
      this.carMark = carMark;
      this.carModel = carModel;
      this.flag = flag;

      if(countStartCover === 1 && this.mode === 'cover') {
        this.NoMyCar = settingsCase.noMyCar;
        settingsCover.modelText = settingsCase.modelText;
        settingsCover.colorText = settingsCase.colorText;
      } else if(countStart <= 1) {
        this.NoMyCar = NoMyCar;
      } else if(this.mode === 'case') {
        this.NoMyCar = settingsCase.noMyCar;
      } else if(this.mode === 'cover') {
        this.NoMyCar = settingsCover.noMyCar;
      }
      

      if(this.mode === 'case') settingsCase.model = this.carModel;
      else settingsCover.model = this.carModel;
    
      if (flag) setTimeout(changeMark, 1);
    }

    fillInClassOptions() {
      options.forEach(elem => this.classOptions.push(elem.value));
    }

    searchParam() {
      if(urlParam.get('mark') && urlParam.get('model')) {
        this.launcher(urlParam.get('mark'), urlParam.get('model'), !0);
        this.param = true;
      } else if (urlParam.get('noMyCar')) {
        this.launcher('BMW', '', !0, true);
        if(urlParam.get('modelUniq') && urlParam.get('colorUniq')) {
          let inputModel = urlParam.get('modelUniq'),
              inputColor = urlParam.get('colorUniq');
          colorCar.value = inputColor;
          modelCar.value = inputModel;
          setTimeout(() => {
            fieldColor[0].value = inputColor;
            fieldMark[0].value = inputModel;  
          }, 2100); 
        }
        this.param = true;
      } else {
        if(this.mode === 'case') {
          if(settingsCase.hasOwnProperty('mark')) {
            this.launcher(settingsCase.mark, settingsCase.model, true);
          } else {
            this.launcher('BMW', 'BMW_3_series_VII_(G2x)_2018-2020', true);
          }
        } else {
          countStartCover++;
          if(countStartCover === 1) {
            if(settingsCase.hasOwnProperty('mark')) {
              this.launcher(settingsCase.mark, settingsCase.model, true);
            } else {
              this.launcher('BMW', 'BMW_3_series_VII_(G2x)_2018-2020', true);
            }
          } else {
            if(settingsCover.hasOwnProperty('mark')) {
              this.launcher(settingsCover.mark, settingsCover.model, true);
            } else {
              this.launcher('BMW', 'BMW_3_series_VII_(G2x)_2018-2020', true);
            }
          }
        }
      }
    }

    flipVertical() {
      count = 0;
      divVertical.classList.remove('display');
       if(countStartCover === 1 && settingsCase.mirror === 'yes') {
        fieldCoverIsMirror[0].value = 'yes';
        settingsCover.mirror = 'yes';
        count++;
      } else if(this.mode === 'case') {
        if(settingsCase.mirror !== 'yes') {
          fieldIsMirror[0].value = 'no';
          settingsCase.mirror = 'no';
        } else {
          fieldIsMirror[0].value = 'yes';
          settingsCase.mirror = 'yes';
          count++;
        }
      } else if(this.mode === 'cover') {
        if(settingsCover.mirror !== 'yes') {
          fieldCoverIsMirror[0].value = 'no';
          settingsCover.mirror = 'no';
        } else {
          fieldCoverIsMirror[0].value = 'yes';
          settingsCover.mirror = 'yes';
          count++;
        }
      }
    }

    setOption() {
      model.textContent = ``;
      const addOption = (val1, val2) => {
        const option = document.createElement('option');
        option.value = val1;
        do {
          val2 = val2.replace(/[_]+/, ' ');
        } while (val2.match(/_/));
        option.textContent = val2;
        model.appendChild(option);
      };
      this.classOptions.forEach((elem) => {
        if (elem.substring(0, mark.value.length) === mark.value) {
          addOption(elem, elem.substring(mark.value.length + 1));
        }
      });
    }

    getCar(color, way) {
      if (color === 'null') {
        divColor2.classList.remove('display');
        way = `https://justbecome.pro/static/oqqo/constructor/${color}.png`;
      } else {
        divColor2.classList.add('display');
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
      range.value = 25;
      imgModel.style.maxWidth = '125%';
      imgModel.style.width = '125%';
      image.appendChild(imgModel);

      if(countStartCover > 0) {
        if(countStartCover === 3 && this.mode === 'cover' && settingsCase.mirror === 'yes') {
          imgModel.classList.add('flip');
        } else if (this.mode === 'cover' && settingsCover.mirror === 'yes') {
          imgModel.classList.add('flip');
        } else if(this.mode === 'case' && settingsCase.mirror === 'yes') {
          imgModel.classList.add('flip');
        }
      }

      this.addDragNDrop();
      this.editingSize();
    }

    clickSlider() {
      const slides = document.querySelectorAll('.slider__item');
      
      const changeImage = (index, flag) => {
        
        const click = (elem) => {
          let img = elem.querySelector('img');
          $(img).click();
          if(this.mode === 'case') settingsCase.slideIndex = elem.dataset.slickIndex;
          else settingsCover.slideIndex = elem.dataset.slickIndex;
        };
        
        slides.forEach(elem => {
          if(flag) {
            if (elem.classList.contains('slick-center') && elem.classList.contains('slick-current')) {
              click(elem);
            }
          } else {
            if(index == elem.dataset.slickIndex) {
              click(elem);
            }
          }
        });
      };

      const select = (obj) => {
        slides.forEach(elem => {
          if(elem.classList.contains('slick-center') && elem.classList.contains('slick-current') && elem.dataset.slickIndex !== settingsCase.slideIndex) {
            changeImage(elem.dataset.slickIndex, false);
          } else {
            changeImage(obj.slideIndex, false);
          }
        });
      };

      let arrayIndexes = [];

      slides.forEach(elem => arrayIndexes.push(elem.dataset.slickIndex));

      if(countStartCover > 2) {
        if(countStart >= 2 && this.mode === 'case') {
          select(settingsCase);
        } else if(this.mode === 'cover'){
          select(settingsCover);
        } else {
          changeImage(null, true);
        }
      } else if(countStartCover === 2 && arrayIndexes.indexOf(settingsCase.slideIndex) !== -1) {
        changeImage(settingsCase.slideIndex, false);
        countStartCover++;
      } else if(countStart === 0 || countStartCover === 2) {
        changeImage(null, true);
      }
    }

    clickColor() {
      let check;
      let event = new Event('input');
      if(this.mode === 'cover' && countStartCover === 3) {
        check = document.getElementsByName(settingsCase.color)[0];
        if(settingsCase.settingsCase === 'other') {
          colorCar2.value = settingsCase.colorText2;
        } 
      } else if(this.mode === 'case') {
        if(settingsCase.hasOwnProperty('color')) {
          check = document.getElementsByName(settingsCase.color)[0];
          if(settingsCase.color === 'other') {
            colorCar2.value = settingsCase.colorText2;
          }     
        } else {
          check = document.getElementById('check2');
        }
      } else if (this.mode === 'cover') {
        if(settingsCover.hasOwnProperty('color')) {
          check = document.getElementsByName(settingsCover.color)[0];
          if(settingsCover.color === 'other') {
            colorCar2.value = settingsCover.colorText2;
          }  
        } else {
          check = document.getElementById('check2');
        }
      }
      $(check).click();
      if (this.mode === 'case') {
        if(settingsCase.color === 'other') colorCar2.dispatchEvent(event);
      } else {
        if(settingsCover.color === 'other') colorCar2.dispatchEvent(event);
      }
    }

    createNewImg(target, count) {
      count++;
      let way = '';
      if(this.mode === 'case') {
        way = `https://justbecome.pro/static/oqqo/constructor/${target}/Templates/${count}.png`;
      } else {
        
        way = `https://justbecome.pro/static/oqqo/constructor/Oblojka/${target}/${count}.png`;
      }
      let item = document.createElement('div'),
          img = document.createElement('img');
      item.classList.add('slider__item');
      img.src = way;
      item.appendChild(img);

      const addNewIamge = () => {
        $('.slider').slick('slickAdd', item);
        this.createNewImg(target, count);
      };

      const errorImg = () => {
        const addTitle = () => {
          setTimeout(() => {
            if (countStart === 0) $('#range').addClass('before');
            if (countStart === 0) $('#konstrukt__image').addClass('after');
          }, 500);
          if (noSearch.checked) $('#konstrukt__image').removeClass('after');
          setTimeout(() => {
            $('#range').removeClass('before');
            $('#konstrukt__image').removeClass('after');
          }, 8000);
        };
    
        const changeModel = () => {
          debugger;
          model.value = !!this.carMark ? `${this.carMark}_${this.carModel}` : this.carModel;
          if(model.value === '') model.value = 'BMW_3_series_VII_(G2x)_2018-2020';
          let event = new Event('change');
          model.dispatchEvent(event);
        };
    
        const clickCheckNoMyCar = () => {
          let check = document.getElementById('noSearch');
          $(check).click();
        };

        this.clickSlider();
        addTitle();
        changeModel();
        this.clickColor();
        if(this.NoMyCar) clickCheckNoMyCar();
        else {
          let event = new Event('input');
          if(this.mode === 'cover' && countStartCover === 3) {
            range.value = settingsCase.carWidth;
          } else if(this.mode === 'cover' && countStartCover === 2) {
            range.value = 0;
          } else if(this.mode === 'case') {
            range.value = settingsCase.carWidth;
          } else if (this.mode === 'cover') {
            range.value = settingsCover.carWidth;
          }
          range.dispatchEvent(event);
        }

        loading.style.display = 'none';
      };
      img.onload = addNewIamge;
      img.onerror = errorImg;
      return;
    }

    startSlider(target) {
      $('.slider').slick({
        centerMode: true,
        infinite: true,
        swipe: false,
        arrows: false,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
      });
      this.setOption();

      this.createNewImg(target, 0);
    }

    noSearchListener() {
      if (noSearch.checked) {
        if(countStart === 0) popup.style.display = 'block';
        mark.disabled = true;
        model.disabled = true;
        form.classList.add('display');
        
        divModel.classList.remove('display');
        divColor.classList.remove('display');

        if (document.body.clientWidth <= 567) result.style.height = '435px';
        
        if(this.mode === 'case') {
          fieldColor[0].value = colorCar.value;
          settingsCase.noMyCar = noSearch.checked;
          fieldModel[0].value = '-';
          if(settingsCase.modelText !== '' && settingsCase.hasOwnProperty('modelText')) {
            fieldMark[0].value = settingsCase.modelText;
            modelCar.value = settingsCase.modelText;
          }
          if(settingsCase.colorText !== '' && settingsCase.hasOwnProperty('colorText')) {
            fieldColor[0].value = settingsCase.colorText;
            colorCar.value = settingsCase.colorText;
          }
        } else {
          fieldCoverColor[0].value = colorCar.value;
          settingsCover.noMyCar = noSearch.checked;
          fieldCoverModel[0].value = '-';
          if(settingsCover.modelText !== '' && settingsCover.hasOwnProperty('modelText')) {
            fieldCoverMark[0].value = settingsCover.modelText;
            modelCar.value = settingsCover.modelText;
          }
          if(settingsCover.colorText !== '' && settingsCover.hasOwnProperty('colorText')) {
            fieldCoverColor[0].value = settingsCover.colorText;
            colorCar.value = settingsCover.colorText;
          }
        }

        const car = document.getElementById('car');
        car.src = `https://justbecome.pro/static/oqqo/constructor/null.png`;
        
      } else {

        popup.style.display = 'none';
        
        if (document.body.clientWidth <= 567) result.style.height = '700px';
        let text = model.value.slice(mark.value.length + 1);
        if(this.mode === 'case') {
          fieldModel[0].value = text;
          settingsCase.model = text;
        } else {
          fieldCoverModel[0].value = text;
          settingsCover.model = text;
        }
        mark.disabled = false;
        model.disabled = false;
        form.classList.remove('display');
        divModel.classList.add('display');
        divColor.classList.add('display');
        

        if(!divColor2.classList.contains('display')) {
          if(this.mode === 'case') {
            settingsCase.color = colorCar2.value;
            fieldColor[0].value = colorCar2.value;
          } else {
            settingsCover.color = colorCar2.value;
            fieldCoverColor[0].value = colorCar2.value;
          }
        } else {
          let mode = this.mode;
          $('input[id^=check]').each(function () {
            if (this.checked) {
              if(mode === 'case') {
                settingsCase.color = this.name;
                fieldColor[0].value = this.name;
              } else {
                settingsCover.color = this.name;
                fieldCoverColor[0].value = this.name;
              }
            } 
          });
        }
        const car = document.getElementById('car');
        if(this.mode === 'case') {
          car.src = `https://justbecome.pro/static/oqqo/constructor/${settingsCase.mark}/Cars/${settingsCase.model}/${settingsCase.color}.png`;
          settingsCase.noMyCar = noSearch.checked;
        }
        else {
          car.src = `https://justbecome.pro/static/oqqo/constructor/${settingsCover.mark}/Cars/${settingsCover.model}/${settingsCover.color}.png`;
          settingsCover.noMyCar = noSearch.checked;
        }
      }
    }

    popupListener(event) {
      let target = event.target;
      if (target.classList.value === 'popup__close' || target.classList.value === 'konstrukt__button') {
        popup.style.display = 'none';
      }
    }

    sliderListener(event) {
      let target = event.target;    
      const slides = document.querySelectorAll('.slick-slide');

      let elem = target.closest('div.slider__item');
          elem.classList.add('center');

      if (target.closest('div.slider__item') && slides.length !== 3) {
        slides.forEach((item) => item.classList.remove('center'));

        $('.slider').slick('slickGoTo', $(elem).data('slick-index'));

      } else if (target.closest('div.slider__item') && slides.length === 3) {
        slides.forEach((item) => item.classList.remove('center'));
      }

      if (target.tagName === 'IMG') {
        cloneImgModel.src = target.src;
        
        model.classList.remove('display');
        if(this.mode === 'case') {
          fieldTemplate[0].value = cloneImgModel.src;
          cloneImgModel.classList.remove('size-cover__image');
          cloneImgModel.classList.add('size__image');
        } else {
          fieldCoverTemplate[0].value = cloneImgModel.src;
          cloneImgModel.classList.remove('size__image');
          cloneImgModel.classList.add('size-cover__image');
        }
        image.appendChild(cloneImgModel);
      }
    }

    leftArrowListener() {
      $('.slider').slick('slickPrev');
      this.clickSlider();
    }

    rightArrowListener() {
      $('.slider').slick('slickNext');
      this.clickSlider();
    }

    buttonVerticalListener() {
      const car = document.getElementById('car');
      if (car && !car.src.match(/null.png/)) {
        car.classList.toggle('flip');
        count++;
      }
      if (count % 2 !== 0) {
        if(this.mode === 'case') {
          fieldIsMirror[0].value = 'yes';
          settingsCase.mirror = 'yes';
        } else {
          fieldCoverIsMirror[0].value = 'yes';
          settingsCover.mirror = 'yes';
        }
      }
      else {
        if(this.mode === 'case') {
          fieldIsMirror[0].value = 'no';
          settingsCase.mirror = 'no';
        } else {
          fieldCoverIsMirror[0].value = 'no';
          settingsCover.mirror = 'no';
        }
      }
    }

    formListener(event) {
      let target = event.target;
      if(target.name !== 'color_car_2' && target.name !== 'range') {
        if(this.mode === 'case') {
          fieldColor[0].value = target.name;
          settingsCase.color = target.name;
        } else {
          fieldCoverColor[0].value = target.name;
          settingsCover.color = target.name;
        }
      }

      let way = null;
      way = `https://justbecome.pro/static/oqqo/constructor/${mark.value}/Cars/${this.carChange}/`;

      if (target.name === 'black') this.getCar('black', way);
      if (target.name === 'white') this.getCar('white', way);
      if (target.name === 'grey') this.getCar('grey', way);
      if (target.name === 'other') this.getCar('null', way);

      imgModel.onerror = () => {
        this.getCar('null');
      };

      if (target.name === 'black' || target.name === 'white' || target.name === 'grey') {
        divModel.classList.add('display');
        if(this.mode === 'case') {
          fieldMark[0].value = mark.value;
          fieldModel[0].value = model.value.substring(mark.value.length + 1);
          settingsCase.noMyCar = false;
        } else {
          fieldCoverMark[0].value = mark.value;
          fieldCoverModel[0].value = model.value.substring(mark.value.length + 1);
          settingsCover.noMyCar = false;
        }
        noSearch.checked = false;
      }
      $('input[id^=check]').each(function () {
        if (target !== this) {
          this.checked = false;
          this.disabled = false;
        } else this.disabled = true;
      });
    }

    markListener(event) {
      let target = event.target;
      this.clearConstructor();
      countStart++;

      let temp = settingsCase.mark,
          tempCover = settingsCover.mark;

      if(this.mode === 'case') {
        fieldMark[0].value = mark.value;
        settingsCase.mark = target.value;
      } else {
        fieldCoverMark[0].value = mark.value;
        settingsCover.mark = target.value;
      }

      this.startSlider(target.value);
      
      for (let i = 0; i < options.length; i++) {
        let markText = options[i].value.substring(0, mark.value.length); 
        if (markText === mark.value) {
          if(this.param) this.param = false;
          debugger;
          if(countStartCover > 1) {
            if((countStart > 1 && this.mode === 'case') && temp === markText) {
              this.launcher('', `${mark.value}_${settingsCase.model}`, false);
            } else if(this.mode === 'cover' && tempCover === markText){
              this.launcher('', `${mark.value}_${settingsCover.model}`, false);
            } else {
              this.launcher('', options[i].value, false);
            }
          } else if(countStartCover === 1) {
            this.launcher('', `${mark.value}_${settingsCase.model}`, false);
            countStartCover++;
          } else if(countStart === 1 && (urlParam.get('mark'))) { 
            this.launcher(urlParam.get('mark'), urlParam.get('model'), !0);
          } else if(countStart === 1) {
            this.launcher('', options[i].value, false);
            countStart--;
          }
          break;
        }
      }
    }

    modelListener(event) {
      let target = event.target,
          text =  target.value.slice(mark.value.length + 1);

      this.carChange = text;

      const car = document.getElementById('car');
      if (car) image.removeChild(car);
      form.classList.remove('display');

      const changeColor = () => {
        $('input[id^=check]').each(function () {
          this.checked = false;
          this.disabled = false;
          if (this.name === 'black') {
            $(this).click();
            this.checked = true;
          }
        });
      };

      if(this.mode === 'case') {
        if(text !== settingsCase.model.slice(mark.value.length + 1)) changeColor();
        fieldModel[0].value = text;
        settingsCase.model = text;
      } else {
        if(text !== settingsCover.model.slice(mark.value.length + 1)) changeColor();
        fieldCoverModel[0].value = text;
        settingsCover.model = text;
      }
    }

    modelCarListener() {
      if(this.mode === 'case') {
        fieldMark[0].value = modelCar.value;
        settingsCase.modelText = modelCar.value;
      } else {
        fieldCoverMark[0].value = modelCar.value;
        settingsCover.modelText = modelCar.value;
      }
    }

    colorCarListener() {
      if(this.mode === 'case') {
        fieldColor[0].value = colorCar.value;
        settingsCase.colorText = colorCar.value;
      } else {
        fieldCoverColor[0].value = colorCar.value;
        settingsCover.colorText = colorCar.value;
      }
    }

    colorCar2Listener() {
     if(this.mode === 'case') {
      fieldColor[0].value = colorCar2.value;
      settingsCase.colorText2 = colorCar2.value;
     } else {
      fieldCoverColor[0].value = colorCar2.value;
      settingsCover.colorText2 = colorCar2.value;
     }
    }

    rangeListener() {
      $('#range').removeClass('before');
      this.triggerRange = 1;
      const car = document.getElementById('car');
      let carWidth =  `${100 + (range.value * 1)}%`;
      car.style.maxWidth = carWidth;
      car.style.width = carWidth;

      if(this.mode === 'case') {
        fieldScale[0].value = carWidth;
        settingsCase.carWidth = range.value;
      } else {
        fieldCoverScale[0].value = carWidth;
        settingsCover.carWidth = range.value;
      }
    }

    addDragNDrop() {
      const car = document.getElementById('car');
      draggie = new Draggabilly(car, { containment: 'body' });

      const getPosition = (x, y) => {
        return `Position: ${(x*0.0264).toFixed(2)}X ${((y - 258)*0.0264).toFixed(2)}Y (В см.)`;
      };
      

      if(this.mode === 'cover' && countStartCover === 3 && settingsCase.hasOwnProperty('positionX')) {
        fieldCoverPosition[0].value = getPosition(settingsCase.positionX, settingsCase.positionY);
        draggie.setPosition(settingsCase.positionX, settingsCase.positionY);
      } else if(this.mode === 'case') {
        if(settingsCase.hasOwnProperty('positionX')) {
          fieldPosition[0].value = getPosition(settingsCase.positionX, settingsCase.positionY);
          draggie.setPosition(settingsCase.positionX, settingsCase.positionY);
        } else {
          fieldPosition[0].value = `Position: 0X 0Y (В см.)`;
        }
      } else if (this.mode === 'cover') {
        if(settingsCover.hasOwnProperty('positionX')) {
          fieldCoverPosition[0].value = getPosition(settingsCover.positionX, settingsCover.positionY);
          draggie.setPosition(settingsCover.positionX, settingsCover.positionY);
        } else {
          fieldCoverPosition[0].value = `Position: 0X 0Y (В см.)`;
        }
      }
      

      const notify = (dragEvent, draggieInstance, event, pointer) => {
        let position = draggieInstance.position;
        let message = getPosition(position.x, position.y);
        if(buttonCase.classList.contains('active-button')) {
          fieldPosition[0].value = message;
          settingsCase.positionX = position.x;
          settingsCase.positionY = position.y;
        } else {
          fieldCoverPosition[0].value = message;
          settingsCover.positionX = position.x;
          settingsCover.positionY = position.y;
        }
      };

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

    }

    editingSize() {
      if(this.mode === 'case') fieldScale[0].value = '125%';
      else fieldCoverScale[0].value = '125%';
    }
  }

  const searchGift = () => {
    let product = document.getElementById('product'),
        images = product.querySelectorAll('.product__image'),
        subtitle = product.querySelectorAll('.product__subtitle'),
        price = product.querySelectorAll('.product__price'),
        desc = product.querySelectorAll('.product__desc');    
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
  };
  searchGift();

  let Case = new Constructor('case');
  let Cover = new Constructor('cover');


  let markListener = Case.markListener.bind(Case),
      modelListener = Case.modelListener.bind(Case),
      formListener = Case.formListener.bind(Case),
      buttonVerticalListener = Case.buttonVerticalListener.bind(Case),
      sliderListener = Case.sliderListener.bind(Case),
      leftArrowListener = Case.leftArrowListener.bind(Case),
      rightArrowListener= Case.rightArrowListener.bind(Case),
      popupListener = Case.popupListener.bind(Case),
      noSearchListener = Case.noSearchListener.bind(Case),
      colorCarListener = Case.colorCarListener.bind(Case),
      colorCar2Listener = Case.colorCar2Listener.bind(Case),
      modelCarListener = Case.modelCarListener.bind(Case),
      rangeListener = Case.rangeListener.bind(Case);

  let markListenerCover = Cover.markListener.bind(Cover),
      modelListenerCover = Cover.modelListener.bind(Cover),
      formListenerCover = Cover.formListener.bind(Cover),
      buttonVerticalListenerCover = Cover.buttonVerticalListener.bind(Cover),
      sliderListenerCover = Cover.sliderListener.bind(Cover),
      leftArrowListenerCover = Cover.leftArrowListener.bind(Cover),
      rightArrowListenerCover= Cover.rightArrowListener.bind(Cover),
      popupListenerCover = Cover.popupListener.bind(Cover),
      noSearchListenerCover = Cover.noSearchListener.bind(Cover),
      colorCarListenerCover = Cover.colorCarListener.bind(Cover),
      colorCar2ListenerCover = Cover.colorCar2Listener.bind(Cover),
      modelCarListenerCover = Cover.modelCarListener.bind(Cover),
      rangeListenerCover = Cover.rangeListener.bind(Cover);    
  

  const removeAllListeners = () => {
    mark.removeEventListener('change', markListener);
    model.removeEventListener('change', modelListener);
    form.removeEventListener('change', formListener);
    buttonVertical.removeEventListener('click', buttonVerticalListener);
    slider.removeEventListener('click', sliderListener);
    leftArrow.removeEventListener('click', leftArrowListener);
    rightArrow.removeEventListener('click', rightArrowListener);
    popup.removeEventListener('click', popupListener);
    noSearch.removeEventListener('change', noSearchListener);
    colorCar.removeEventListener('input', colorCarListener);
    colorCar2.removeEventListener('input', colorCar2Listener);
    modelCar.removeEventListener('input', modelCarListener);
    range.removeEventListener('input', rangeListener);

    mark.removeEventListener('change', markListenerCover);
    model.removeEventListener('change', modelListenerCover);
    form.removeEventListener('change', formListenerCover);
    buttonVertical.removeEventListener('click', buttonVerticalListenerCover);
    slider.removeEventListener('click', sliderListenerCover);
    leftArrow.removeEventListener('click', leftArrowListenerCover);
    rightArrow.removeEventListener('click', rightArrowListenerCover);
    popup.removeEventListener('click', popupListenerCover);
    noSearch.removeEventListener('change', noSearchListenerCover);
    colorCar.removeEventListener('input', colorCarListenerCover);
    colorCar2.removeEventListener('input', colorCar2ListenerCover);
    modelCar.removeEventListener('input', modelCarListenerCover);
    range.removeEventListener('input', rangeListenerCover);
  };

  const addListenersCase = () => {
    mark.addEventListener('change', markListener);
    model.addEventListener('change', modelListener);
    form.addEventListener('change', formListener);
    buttonVertical.addEventListener('click', buttonVerticalListener);
    slider.addEventListener('click', sliderListener);
    leftArrow.addEventListener('click', leftArrowListener);
    rightArrow.addEventListener('click', rightArrowListener);
    popup.addEventListener('click', popupListener);
    noSearch.addEventListener('change', noSearchListener);
    colorCar.addEventListener('input', colorCarListener);
    colorCar2.addEventListener('input', colorCar2Listener);
    modelCar.addEventListener('input', modelCarListener);
    range.addEventListener('input', rangeListener);
  };

  const addListenersCover = () => {
    mark.addEventListener('change', markListenerCover);
    model.addEventListener('change', modelListenerCover);
    form.addEventListener('change', formListenerCover);
    buttonVertical.addEventListener('click', buttonVerticalListenerCover);
    slider.addEventListener('click', sliderListenerCover);
    leftArrow.addEventListener('click', leftArrowListenerCover);
    rightArrow.addEventListener('click', rightArrowListenerCover);
    popup.addEventListener('click', popupListenerCover);
    noSearch.addEventListener('change', noSearchListenerCover);
    colorCar.addEventListener('input', colorCarListenerCover);
    colorCar2.addEventListener('input', colorCar2ListenerCover);
    modelCar.addEventListener('input', modelCarListenerCover);
    range.addEventListener('input', rangeListenerCover);
  };

  const fixDiasabled = () => {
    document.querySelector('#product').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    let event = new Event('click');
    setTimeout(() => radioCaseCover.dispatchEvent(event), 900);
    setTimeout(() => modal.style.display = 'block', 1500);
    countChangeButtons--;
  };

  const caseStart = () => {
    buttonCase.classList.remove('active-button');
    addListenersCase();
    Case.start();
  };

  const coverStart = () => {
    buttonCase.classList.add('active-button');
    addListenersCover();
    Cover.start();
  };

  const defaultSum = () => {
    // productRadio.forEach((elem) => {
    //   if(elem.checked) {
    //     let div = $(elem).siblings('.product-block__text')[0], price;
    //     if(elem.id === 'caseCover') {
    //       price = div.querySelector('.product__after');
    //     } else {
    //       price = div.querySelector('.product__price');
    //     }
    //     sum = Number(price.textContent.replace('₽', ''));    
    //   }
    // });
    // document.getElementById("cost").innerHTML = "<p>ИТОГО: <strong>" + sum + "₽</strong></p>";
  };
  defaultSum();

  // const sumResult = () => {
  //   defaultSum();
  //     let crossSaleArray = document.getElementsByName("cross_sale")[0].value.split(";");
  //     if (crossSaleArray[0] !== '') {
  //       crossSaleArray.forEach(element => {
  //         sum += Number(element.match(/\d+/)[0]);
  //       }); 
  //     } else defaultSum();

  //     document.getElementById("cost").innerHTML = "<p>ИТОГО: <strong>" + sum + "₽</strong></p>";
  // };

  const changeButtons = () => {
    buttonCase.addEventListener('click', () => { 
      removeAllListeners();
      if(countChangeButtons % 2 === 0) {
        if(radioCaseCover.checked || radioCase.checked) caseStart();
        else fixDiasabled();
      } else {
        if(radioCaseCover.checked || radioCover.checked) coverStart();
        else fixDiasabled();
      }
      countChangeButtons++;
      //sumResult();
      defaultSum();
    }, false);
  };
  changeButtons();

  const changeRadio = () => {
    productRadio.forEach(elem => {
      elem.addEventListener('click', () => {
        productRadio.forEach(radio => radio.checked = false);
        elem.checked = true;
        

        const inputValueInTovarField = (value) => {
          if(urlParam.get('utm_gift')) fieldTovar[0].value = `${value}+коробка`;
          else fieldTovar[0].value = value;
        };

        let click = new Event('click');

        switch(elem.id) {
          case 'case':
            inputValueInTovarField('чехол');
            buttonCase.classList.remove('active-button');
            countChangeButtons = 0;
            buttonCase.dispatchEvent(click);
            $('input[name^=obl_]').each(function () {
              this.value = '';
            });
            break;
          case 'cover':
            inputValueInTovarField('обложка');
            buttonCase.classList.remove('active-button');
            countChangeButtons = 1;
            buttonCase.dispatchEvent(click);
            $('input[name^=case_]').each(function () {
              this.value = '';
            });
            break;
          case 'caseCover': 
            inputValueInTovarField('чехол+обложка');
            buttonCase.classList.add('active-button');
            buttonCase.dispatchEvent(click); 
            break;
          default: break;
        }
        //sumResult();
        defaultSum();
      }, false);
    });
  };
  changeRadio();

  // setTimeout(() => {
  //   defaultSum();
  //   //document.getElementById("cost").innerHTML = "<p>ИТОГО: <strong>" + sum + "₽</strong></p>";

  //   window.addEventListener("load", function () {
  //     let crossSaleBlock = document.getElementsByClassName("t-img-select__container")[0];
  //     crossSaleBlock.addEventListener("click", sumResult);
  //   });
  // }, 600, true);

  const searchProduct = () => {
    let event = new Event('click');
    let num = Number(urlParam.get('utm_tovar'));
    if(typeof num === 'number' && num !== 0) {
      productRadio[num - 1].dispatchEvent(event);
    } else productRadio[0].dispatchEvent(event);
  };
  searchProduct();

  modal.addEventListener('click', (event) => {
    let target = event.target;
    if(target.classList.contains('modal__close') ||
       target.classList.contains('modal-window') ||
       target.classList.contains('modal__button')) {
        modal.style.display = 'none';
    }
  }, false);

  modal.addEventListener('touchend', () => {
    modal.style.display = 'none';
  }, false);

});