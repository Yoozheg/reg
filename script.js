(function(window, document, undefined){
 "use strict";

 function District(name, header, data){
  this.name   = name;
  this.header = header;
  this.data   = data;
 }
 
 var SZAO = new District('Северо-Западный', 'СЗАО', ['Куркино','Митино','Покровское-Стрешнево','Северное Тушино','Строгино','Хорошево-Мневники','Щукино','Южное Тушино']),
     SAO  = new District('Северный','САО',['Аэропорт','Беговой','Бескудниковский','Войковский','Восточное Дегунино','Головинский','Дмитровский','Западное Дегунино','Коптево','Левобережный','Молжаниновский','Савеловский','Сокол','Тимирязевский','Ховрино','Хорошевский']),
	 SVAO = new District('Северо-Восточный','СВАО',['Алексеевский','Алтуфьевский','Бабушкинский','Бибирево','Бутырский','Лианозово','Лосиноостровский','Марфино','Марьина Роща','Останкинский','Отрадное','Ростокино','Свиблово','Северное Медведково','Северный','Южное Медведково','Ярославский']),
	 ZAO  = new District('Западный', 'ЗАО', ['Внуково','Дорогомилово','Крылатское','Кунцево','Можайский','Ново-Переделкино','Очаково-Матвеевское','Проспект Вернадского','Раменки','Солнцево','Тропарево-Никулино','Филевский Парк','Фили-Давыдково']),
	 CAO  = new District('Центральный', 'ЦАО', ['Арбат','Басманный','Замоскворечье','Китай-Город','Красносельский','Мещанский','Пресненский','Таганский','Тверской','Хамовники','Якиманка']), 
	 VAO  = new District('Восточный', 'ВАО', ['Богородское','Вешняки','Восточное Измайлово','Восточный','Гольяново','Ивановское','Измайлово','Косино-Ухтомский','Метрогородок','Новогиреево','Новокосино','Перово','Преображенское','Северное Измайлово','Соколиная Гора','Сокольники']),
	 UZAO = new District('Юго-Западный', 'ЮЗАО', ['Академический','Гагаринский','Зюзино','Коньково','Котловка','Ломоносовский','Обручевский','Северное Бутово','Теплый Стан','Черемушки','Южное Бутово','Ясенево']),
     UAO  = new District('Южный', 'ЮАО', ['Бирюлево Восточное','Бирюлево Западное','Братеево','Даниловский','Донской','Зябликово','Москворечье-Сабурово','Нагатино-Садовники','Нагатинский Затон','Нагорный','Орехово-Борисово','Северное','Орехово-Борисово','Южное','Царицыно','Чертаново Северное','Чертаново Центральное','Чертаново Южное']),
     UVAO = new District('Юго-Восточный', 'ЮВАО', ['Выхино-Жулебино','Капотня','Кузьминки','Лефортово','Люблино','Марьино','Некрасовка','Нижегородский','Печатники','Рязанский','Текстильщики','Южнопортовый']),
	 ZelAO= new District('Зеленоградский','ЗелАО', ['Крюково','Матушкино-Савелки','Панфиловский','Силино','Старое','Крюково']),
	 NAO  = new District('Новомосковский', 'НАО', ['Внуковское','Воскресенское','Десеновское','Кокошкино','Марушкинское','Московский','Мосрентген','Рязановское','Сосенское','Филимонковское','Щербинка']),
	 TAO  = new District('Троицкий', 'ТАО', ['Вороновское','Киевский','Кленовское','Краснопахорское','Михайлово-Ярцевское','Новофедоровское','Первомайское','Роговское','Троицк','Щаповское']),
   district = [SZAO,SAO,SVAO,ZAO,CAO,VAO,UZAO,UAO,UVAO,ZelAO,NAO,TAO],
   register = {'РФ':['6 месяцев','1 год','2 года','3 года','4 года','5 лет'],'СНГ':['3 месяца','6 месяцев','1 год']},
   userdoc  = {'РФ':['Паспорт','Свидетельство о рождении'],'СНГ':['Паспорт']};

 $.ready(function(){
  $(['#what div ul li']).on({mouseover: function(e){$('#what main').css({backgroundImage:'url(img/'+this.onceClass('selected').data('num')+')'})}});
  $(['.button']).on({click:function(e){ openSplash(this.data('from')) }});
  $(['form']).on({submit: form});
 });

function setOptions(name, data){
 var select = $('#hardform article select[name="'+name+'"]').clear();
 select.rmAttr('disabled');
 for(var i = 0; i < data.length; ++i){
  select.add('option').html(data[i]);
 }
}
function selectDistrict(li, districts, register, userdoc){
 if(li && districts){
  var header = li.onceClass('selected').html(), district;
  for(var i = 0; i < districts.length; ++i)if(districts[i].header == header){district = districts[i]; break};
  $('#hardform article h4 span').html(header).parent().show();
  setOptions('departments', district.data);
 }else{
  $('#hardform article select[name="departments"]').attr('disabled', 'disabled');
 }
 setOptions('duration', register);
 setOptions('userdoc', userdoc);
}
function initHardForm(districts, register, userdoc, param){
 var HH = 700, cH = $.client.height(), mT = ~~((cH-HH)/2);
 $('#hardform').css({marginTop:mT+'px'});
 $('#simpleform').hide();
 $('#hardform h3 span').html(param);
 var ul = $('#hardform aside ul').clear(), hard = $('#hardform aside').hide();
 for(var i = 0; i < districts.length; ++i) ul.add('li').html(districts[i].header);
 selectDistrict($('#hardform aside ul li'), districts, register, userdoc);
 $(['#hardform aside ul li']).on({click: function(e){selectDistrict(this, districts, register, userdoc)}});
 hard.show();
 $('#SNGREG input').val(param == 'СНГ' ? '' : 'РФ');
 param == 'РФ' ? $('#SNGREG').hide() : $('#SNGREG').show();
 $('#hardform').show();
}
function closeSplash(){ $('#splashmain').hide() }
function openSplash(param){
 $.splash.open({onclose: closeSplash});
 if(!param){
  $('#simpleform').show();
  $('#hardform').hide();
 }else{
  initHardForm(district, register[param], userdoc[param], param);
 }
 $('#splashmain').show();
}
function form(e){
 var inputs = this.find(['input,select,textarea']), data = {};
 inputs.each(function(){data[this.name()] = this.val()});
 if(inputs.length() > 2){
  data['district'] = $('#hardform aside ul li.selected').html();
  data['from'] = $('#hardform h3 span').html();
 }
 $.ajax(data, 'server.php', function(r){ alert(r.responce) });
 return false;
}

})(window, document);
