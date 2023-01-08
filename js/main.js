window.onload = function () {
    //настройка слайдера
    $('.filters').slick({
        fade: true,
        prevArrow: '<button class="slick-arrow slick-arrow-left"><img src="images/left-arrow.svg" alt="left arrow"></button> ',
        nextArrow: '<button class="slick-arrow slick-arrow-right"><img src="images/right-arrow.svg" alt="right arrow" ></button>',
        draggable: false,
    });

    //настройка випадающого списка
    let select = function () {
        let selectHeader = document.querySelectorAll('.filter-select-header');
        let selectItem = document.querySelectorAll('.filter-select-item');

        function selectToggle() {
            this.parentElement.classList.toggle('filter-select-active');
        }

        function selectChoose() {
            let text = this.innerText;
            let currentText = this.closest('.filter-select').querySelector('.filter-select-current');
            let select = this.closest('.filter-select');
            currentText.innerText = text;
            select.classList.remove('filter-select-active');
        }

        selectHeader.forEach(item => {
            item.addEventListener('click', selectToggle);
        });
        selectItem.forEach(item => {
            item.addEventListener('click', selectChoose);
        });
    };
    select();

    // Для плавного скроллу
    const scroll = () => {
        $('.menu, .footer-menu').on('click', 'a', function (e) {
            e.preventDefault();
            let cl = $(this).attr('href'),
                top = $(cl).offset().top;
            $('html,body').animate({
                scrollTop: top
            }, 1000)
        });
        $('.header-btn').on('click', function (e) {
            e.preventDefault();

            let cl = $(this).attr('href'),
                top = $(cl).offset().top;

            $('html,body').animate({
                scrollTop: top
            }, 1000)
        });
    }
    scroll();

    //Для липучого меню
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 400) {
            $(".header-top").addClass("fixed");
        } else {
            $(".header-top").removeClass("fixed");
        }
    });

    let menuBtn = document.querySelector('.menu-btn');
    let menuList = document.querySelector('.menu-list');
    let imageInput = document.querySelector('.editor-image-input');
    let imageBtn = document.querySelector('.editor-image-btn');
    let editorImage = document.querySelector('.editor-image');
    let editorImageStyle = document.querySelector('.editor-image').style;
    let editorRadio = document.querySelectorAll('.filter-input');
    let editorRange = document.querySelectorAll('.filter-input-range');
    let editorColor = document.querySelectorAll('.filter-input-color');
    let editorTextArea = document.querySelector('.editor-textarea').style;
    let editorSelect = document.querySelectorAll('.filter-select');
    let editorSelectItem = document.querySelectorAll('.filter-select-item');
    let editorFigure = document.querySelector('.editor-figure').style;
    let editorTextCodeArea = document.querySelector('#editor-text .editor-textarea-code');
    let editorImageCodeArea = document.querySelector('#editor-image .editor-textarea-code');
    let editorFigureCodeArea = document.querySelector('#editor-figure .editor-textarea-code');
    let editorTextSubmit = document.querySelector('#editor-text .btn-submit');
    let editorTextReset = document.querySelector('#editor-text .btn-reset');
    let editorImageSubmit = document.querySelector('#editor-image .btn-submit');
    let editorImageReset = document.querySelector('#editor-image .btn-reset');
    let editorFigureSubmit = document.querySelector('#editor-figure .btn-submit');
    let editorFigureReset = document.querySelector('#editor-figure .btn-reset');

    const triggerInput = () => {
        imageInput.click();
    };

    const changeHandler = (event) => {
        if (!event.target.files.length) return
        const file = event.target.files[0];
        if (!file.type.match('image')) return
        const reader = new FileReader();
        reader.onload = ev => {
            editorImage.setAttribute('src', ev.target.result);
        }
        reader.readAsDataURL(file);
    };

    menuBtn.addEventListener('click', function () {
        menuList.classList.toggle('menu-list-active')
    });

    imageBtn.addEventListener('click', triggerInput);

    imageInput.addEventListener('change', changeHandler);

    const editorSelectItemChoose = () => {
        editorSelect.forEach(item => {
            if (item.id === 'font-family') {
                let itemSelect = item.querySelectorAll('.filter-select-item');
                itemSelect.forEach(items => {
                    editorTextArea.fontFamily = item.querySelector('.filter-select-current').textContent;
                    let res = items.textContent;
                    items.addEventListener('click', function () {
                        editorTextArea.fontFamily = res;
                    });
                });
            }
            if (item.id === 'text-decoration') {
                let itemSelect = item.querySelectorAll('.filter-select-item');
                itemSelect.forEach(items => {
                    editorTextArea.textDecorationLine = item.querySelector('.filter-select-current').textContent;
                    let res = items.textContent;
                    items.addEventListener('click', function () {
                        editorTextArea.textDecorationLine = res;
                    });
                });
            }
            if (item.id === 'text-decoration-style') {
                let itemSelect = item.querySelectorAll('.filter-select-item');
                itemSelect.forEach(items => {
                    editorTextArea.textDecorationStyle = item.querySelector('.filter-select-current').textContent;
                    let res = items.textContent;
                    items.addEventListener('click', function () {
                        editorTextArea.textDecorationStyle = res;
                    });
                });
            }
            if (item.id === 'border-style') {
                let itemSelect = item.querySelectorAll('.filter-select-item');
                itemSelect.forEach(items => {
                    editorFigure.borderStyle = item.querySelector('.filter-select-current').textContent;
                    let res = items.textContent;
                    items.addEventListener('click', function () {
                        editorFigure.borderStyle = res;
                    });
                });
            }
        });
    }
    const DefaultTextValue = () => {
        editorRadio.forEach(item => {
            let res = item.nextElementSibling.textContent;

            if (item.name === 'text-align' && item.checked) {
                editorTextArea.textAlign = res;
            }
            if (item.name === 'font-style' && item.checked) {
                editorTextArea.fontStyle = res;
            }
        });
        editorRange.forEach(item => {
            let res = item.value;
            let val;
            item.nextElementSibling.textContent = item.value;
            switch (item.name) {
                case 'font-size':
                    editorTextArea.fontSize = res.concat('px');
                    break;
                case 'font-weight':
                    editorTextArea.fontWeight = res;
                    break;
                case 'line-height':
                    editorTextArea.lineHeight = res.concat('px');
                    break;
                case 'letter-spacing':
                    editorTextArea.letterSpacing = res.concat('px');
                    break;
                case 'text-decoration-thickness':
                    editorTextArea.textDecorationThickness = res.concat('px');
                    break;
                case 'word-spacing':
                    editorTextArea.wordSpacing = res.concat('px');
                    break;
                case 'width':
                    editorFigure.width = res.concat('px');
                    break;
                case 'height':
                    editorFigure.height = res.concat('px');
                    break;
                case 'border-width':
                    editorFigure.borderWidth = res.concat('px');
                    break;
                case 'border-radius-lt':
                    editorFigure.borderTopLeftRadius = res.concat('px');
                    break;
                case 'border-radius-rt':
                    editorFigure.borderTopRightRadius = res.concat('px');
                    break;
                case 'border-radius-lb':
                    editorFigure.borderBottomLeftRadius = res.concat('px');
                    break;
                case 'border-radius-rb':
                    editorFigure.borderBottomRightRadius = res.concat('px');
                    break;
                //Фільтри картинки
                case 'hue-rotate':
                    val = `${item.name}(${res.concat('deg')})`;
                    editorImageStyle.filter = val;
                    break;
                case 'opacity':
                    val = `${item.name}(${res.concat('%')})`;
                    editorImageStyle.filter += val;
                    break;
                case 'contrast':
                    val = `${item.name}(${res.concat('%')})`;
                    editorImageStyle.filter += val;
                    break;
                case 'invert':
                    val = `${item.name}(${res.concat('%')})`;
                    editorImageStyle.filter += val;
                    break;
                case 'brightness':
                    val = `${item.name}(${res.concat('%')})`;
                    editorImageStyle.filter += val;
                    break;
                case 'grayscale':
                    val = `${item.name}(${res.concat('%')})`;
                    editorImageStyle.filter += val;
                    break;
                case 'blur':
                    val = `${item.name}(${res.concat('px')})`;
                    editorImageStyle.filter += val;
                    break;
                case 'sepia':
                    val = `${item.name}(${res.concat('%')})`;
                    editorImageStyle.filter += val;
                    break;
                case 'saturate':
                    val = `${item.name}(${res.concat('%')})`;
                    editorImageStyle.filter += val;
                    break;
            }
        });
        editorColor.forEach(item => {
            let res = item.value;
            switch (item.name) {
                case 'color':
                    editorTextArea.color = res;
                    break;
                case 'text-decoration-color':
                    editorTextArea.textDecorationColor = res;
                    break;
                case 'background':
                    editorFigure.background = res;
                    break;
                case 'border-color':
                    editorFigure.borderColor = res;
                    break;
            }
        });
    };

    DefaultTextValue();

    editorRadio.forEach(item => {
        item.addEventListener('change', DefaultTextValue);
    });

    editorRange.forEach(item => {
        item.addEventListener('input', DefaultTextValue);
    });
    editorColor.forEach(item => {
        item.addEventListener('input', DefaultTextValue);
    });
    editorSelectItem.forEach(item => {
        item.addEventListener('click', editorSelectItemChoose);
    });

    const getStyles = ($el, item, code) => {
        $el.addEventListener('click', () => {
            let id = '#' + $el.closest('.editor').id;
            let rightArrow = $el.closest(`${id}`).querySelector('.slick-arrow-right');
            rightArrow.click();
            code.textContent = item.cssText.split(';').join('; \n');
            code.addEventListener('click', function () {
                let text = document.createElement('p');
                document.body.insertAdjacentElement('afterend', text);
                text.classList.add('clipboard-text');
                if (code.textContent) {
                    text.textContent = 'Ваші стилі, успішно скопійовано!';
                    navigator.clipboard.writeText(code.textContent);
                } else text.textContent = 'Спочатку згенеруйте стилі!';
                setTimeout(() => {
                    text.style.display = 'none';
                }, 1000);
            });
        });
    };

    const resetStyles = ($el, code) => {
        $el.addEventListener('click', () => {
            let id = '#' + $el.closest('.editor').id;
            let selectCurrent = $el.closest(id).querySelectorAll('.filter-select-current');
            let currentEditorRange = $el.closest(id).querySelectorAll('.filter-input-range');
            let currentEditorColor = $el.closest(id).querySelectorAll('.filter-input-color');
            code.textContent = '';
            currentEditorRange.forEach(item => {
                if (item.hasAttribute('data-def')) {
                    item.checked = 'on';
                }
                DefaultTextValue();
            });
            currentEditorRange.forEach(item => {
                let value = item.getAttribute('min');
                if (item.value !== value) {
                    item.value = value;
                }
                if (item.hasAttribute('data-img')) {
                    item.value = 100;
                }
                DefaultTextValue();
            });
            selectCurrent.forEach(item => {
                    item.textContent = 'none';
                    let id = item.closest('.filter-select').id;
                    if (id === 'font-family') {
                        item.textContent = 'sans-serif';
                    }
                    editorSelectItemChoose();
                }
            );
            currentEditorColor.forEach(item => {
                let id = '#' + $el.closest('.editor').id;
                item.closest(`${id}`).querySelectorAll('.filter-input-color').forEach(item => {
                    item.value = '#000000';
                });
                DefaultTextValue();
            });

            let text = document.createElement('p');
            text.textContent = 'Ваші стилі та значення успішно скинуті!';
            text.classList.add('clipboard-text');
            document.body.insertAdjacentElement('afterend', text);
            setTimeout(() => {
                text.style.display = 'none';
            }, 1000);
        });
    };

    getStyles(editorTextSubmit, editorTextArea, editorTextCodeArea);
    getStyles(editorImageSubmit, editorImageStyle, editorImageCodeArea);
    getStyles(editorFigureSubmit, editorFigure, editorFigureCodeArea);
    resetStyles(editorTextReset, editorTextCodeArea);
    resetStyles(editorImageReset, editorImageCodeArea);
    resetStyles(editorFigureReset, editorFigureCodeArea);
}



