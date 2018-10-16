// Модель (данные)
const usedEmails = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];
const validationList = [ // описание валидации
  {
    name: 'emailIs',
    isValid: function(value) {
      if (value) {
        return true;
      } else {
        return false;
      }
    },
    errorMessage: 'Укажите электронную почту! Это обязательное поле.'
  }, {
    name: 'emailValid',
    isValid: function(value) {
      if (value) {
        return (/^\w+@[a-z]+\.[a-z]+$/i).test(value);
      } else {
        return true;
      }
    },
    errorMessage: 'Укажите валидную электронную почту!'
  }, {
    name: 'emailBusy',
    isValid: function(value) {
      if (usedEmails.indexOf(value) !== -1) {
        return false;
      } else {
        return true;
      }
    },
    errorMessage: 'Email уже занят. Выберите другой email.'
  }, {
    name: 'passwordIs',
    isValid: function(value) {
      if (value) {
        return true;
      } else {
        return false;
      }
    },
    errorMessage: 'Укажите пароль! Это обязательное поле.'
  }, {
    name: 'passwordLength',
    isValid: function(value) {
      if (value) {
        return (/^.{5,}$/i).test(value);
      } else {
        return true;
      }
    },
    errorMessage: 'Ваш пароль должен быть не менее 5 символов!'
  }, {
    name: 'forbiddenSymbol',
    isValid: function(value) {
      return !(/[^(a-z)\d-_]/i).test(value);
    },
    errorMessage: 'Ваш пароль содержит запрещенные символы! Разрешенные - латинские буквы, цифры, подчеркивание, минус.'
  }, {
    name: 'phoneFormat',
    isValid: function(value) {
      return (/^\+\d{12,12}$/).test(value);
    },
    errorMessage: 'Номер должен быть в международном формате! Например: +380 509 993 322'
  }, {
    name: 'checked',
    isValid: function(value) {
      var checkbox = document.getElementById(value);
      if (checkbox.checked) {
        return true;
      } else {
        return false;
      }
    },
    errorMessage: 'Поставьте галочку «Согласен со всем»'
  }
];

// Список полей с конфигурацией
const fieldList = [
  {
    field: 'email',
    id: 'email',
    isRequired: true,
    validationList: ['emailIs', 'emailValid', 'emailBusy']
  }, {
    field: 'password',
    id: 'password',
    isRequired: true,
    validationList: ['passwordIs', 'passwordLength', 'forbiddenSymbol']
  }, {
    field: 'city',
    id: 'city',
    isRequired: false,
    validationList: []
  }, {
    field: 'phone',
    id: 'phone',
    isRequired: false,
    validationList: ['phoneFormat']
  }, {
    field: 'check',
    id: 'check',
    isRequired: true,
    validationList: ['checked']
  }
];

// Контроллер :-)
const validate = function(formDOMElement, fieldList, validationList) {
  const state = { // Состояние текущее формы со всеми полями
    formDOMElement: formDOMElement,
    isFormValid: false,
    validationList: validationList,
    fieldList: []        // Список всех полей Приложения
  };

  // Добавляем в состояние все поля
  fieldList.forEach(function(configuration) {
    const newField = {
      field: configuration.field,
      id: configuration.id,
      domElement: null,
      input: '',
      isRequired: configuration.isRequired,
      isFieldValid: false,
      errorList: [],
      validationRuleList: configuration.validationList
    };
    state.fieldList.push(newField);
  });
  console.dir('Начальное состояние', state);

  // Присваиваем каждому полю его DOM узел
  state.fieldList.forEach(function(field) {
    field.domElement = document.getElementById(field.id);
  });

  // Устанавливаем обработчики событий на инпуты
  state.fieldList.forEach(function(field) {
    field.domElement.addEventListener('blur', function(e) {

      // clearErrorFrame(field);
      if (e.target.id === 'check') {      // Введенное значение того поля, на котором произошло событие
        field.input = 'check';
      } else {
        field.input = e.target.value;
      }
      
      validateField(field, state.validationList);    // Приоизводим валидацию поля
      renderField(field);       // Отрисовываем внешний вид поля (добавляем ошибки, если есть)
      validateForm(state);
      console.dir('Состояние после потери фокуса', state);
    });

    field.domElement.addEventListener('focus', function(e) {
      clearErrorFrame(field);
      validateForm(state);
    });

    if (field.id === 'check') {
      field.domElement.addEventListener('click', function(e) {
        if (field.domElement.checked) {
          field.isFieldValid = true;
        } else {
          field.isFieldValid = false;
        }
        validateForm(state);
        console.dir('Состояние после клика', state);
      });
    }

    field.domElement.addEventListener('input', function(e) {
      validateForm(state);
      console.dir('Состояние после события input', state);
    });

  });

  // Обработчик события на всю форму
  state.formDOMElement.addEventListener('submit', function(e) {

    console.log ('Нажали на кнопку');

    validateForm(state);

    if (!state.isFormValid) {
      e.preventDefault();
      renderForm(state);
    } else {
      alert('Данные формы отправлены!');
    }
  });
};

// Функция валидации одного поля
const validateField = function(field, validationList) {

  const inputValue = field.input;

  field.isFieldValid = true;

  if (field.validationRuleList.length !== 0) {
    field.validationRuleList.forEach(function(rule) {   // Перебираем каждый элемент массива validationRuleList

      // Находим объект в массиве validationList, в котором имя совпадает с элементом массива validationRuleList
      const validation = validationList.find(function(validation) {
        return validation.name === rule;
      });

      const isFieldInvalid = !validation.isValid(inputValue);
      // Если поле невалидно и обязательно к заполнению ИЛИ невалидно и это телефон и какие-то символы уже введены
      if ((isFieldInvalid && field.isRequired) || (isFieldInvalid && field.id === 'phone' && inputValue !== '')) {
        field.isFieldValid = false;
        field.errorList.push({
          text: validation.errorMessage,
          domElement: null
        });
      }
    });

    if (field.isFieldValid) field.errorList = [];  // Очищаем ошибки
  }
};

const renderField = function(field) {
  if (field.isFieldValid) {
    clearErrorFrame(field);
  } else {
    const parentDOMElement = field.domElement.parentNode;

    parentDOMElement.classList.add('has-error');

    field.errorList.forEach(function(error) {
      const errorFrame = document.createElement('div');

      errorFrame.classList.add('alert', 'alert-danger');
      errorFrame.textContent = error.text;

      error.domElement = errorFrame;

      parentDOMElement.appendChild(errorFrame);
    });
  }
};

// Проверяем валидна ли форма
const validateForm = function(state) {
  var button = document.querySelector('.btn'),
      formValid = [];
  state.fieldList.forEach(function(field) {
    if (field.isRequired) {
      if (field.isFieldValid) {
        formValid.push(true);
      } else {
        formValid.push(false);
      }
    }
  });
  //console.log (formValid);
  if (formValid.indexOf(false) !== -1) {
    state.isFormValid = false;
    button.classList.add('disabled');
  } else {
    state.isFormValid = true;
    button.classList.remove('disabled');
  }
};

// Заполнены ли обязательные поля
const renderForm = function(state) {
  // debugger;
  console.log ('isFormValid= ', state.isFormValid);

  var fieldRequired = document.querySelectorAll('.form-group.required'),
      button = document.querySelector('.btn'),
      divErrorHas = button.previousElementSibling;
  console.log ('Див с ошибкой: ', divErrorHas);

  if (!state.isFormValid) {
    //clearErrorFrame(field);
    if (!divErrorHas) {
      var errorMsg = document.createElement('div');
      errorMsg.className = 'alert alert-danger';
      errorMsg.innerHTML = 'Заполните все обязательные поля!';
      button.before(errorMsg);

      fieldRequired.forEach(function (field) {
        field.classList.add('has-error');
      });
    }
  }
};

// Очищение от ошибок
const clearErrorFrame = function(field) {
  const parentDOMElement = field.domElement.parentNode;

  parentDOMElement.classList.remove('has-error');

  field.errorList.forEach(function(error) {
    parentDOMElement.removeChild(error.domElement);
  });

  field.errorList = [];
};

// Вызываем функцию Контроллер, чтобы все работало
validate(document.getElementById('form'), fieldList, validationList);
