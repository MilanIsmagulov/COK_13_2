// Тема ЦОК отображается во многих элементах
const themeOfDEC = 'Эксплуатация электрического и электромеханического оборудования'
// Номер ФГОС и Тескт ФГОС
const numFgos = '13.02.13'
const numFgosTxt = 'Эксплуатация и обслуживание электрического и электромеханического оборудования (по отраслям)'
// Номер МДК и Текст МДК
const numMDK = '01.01'
const numMDKTxt = 'Технология ремонта, монтажа и наладки электрического и электромеханического оборудования'
const razdel = 'Технология ремонта, монтажа и наладки электрического и электромеханического оборудования'
// Массив с рекомендациями
const textOfMethodMaterials = [
    `<p class='pink_subtitle'>Рекомендации для обучающегося</p>
    <p class='none_list'>Просмотрите видеолекцию по теме «Эксплуатация электрического и электромеханического оборудования»</p>
    <p class='none_list'>Если в процессе изучения материала возникнут вопросы, запишите их для дальнейшего обсуждения с преподавателем и/или с группой обучающихся. </p>
    <p class='none_list'>Обратите внимание на основные вопросы лекции:</p>
    устройство и принципы действия электрических машин и электрооборудования; 
    методика технического обслуживания и ремонта электрооборудования;
    способы обнаружения неисправностей.
    <p class='none_list'>При необходимости прослушайте/просмотрите материал еще раз.</p>
    <p class='none_list'>Возвращайтесь к наиболее сложным аспектам темы. </p>
    <p class='none_list'>Соблюдайте здоровьесберегающий режим: чередуйте работу с электронными носителями с отдыхом и гимнастикой для глаз. </p>
    <p class='pink_subtitle'>Рекомендации для преподавателя</p>
    <p class='none_list'>Применение данного ЭОМ  в ходе занятия поможет преподавателю мотивировать обучающихся к усвоению нового материала через визуализацию теоретического материала с помощью различных видов графики и видео и его изложение доступным языком, а так же через возможность организации интерактивной деятельности.</p>
    <p class='none_list'>Преподаватель может организовать изучение обучающимися образовательных материалов ЭОМ через применение различных педагогических технологий, например: </p>
    организовать изучение теоретических материалов  ЭОМ  до начала учебного занятия, а во время учебного занятия провести беседу, отвечая на вопросы обучающихся, уточняя и расширяя первичные знания;
    организовать изучение нового материала с применением материалов ЭОМ непосредственно на занятии, через демонстрацию материалов ЭОМ, в т.ч. иллюстраций (схем, графиков, фото, видео и пр.);
    организовать работу обучающихся в группах непосредственно на занятии с использованием учебных материалов ЭОМ;
    предложить повторное изучение материалов ЭОМ после проведения учебных занятий с целью закрепления материала и подготовки к промежуточной аттестации и пр.
    <p class='none_list'>В ходе занятия преподавателю предлагается, опираясь на материалы данного ЭОМ  раскрыть следующие вопросы:</p>
    ознакомление обучающихся с принципами и практикой организации обслуживания электрических машин и аппаратов;
    формирование основы для эффективной эксплуатации электрического оборудования через ознакомление обучающихся с ключевыми понятиями: надежность, долговечность, ремонтопригодность и безопасность.;
    ознакомление с причинами и видами износа электрических машин (механический, электрический и моральный износ) и основными методами обнаружения повреждений;
    ознакомление с порядком действий по организации технического обслуживания электрических аппаратов.`,
    `<p class='pink_subtitle'>Рекомендации для обучающегося</p>
    <p class='none_list'>Запустите виртуальную лабораторию по теме «Эксплуатация электрического и электромеханического оборудования»</p>
    <p class='none_list'>Ознакомьтесь с предложенными материалами и выполните тренировочные тестовые задания.</p>
    <p class='none_list'>Обратите внимание, что на выполнение всех тестовых заданий предусмотрено 2 попытки.</p>
    <p class='none_list'>Выполните виртуальные практические работы по темам «Тепловая защита асинхронного электродвигателя» и «Изучение схемы конденсаторного пуска трёхфазного асинхронного электродвигателя».</p>
    <p class='none_list'>Если в процессе изучения материала возникнут вопросы, запишите их для дальнейшего обсуждения с преподавателем и/или с группой обучающихся.</p>
    <p class='none_list'>При неверном ответе на тестовое задание, вернитесь к предыдущему материалу и изучите его повторно.</p>
    <p class='none_list'>Тренировочные тестовые задания предусматривают отображение правильных вариантов ответов после их выполнения.</p>
    <p class='none_list'>Запустить виртуальную лабораторию можно неограниченное количество раз.</p>
    <p class='pink_subtitle'>Рекомендации для преподавателя</p>
    <p class='none_list'>В данном ЭОМ размещены виртуальные практические работы по темам «Тепловая защита асинхронного электродвигателя» и «Изучение схемы конденсаторного пуска трёхфазного асинхронного электродвигателя».</p>
    <p class='none_list'>Преподаватель может организовать изучение обучающимися образовательных материалов ЭОМ через применение различных педагогических технологий, например:</p>
    организовать изучение практических материалов  ЭОМ  до начала учебного занятия, а во время учебного занятия организовать проведение практической работы на основе материалов ЭОМ;
    организовать изучение материалов ЭОМ непосредственно на занятии, выявить наиболее часто встречающие ошибки при выполнении проверочных тестовых заданий, организовать работу над ошибками;
    предложить повторное изучение материалов ЭОМ после проведения учебных занятий с целью закрепления материала и подготовки к промежуточной аттестации и пр.
    <p class='none_list'>Применение данного ЭОМ на занятии поможет активизировать познавательную деятельность обучающихся, способствует  развитию  логического  мышления,  памяти, внимательности, наблюдательности.</p>`,
    `<p class='pink_subtitle'>Рекомендации для обучающегося</p>
    <p class='none_list'>Запустите интерактивный тренажер по выполнению заданий по теме «Эксплуатация электрического и электромеханического оборудования» </p>
    <p class='none_list'>Ознакомьтесь с условиями выполнения тестовых заданий. Обратите внимание на отсутствие подсказок и возможности повторного выполнения заданий.</p>
    <p class='none_list'>Выполните все тестовые задания. Ознакомьтесь с результатами тестирования.</p>
    <p class='none_list'>При наличии ошибок по результатам тестирования вернитесь к изучению теоретического материала.</p>
    <p class='none_list'>Запустить интерактивный тренажер по выполнению заданий возможно неограниченное количество раз.</p>
    <p class='pink_subtitle'>Рекомендации для преподавателя</p>
    <p class='none_list'>Применяя данный ЭОМ преподаватель может мотивировать обучающихся для получения максимального количества баллов при выполнении тестовых заданий, предложенных с целью диагностики приобретенных знаний, умений и навыков, учитывая результаты тестирования при выставлении оценки по теме.</p>
    <p class='none_list'>Преподаватель может анализировать результаты тестирования обучающихся с целью выявления наиболее сложных для понимания вопросов темы, с целью последующей организации работы по устранению данных пробелов в знаниях обучающихся.</p>`
];
// Ключевые слова
const keyWords = `Надежность \n  способность электрической машины выполнять заданные функции в течение определенного времени при заданных условиях эксплуатации.
Долговечность \n  способность электрической машины сохранять работоспособность до наступления предельного состояния.
Ремонтопригодность \n  возможность восстановления работоспособности электрической машины путем проведения ремонта.
Безопасность \n  отсутствие опасности для персонала при эксплуатации электрической машины.
Техническое обслуживание (ТО) \n комплекс мероприятий, направленных на поддержание работоспособности оборудования, предупреждение отказов и продление срока службы.
Ежедневное ТО \n  осмотр, проверка креплений и очистка оборудования от пыли и грязи, проводимые ежедневно.
Периодическое ТО \n  плановые работы, выполняемые через определенные промежутки времени, например, раз в месяц или год.
Сезонное ТО \n  работы, выполняемые при смене сезонов (например, подготовка оборудования к зиме).
Ремонт \n  процесс восстановления работоспособности электрической машины или аппарата после отказа.`
/* 1) ФГОС СПО
2) ПООП Профессионалитета
3) Профессиональный модуль
4) МДК
5) Раздел
6) Тема*/
const infoContent = 
`${numFgos} ${numFgosTxt}
${numFgos} ${numFgosTxt}
-
${numMDK} ${numMDKTxt}
${razdel}
${themeOfDEC}`
const blockButtonEOM2 = 1; // "Это для разработки и отладки удобно, блокирует кнопки назад и далее в ЭОМ_2 1 true 0 false"
const typeOfEOM3 = 1; // Если 1 то это тест если что то иное то мини-игра
const typeOfEOM1 = 1; // Если 1 то это video если что то иное то dynamic_info