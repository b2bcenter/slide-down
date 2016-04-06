(function ( $, window, document, undefined ) {
    var pluginName = 'slideDown',

    // Проверка поддержки События transitionEnd
        transitionEndEvent = (function() {
            var t,
                el = document.createElement("fakeelement");

            var transitions = {
                "transition"      : "transitionend",
                "OTransition"     : "oTransitionEnd",
                "MozTransition"   : "transitionend",
                "WebkitTransition": "webkitTransitionEnd"
            };

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        })(),

        utils = {
            // Выполняем действия, после завершения анимации
            onTransitionEnd: function($el, callback) {
                var self = this;

                $el.on(transitionEndEvent, function(event) {
                    if (event.target == $el[0]) {
                        $el.off(transitionEndEvent)
                        self.execute(callback);
                    }
                });
                // Если вдруг анимация не поддерживается
                if (!transitionEndEvent) {
                    self.execute(callback);
                }
            },

            // Добавляем временный класс перед анимацией, и удаляем после завершения анимации
            toggleTemporaryClass: function($el, className) {
                var self = this,
                    $content = $el.children();

                if (transitionEndEvent) {
                    $el.addClass(className);
                }
                self.onTransitionEnd($content, function() {
                    $el.removeClass(className);
                });
            },

            // Устанавлиаем отрицательный отступ контенту
            setOffset: function($els) {
                $.each($els, function() {
                    var $content = $(this).children(),
                        offset = $content.outerHeight();

                    $content.css('marginTop', -offset);
                })
            },

            // Вычисляем нужный элемент по id (можно передать сам элелемент)
            getElement: function(id, target_data) {
                if (typeof id === 'string') {
                    return $('[data-' + target_data +'=' + id+']');
                }
                if (typeof id === 'object' && id.data(target_data.toLowerCase()) != undefined) {
                    return $(id);
                }
            },

            // Функция коллбэка
            execute: function(callback){
                if (callback && typeof(callback) === "function") {
                    callback();
                }
            }
        };

    $[pluginName] = {
        // Опции по умолчанию
        defaults: {
            target_data: 'slidedown-target',
            trigger_data: 'slidedown-trigger',
            animation_class: 'slide_down--animating',
            active_class: 'slide_down--active',
            trigger_active_class: 'active'
        },

        // Выносим опции в options
        setOptions: function(options) {
            this.options = $.extend(true, {}, this.defaults, options);
        },

        // Инициализация
        init: function() {
            var self = this;
            self.setOptions({});

            utils.setOffset($('[data-' + self.options.target_data +']'));
            self.bindEvents();
        },

        // Открываем блок, принимает как id так и елемент
        open: function(id, callback) {
            var self = this,
                options = self.options,
                active_class = options.active_class,
                animation_class = options.animation_class,
                trigger_active_class = options.trigger_active_class,
                $el = utils.getElement(id, options.target_data),
                $content = $el.children(),
                $els_sync = $('[data-' + options.target_data +']').filter('[data-sync]').not($el),
                $triggers = $('[data-' + options.trigger_data +'="' + $el.data(options.target_data.toLowerCase()) + '"]'),
                is_sync = $el.is('[data-sync]');

            // Срабатывает только закрытый блок (с нулевой высотой)
            if($el.outerHeight() == 0) {

                // Добавляем триггерам активный класс
                $triggers.addClass(trigger_active_class);

                // Добавляем/убираем временный класс
                utils.toggleTemporaryClass($el, animation_class);

                // Вешаем коллбэк на конец анимации
                utils.onTransitionEnd($content, function(){
                    utils.execute(callback);
                });

                if(is_sync) {
                    // Сначала закроем все открытые, а потом откроем текущий блок
                    self.closeAll($els_sync, function(){
                        $el.addClass(active_class);
                    });
                } else {
                    $el.addClass(active_class);
                }
            }
        },

        // Закрываем блок, принимает как id так и елемент
        close: function(id, callback){
            var self = this,
                options = self.options,
                active_class = options.active_class,
                animation_class = options.animation_class,
                trigger_active_class = options.trigger_active_class,
                $el = utils.getElement(id, options.target_data),
                $content = $el.children(),
                $triggers = $('[data-' + options.trigger_data +'="' + $el.data(options.target_data.toLowerCase()) + '"]');

            // Убираем триггерам активный класс
            $triggers.removeClass(trigger_active_class);

            // Добавляем/убираем временный класс
            utils.toggleTemporaryClass($el, animation_class);

            // Вешаем коллбэк на конец анимации
            utils.onTransitionEnd($content, function(){
                utils.execute(callback);
            });

            // Убираем активный класс
            $el.removeClass(active_class);
        },

        // Закрываем все открытые блоки, принимает элементы
        closeAll: function($els, callback){
            var self = this,
                options = self.options,
                active_class = options.active_class,
                animation_class = options.animation_class,
                trigger_active_class = options.trigger_active_class,
                $els = $els || $('[data-' + options.target_data +']'), // Присваиваем переданные элементы, если они есть
                $active_els = $els.filter('.' + active_class);

            // Закрываем все открытые блоки
            $.each($active_els, function(i, el) {
                var $el = $(el),
                    $content = $el.children(),
                    $triggers = $('[data-' + options.trigger_data +'="' + $el.data(options.target_data.toLowerCase()) + '"]');

                // Добавляем/убираем временный класс
                utils.toggleTemporaryClass($el, animation_class);

                // Вешаем коллбэк на конец анимации последнего блока
                if (i === $active_els.length - 1){
                    utils.onTransitionEnd($content, function(){
                        utils.execute(callback);

                        // Убираем триггерам активный класс
                        $triggers.removeClass(trigger_active_class);
                    });
                } else {
                    // Убираем триггерам активный класс
                    $triggers.removeClass(trigger_active_class);
                }

                // Убираем активный класс
                $el.removeClass(active_class);
            });

            // Если открытых блоков нет, то коллбэк все равно выполняем
            if ($active_els.length == 0) {
                utils.execute(callback);
            }
        },

        // Основные события
        bindEvents: function(){
            var self = this,
                options = self.options,
                active_class = options.active_class,
                $body = $('body');

            // Событие на триггер, даже если триггер был добавлен динамически
            $body.on('click', '[data-' + options.trigger_data +']', function(){
                var id = $(this).data(options.trigger_data.toLowerCase()),
                    $el = utils.getElement(id, options.target_data);

                // На случай, если был ресайз или контент был изменен динамически
                utils.setOffset($el);

                // Открываем или закрываем блоки
                if($el.hasClass(active_class)) {
                    self.close(id);
                } else {
                    self.open(id);
                }
            });

            // Вешаем событие нажатие ESC
            $body.on('keyup', function(e) {
                if (e.keyCode == 27) {
                    self.closeAll();
                }
            });
        }
    };

    // Инициализация скрипта
    $(function () {
        $[pluginName].init();
    });

}(jQuery, window, document));