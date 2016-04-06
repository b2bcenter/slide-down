# Slide Down #
Очередной jQuery плагин для показа блоков, который умеет делать это по другому. Необходим для выезжающих блоков, которые именно "выезжают" и сдвигают контент. 


## Установка ##
Воспользуйтесь [Bower](http://bower.io):


```
$ bower install slide-down
```

Или [npm](http://npm.com)

```
$ npm install slide-down
```

Если вышеперечисленные способы не подошли, скачивайте напрямую [GitHub](https://github.com/b2bcenter/slide-down)

## Подключение ##

```html
<!--  Css -->
<link href="/jquery.slidedown.css" rel="stylesheet" type="text/css">
<!-- jQuery -->
<script src="/jquery.min.js"></script>
<!-- SlideDown -->
<script src=«jquery.slidedown.js"></script>
```



## Разметка ##

```html

<!-- Триггер может располагаться где угодно. -->
<!-- В атрибуте [data-slidedown-trigger] указываем имя блока, который мы открываем/закрываем, в данном случае это txt  -->

<span data-slidedown-trigger="txt">Текст</span>

<!-- Выезжающий блок, так же может распологаться где угодно, вне зависимости от триггера -->
<!-- В атрибуте [data-slidedown-target] указываем имя блока, к нему будет обращаться триггер  -->

<div class="slide_down" data-slidedown-target="txt">
	<div class="slide_down-content">
		<!-- Контент -->
	</div>
</div>
```



## Опции ##

### Открытый блок ###
Если необходимо, что бы блок был  по-умолчанию открыт, то блоку с атрибутом data-slidedown-target необходимо добавить класс .slide_down--active

### Анимация ###
Базовую анимацию можно изменить, для этого надо блоку с data-slidedown-target добавить data-animation, который будет указывать тип и скорость анимации:

* ease — Обычная анимация, по умолчанию
* ease-fast — Обычная анимация, быстрая скорость
* ease-slow — Обычная анимация, медленная скорость
* bounce — Анимация "прыгающий мяч", нормальная скорость
* bounce-fast — Анимация "прыгающий мяч", быстрая скорость
* bounce-slow — Анимация "прыгающий мяч", медленная скорость


```html
<!-- Выезжающий блок -->
<div class="slide_down" data-slidedown-target="txt"  data-animation="ease-slow">
	<div class="slide_down-content">
		<!-- Контент -->
	</div>
</div>
```


### Синхронность ###
Если необходимо, что бы блоки зависили друг от друга (всегда может быть открыт только один блок), то так же необходимо добавить всем зависимым блокам   с атрибутом data-slidedown-target  дополнительный аттрибут data-sync.


```html
<!-- Один выезжающий блок -->
<div class="slide_down" data-slidedown-target="txt" data-sync>
	<div class="slide_down-content">
		<!-- Контент -->
	</div>
</div>

<!-- Второй выезжающий блок -->
<div class="slide_down" data-slidedown-target="txt" data-sync>
	<div class="slide_down-content">
		<!-- Контент -->
	</div>
</div>
```


## Методы ##


```javascript
$.slideDown.open('id или $('обьект')'); // Откроет указанный блок
$.slideDown.close('id или $('обьект')'); // Закроет указанный блок
$.slideDown.closeAll('пустой или $('обьекты')'); // Закроет все или все указанные блоки
```

## Поддержка ##
Используется CSS3 анимация, если браузер неподдерживает анимацию, то блоки будут показаны как hide/show

* IE 9+
* Chrome 8+
* Firefox 10+
* Safari 3+
* Opera 10.6+

## Лицензия ##

[MIT](https://github.com/b2bcenter/slide-down/blob/master/LICENSE)
