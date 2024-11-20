async function waitForElement(selectors) {
    while (!document.querySelector(selectors)) {
        await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selectors);
}

waitForElement('#last_audio_2').then(drawingArea3 => {
    setTimeout(() => {
        document.getElementById('control_button_3').disabled = false;
        if (drawingArea3.id === 'last_audio_1') {
            console.log('Found #last_audio_1');
            svgTest(drawingArea3);
        } else if (drawingArea3.id === 'last_audio_2') {
            console.log('Found #last_audio_2');
            svgTest(drawingArea3);
        }
         
    }, 100);
});
function handleAttempts2(number, backWardBtn, nextBtn) {
    let attempts = localStorage.getItem(`attempts2_${17}`);
    // Проверяем значение attempts
    if (attempts === null || isNaN(attempts) || attempts < 0) {
        attempts = 1; // Устанавливаем значение по умолчанию
        localStorage.setItem(`attempts2_${17}`, `${attempts}`);
        console.log(`Инициализация: attempts для ${17} установлены в 1`);
    } else {
        attempts = parseInt(attempts, 10); // Убедимся, что attempts - число
    }
    let isIncremented = false;
    function decrementAttempts() {
        if (!isIncremented) {
            attempts--;
            isIncremented = true;
            console.log('Decremented:', attempts);
        }
    }
    decrementAttempts();
    console.log(attempts);
    localStorage.setItem(`attempts2_${15}`, `${attempts}`);
    let updatedAttempts = parseInt(localStorage.getItem(`attempts2_${17}`), 10);
    if (updatedAttempts === 0) {
        window.alert("Вы потратили все попытки для прохождения задания, кнопка 'Повторить' заблокирована!!!");
        const controlButton = document.querySelector('#control_button_3');
        controlButton.disabled = true;
        controlButton.style.display = 'none';
        var backWardBtn = document.querySelector('#control_button_1');
        backWardBtn.classList.remove('gray_dis');
        backWardBtn.disabled = false;
        var nextBtn = document.querySelector('#control_button_4');
        nextBtn.classList.remove('gray_dis');
        nextBtn.disabled = false;
    }
}
function svgTest() {
    var element2 = document.querySelector('.number_of_step');
    var number2 = parseInt(element2.textContent, 10);
    document.querySelector('#start_button_1').onclick = () =>{
        if(number2 == 17){
            handleAttempts2();
        }
    }
    var testObj = data[`index_${number2}`].paragraph_1;
    var anwserArr10 = testObj.find(item => item.correctAnswer).correctAnswer;
    var anwserArr11 = testObj.find(item => item.correctAnswerNoneFull).correctAnswerNoneFull;
    // Полный ответ = Задание выполнено
    var fullAnswers = anwserArr10
    // Не полный ответ. Работает только двигатель, кнопка СТОП не работает. Задание не выполнено.
    var minimalAnswers = anwserArr11
    const powerBtn = document.getElementById('toggleButton');
    let power_is_on = true; // Изначально электричество ВКЛ
    const drawingArea = document.getElementById('drawingArea');
    const sound_btn = document.getElementById('sound_btn')
    let interactionsDisabled = false; // Флаг для отключения взаимодействия
    let sound_is_on = true
    let end = false
    // Инициализация SVG.js
    var draw = SVG().addTo('#drawingArea').size('100%', '100%').attr({
        style: 'position: absolute; top: 0; left: 0; z-index: 10;'
    });
    var connections = {}; // Для отслеживания соединений между movable
    var originalMovables = {}; // Для отслеживания исходных кружков
    var uniqueIdCounter = 0; // Счетчик уникальных ID
    var lineDrawMethodDefaultStrong = function(path, x1, y1, x2, y2) {
        var curveStrength = 90; // Variable controlling the strength of the curve
        // Calculate control points with stronger curvature
        var controlPointX1 = x1 + (x2 - x1) * 0.25;
        var controlPointY1 = y1 - curveStrength;
        var controlPointX2 = x1 + (x2 - x1) * 0.75;
        var controlPointY2 = y2 + curveStrength;
        // Create the path with the stronger curve
        var d = `M ${x1},${y1} C ${controlPointX1},${controlPointY1} ${controlPointX2},${controlPointY2} ${x2},${y2}`;
        path.plot(d);
    };
    var lineDrawMethods = {
        'cont16': function(path, x1, y1, x2, y2) {
            path.plot(`M ${x1},${y1} L ${x2},${y2}`);
        },
        'cont19': function(path, x1, y1, x2, y2) {
            path.plot(`M ${x1},${y1} L ${x2},${y2}`);
        },
        'cont20': lineDrawMethodDefaultStrong,
        'cont21': lineDrawMethodDefaultStrong,
        'cont22': lineDrawMethodDefaultStrong,
        'cont27': lineDrawMethodDefaultStrong,
        'cont28': lineDrawMethodDefaultStrong,
        'cont29': lineDrawMethodDefaultStrong
    };
    function getCenterCoords(element) {
        var rect = element.getBoundingClientRect();
        var parentRect = drawingArea.getBoundingClientRect();
        return {
            x: rect.left - parentRect.left + rect.width / 2 + window.scrollX,
            y: rect.top - parentRect.top + rect.height / 2 + window.scrollY
        };
    }
    var movableContacts = document.querySelectorAll('.movable');
    // Обработчик при попытке взаимодействия при невозможности
    function onInteractionAttempt(top_cont) {
        powerBtn.textContent = "ВЫКЛЮЧИТЕ ПИТАНИЕ";
        const mainFrame = document.querySelector('.main_frame');
        if (mainFrame) {
            mainFrame.classList.add('shake');
            mainFrame.addEventListener('animationend', function() {
                mainFrame.classList.remove('shake');
            }, { once: true });
        }
        if (top_cont){
            enableSound('electr');
            const electrImg = document.querySelector('.electr_img');
            electrImg.classList.add('vibrate');
            setTimeout(() => {
                electrImg.classList.remove('vibrate');
            }, 1000); // Убирает вибрацию через 1 секунду
        }
    }
    // Обработчик переключения питания
    powerBtn.addEventListener('click', function() {
        enableSound("btn_power")
        power_is_on = !power_is_on;
        powerBtn.classList.toggle('on', power_is_on);
        powerBtn.textContent = power_is_on ? 'Электричество ВКЛ' : 'Электричество ВЫКЛ';
        if (interactionsDisabled) {
            // Если взаимодействие отключено, ничего не делаем
            if (!power_is_on) document.querySelector('.motor').classList.remove('animate');
            return;
        }
        for (let movableId in originalMovables) {
            let circle = originalMovables[movableId];
            if (!power_is_on) { // Разрешить перетаскивание при выключенном питании
                document.querySelector('.motor').classList.remove('animate');
                if (!circle.remember('isConnected')) {
                    circle.draggable();
                }
                document.getElementById(movableId).classList.remove('disabled');
            } else { // Запретить перетаскивание при включенном питании
                circle.draggable(false);
                document.getElementById(movableId).classList.add('disabled');
            }
        }
    });
    sound_btn.addEventListener('click', function () {
        sound_is_on = !sound_is_on
        let sound_btn_img = document.getElementById('sound_btn_img')
        if (sound_is_on){
            sound_btn_img.src = 'content/volume_on.svg'
        }else{
            sound_btn_img.src = 'content/volume_off.svg'
        }
    })
    // Инициализация исходных movable
    movableContacts.forEach(function(movable) {
        createMovableCircle(movable.id, true);
        // Добавляем обработчик двойного клика для сброса соединений
        movable.addEventListener('dblclick', function() {
            if (interactionsDisabled) return; // Не реагируем, если взаимодействие отключено
            let movableId = this.id;
            resetConnections(movableId);
        });
    });
    function createMovableCircle(id, isOriginal) {
        var sourceElement = document.getElementById(id);
        var coords = getCenterCoords(sourceElement);
        uniqueIdCounter++; 
        var uniqueId = id + '_instance_' + uniqueIdCounter;
        var circle = draw.circle(20).fill('#ff483b').center(coords.x, coords.y).attr('id', uniqueId);
        // Перемещаем исходный кружок на передний план
        circle.front();
        var originalPosition = { x: coords.x, y: coords.y };
        circle.remember('originalPosition', originalPosition);
        circle.remember('movableId', id);
        circle.remember('isOriginal', isOriginal);
        circle.remember('isConnected', false);
        if (isOriginal) {
            originalMovables[id] = circle;
            // Добавляем обработчик двойного клика для сброса соединений на самом кружке
            circle.on('dblclick', function() {
                if (interactionsDisabled) return; // Не реагируем, если взаимодействие отключено
                let movableId = this.remember('movableId');
                resetConnections(movableId);
            });
        }
        if (!power_is_on && !circle.remember('isConnected')) { // Разрешить перетаскивание при выключенном питании
            circle.draggable();
        }
        // Визуальная индикация
        const movableElement = document.getElementById(id);
        if (!power_is_on) {
            movableElement.classList.remove('disabled');
        } else {
            movableElement.classList.add('disabled');
        }
        // Обработчик начала перетаскивания
        circle.on('dragstart', function(event) {
            if (interactionsDisabled) {
                event.preventDefault();
                return;
            }
            if (power_is_on) { // Запретить перетаскивание при включенном питании
                event.preventDefault();
                console.log(circle.node.id)
                let top_circle = ["cont1", "cont2", "cont3"].includes(circle.node.id.split('_')[0]);
                onInteractionAttempt(top_circle);
                return;
            }
            if (this.remember('isConnected')) {
                event.preventDefault();
                return;
            }
            var path = this.remember('path');
            var movableId = this.remember('movableId');
            var startPoint = this.remember('originalPosition');
            this.remember('startPoint', startPoint);
            if (!path) {
                path = draw.path().fill('none').stroke({ width: 4, color: '#ff483b' });
                this.remember('path', path);
                path.attr({ 'pointer-events': 'none' });
            }
            updatePath(path, startPoint.x, startPoint.y, this.cx(), this.cy(), movableId);
            path.back();
        });
        // Обработчик перемещения
        circle.on('dragmove', function(event) {
            if (interactionsDisabled) {
                event.preventDefault();
                return;
            }
            if (power_is_on) { // Запретить перетаскивание при включенном питании
                return;
            }
            var path = this.remember('path');
            var startPoint = this.remember('startPoint');
            var movableId = this.remember('movableId');
            updatePath(path, startPoint.x, startPoint.y, this.cx(), this.cy(), movableId);
        });
        // Обработчик окончания перетаскивания
        circle.on('dragend', function(event) {
            if (interactionsDisabled) {
                event.preventDefault();
                return;
            }
            if (power_is_on) { // Запретить перетаскивание при включенном питании
                return;
            }
            var path = this.remember('path');
            var startPoint = this.remember('startPoint');
            var endCoords = { x: this.cx(), y: this.cy() };
            var movableId = this.remember('movableId');
            var isOriginal = this.remember('isOriginal');
            var connected = false;
            var movables = document.querySelectorAll('.movable');
            for (var i = 0; i < movables.length; i++) {
                var targetMovable = movables[i];
                // Исключаем тот же самый movable
                if (targetMovable.id === movableId) {
                    continue;
                }
                var targetCoords = getCenterCoords(targetMovable);
                var distance = Math.hypot(endCoords.x - targetCoords.x, endCoords.y - targetCoords.y);
                if (distance < 20) {
                    var targetId = targetMovable.id;
                    connected = true;
                    // Обновляем путь
                    updatePath(path, startPoint.x, startPoint.y, targetCoords.x, targetCoords.y, movableId);
                    // Фиксируем позицию кружка на целевом movable
                    this.center(targetCoords.x, targetCoords.y);
                    // Делаем кружок неподвижным
                    this.draggable(false);
                    this.remember('isConnected', true);
                    // Делаем подключенный кружок не перехватывающим события мыши
                    this.attr('pointer-events', 'none');
                    // Перемещаем подключенный кружок на задний план
                    this.back();
                    // Записываем соединение
                    if (!connections[movableId]) {
                        connections[movableId] = [];
                    }
                    connections[movableId].push({
                        circle: this,
                        path: path,
                        from: movableId,
                        to: targetId,
                        movableId: movableId
                    });
                    // Спавним новый movable на исходной позиции
                    if (isOriginal) {
                        createMovableCircle(movableId, true);
                    }
                    break;
                }
            }
            if (!connected) {
                if (path) {
                    path.remove();
                    this.forget('path');
                }
                if (!isOriginal) {
                    this.remove();
                } else {
                    this.animate(200).center(startPoint.x, startPoint.y);
                }
            }
        });
    }
    // Функция для обновления пути
    function updatePath(path, x1, y1, x2, y2, movableId) {
        // Если для данного movable есть особый метод рисования
        console.log('updatePath')
        console.log(movableId)
        if (lineDrawMethods[movableId]) {
            console.log('Есть')
            lineDrawMethods[movableId](path, x1, y1, x2, y2);
        } else {
            // Стандартный способ
            var controlPointX1 = x1 + (x2 - x1) * 0.25;
            var controlPointY1 = y1 - 50;
            var controlPointX2 = x1 + (x2 - x1) * 0.75;
            var controlPointY2 = y2 + 50;
            var d = `M ${x1},${y1} C ${controlPointX1},${controlPointY1} ${controlPointX2},${controlPointY2} ${x2},${y2}`;
            path.plot(d);
        }
    }
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        // Перерисовываем все пути и кружки
        for (let movableId in originalMovables) {
            let circle = originalMovables[movableId];
            let coords = getCenterCoords(document.getElementById(movableId));
            circle.center(coords.x, coords.y);
            circle.remember('originalPosition', { x: coords.x, y: coords.y });
        }
        // Обновляем позиции соединенных кружков и путей
        for (let fromId in connections) {
            connections[fromId].forEach(function(conn) {
                let fromCoords = getCenterCoords(document.getElementById(conn.from));
                let toCoords = getCenterCoords(document.getElementById(conn.to));
                conn.circle.center(toCoords.x, toCoords.y);
                updatePath(conn.path, fromCoords.x, fromCoords.y, toCoords.x, toCoords.y, conn.from);
            });
        }
    });
    // Обработчик кнопки "Старт"
    document.getElementById('start_button_1').addEventListener('click', function() {
        enableSound("btn_sound")
        if (!power_is_on) {
            alert('Включите питание перед запуском.');
            return;
        }
        var allConnections = [];
        for (var fromId in connections) {
            connections[fromId].forEach(function(item) {
                allConnections.push({ from: item.from, to: item.to });
            });
        }
        let minimalCorrect = checkConnections(allConnections, minimalAnswers);
        let fullCorrect = checkConnections(allConnections, fullAnswers);
        if (minimalCorrect) {
            // Запускаем двигатель
            document.querySelector('.motor').classList.add('animate');
            if (fullCorrect) {
                // Задание выполнено полностью
                if (!end){
                    alert('Задание выполнено верно! Проверьте кнопку «Стоп»');
                    end = true
                    document.getElementById('control_button_4').disabled = false;
                    // Здесь
                    document.querySelector('#control_button_3').textContent = `Выполнено`;
                    document.querySelector('#control_button_3').style.backgroundColor = "#66c594";
                }
            } else {
                // Задание не выполнено полностью
                alert('Схема собрана частично. Двигатель работает, но задание не выполнено полностью.');
                handleAttempts(number2, currentPageIndex, backWardBtn, nextBtn);
            }
            enableSound("motor")
        } else{
            alert("Схема собрана не верно. Нажмите кнопку «Повторить»");
            handleAttempts(number2, currentPageIndex, backWardBtn, nextBtn);
        }
         // Подсвечиваем соединения
        highlight_connections(allConnections, fullAnswers);
        disableAllMovables();
    });
    // Обработчик кнопки "Стоп"
    document.getElementById('stop_button_1').addEventListener('click', function() {
        enableSound("btn_sound")
        if (!power_is_on) {
            alert('Включите питание перед остановкой.');
            return;
        }
        if (!document.querySelector('.motor').classList.contains('animate')){
            alert('Двигатель в данный момент не работает');
            return;
        }
        var allConnections = [];
        for (var fromId in connections) {
            connections[fromId].forEach(function(item) {
                allConnections.push({ from: item.from, to: item.to });
            });
        }
        let fullCorrect = checkConnections(allConnections, fullAnswers);
        if (fullCorrect) {
            document.querySelector('.motor').classList.remove('animate');
            disableAllSounds()
        } else {
            alert('Двигатель не может быть остановлен, так как схема собрана неверно или не полностью. Нажмите кнопку «Повторить»');
        }
    });
    // Функция для проверки, все ли соединения верны
    function checkConnections(userConnections, requiredConnections) {
        console.log(userConnections)
        for (let reqConn of requiredConnections) {
            if (reqConn.from === reqConn.to) {
                // Проверяем, что у контакта нет соединений
                let hasConnection = userConnections.some(userConn => 
                    userConn.from === reqConn.from || userConn.to === reqConn.to
                );
                if (hasConnection) {
                    return false;
                }
            } else {
                let found = userConnections.some(userConn => {
                    return (
                        (userConn.from === reqConn.from && userConn.to === reqConn.to) ||
                        (userConn.from === reqConn.to && userConn.to === reqConn.from)
                    );
                });
                if (!found) {
                    return false;
                }
            }
        }
        return true;
    }
    // Функция для подсветки соединений
    function highlight_connections(userConnections, requiredConnections) {
        // Сначала сбрасываем цвета всех исходных кружков
        for (let movableId in originalMovables) {
            let circle = originalMovables[movableId];
            circle.fill('#ff483b');
        }
        // Подсвечиваем правильные соединения зелёным, неправильные — красным
        userConnections.forEach(function(userConn) {
            let isCorrect = requiredConnections.some(reqConn => {
                return (
                    (userConn.from === reqConn.from && userConn.to === reqConn.to) ||
                    (userConn.from === reqConn.to && userConn.to === reqConn.from)
                );
            });
            // Подсвечиваем оба movables в соединении
            let fromCircle = originalMovables[userConn.from];
            let toCircle = originalMovables[userConn.to];
            if (fromCircle) {
                fromCircle.fill(isCorrect ? '#539f78' : 'red');
                fromCircle.front();
            }
            if (toCircle) {
                toCircle.fill(isCorrect ? '#539f78' : 'red');
                toCircle.front();
            }
        });
        // Обрабатываем требования о неналичие соединений
        requiredConnections.forEach(function(reqConn) {
            if (reqConn.from === reqConn.to) {
                // Проверяем, есть ли соединения для этого контакта
                let hasConnection = userConnections.some(userConn => 
                    userConn.from === reqConn.from || userConn.to === reqConn.to
                );
                if (!hasConnection) {
                    // Подсвечиваем контакт зелёным
                    let circle = originalMovables[reqConn.from];
                    if (circle) {
                        circle.fill('#539f78');
                        circle.front();
                    }
                } else {
                    // Если соединение есть, оно уже подсвечено красным в предыдущем цикле
                }
            }
        });
    }
    // Функция для получения кружка по соединению
    function getCircleByConnection(fromId, toId) {
        if (connections[fromId]) {
            for (let conn of connections[fromId]) {
                if ((conn.from === fromId && conn.to === toId) || (conn.from === toId && conn.to === fromId)) {
                    return conn.circle;
                }
            }
        }
        if (connections[toId]) {
            for (let conn of connections[toId]) {
                if ((conn.from === fromId && conn.to === toId) || (conn.from === toId && conn.to === fromId)) {
                    return conn.circle;
                }
            }
        }
        return null;
    }
    // Функция для сброса соединений определенного movable
    function resetConnections(movableId) {
        // Проверяем, отключено ли взаимодействие
        if (interactionsDisabled) {
            return;
        }
        // Удаляем все соединения, где movableId является 'from'
        if (connections[movableId]) {
            connections[movableId].forEach(function(conn) {
                conn.circle.remove();
                conn.path.remove();
                conn.circle.remember('isConnected', false);
            });
            delete connections[movableId];
        }
        // Удаляем все соединения, где movableId является 'to'
        for (let fromId in connections) {
            connections[fromId] = connections[fromId].filter(function(conn) {
                if (conn.to === movableId) {
                    conn.circle.remove();
                    conn.path.remove();
                    conn.circle.remember('isConnected', false);
                    return false;
                }
                return true;
            });
            if (connections[fromId].length === 0) {
                delete connections[fromId];
            }
        }
        // Сбрасываем подсветку кружка
        let circle = originalMovables[movableId];
        if (circle) {
            circle.fill('#ff483b');
        }
    }
    // Функция для отключения взаимодействия с movable
    function disableAllMovables() {
        interactionsDisabled = true;
        for (let movableId in originalMovables) {
            let circle = originalMovables[movableId];
            circle.draggable(false);
        }
    }
    function disableAllSounds() {
        var audio = document.getElementById('motor');
        audio.pause()
    }
    function enableSound(sound){
        if (!sound_is_on) return
        if (sound == "motor"){
            var audio = document.getElementById('motor');
            audio.play();
        }
        else if(sound == "btn_power"){
            var audio = document.getElementById('btn_power');
            audio.play();
        }
        else if(sound == "btn_sound"){
            var audio = document.getElementById('btn_sound');
            audio.play();
        }
        else if(sound == "electr"){
            var audio = document.getElementById('electr');
            audio.play();
        }
        return
    }
}