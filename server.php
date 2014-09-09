<?php
 $address = "name@domain.com"; // АДРЕС ПОЧТЫ МЕНЯТЬ ТУТ
 $site = "Временная регистрация в Москве за один день";
 
 function getStr($data, $default = ""){
  if(!isset($_POST[$data])) return $default;
  $data = $_POST[$data];
  $data = htmlspecialchars(strip_tags(trim($data)));
  return ($data != "" ? $data : $default);
 }
 function out($result){
  echo json_encode(Array('responce' => $result));
 }
 function message($address, $subject, $data, $reply = false){
  $message = '<!doctype html><html><head><meta charset="utf-8"><title>'.$subject.'</title></head><body>';
  if(gettype($data) == 'string'){
   $message .= $data;
  }else{
   foreach($data as $key => $value){
    $message .= '<p><b>'.$key.':</b> <span>'.$value.'</span></p>';
   }
  }
  $message .= '</body></html>';
  $headers = "From: Сайт гильдии \"Вольные\"\r\nMIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\nX-Mailer: PHP/" . phpversion();
  if($reply) $headers .= '\r\nReply-To: ' . $reply;
  return mail($address, $subject, $message, $headers);
 }

 $data = Array('ФИО' => getStr('name'), 'Телефон' => getStr('phone'));
 if($_POST['from']) $data['Откуда'] = 'Из ' . getStr('from');
 if($_POST['district']) $data['Желаемая область'] = getStr('district');
 if($_POST['departments']) $data['Район'] = getStr('departments');
 if($_POST['duration']) $data['Продолжительность'] = getStr('duration');
 if($_POST['birthdate']) $data['Дата рождения'] = getStr('birthdate');
 if($_POST['birthplace']) $data['Место рождения'] = getStr('birthplace');
 if($_POST['userdoc']) $data['Документ, удостоверяющий личность'] = getStr('userdoc');
 if($_POST['passport']) $data['Паспортные данные'] = getStr('passport');
 if($_POST['metro']) $data['Ближайшая станция метро'] = getStr('metro');
 if($_POST['request']) $data['Вопросы или пожелания'] = getStr('request');
  
 $send = message($address, "Заявка с сайта " . $site, $data);
 out($send ? "Менеджер агентства свяжется с вами в самое ближайшее время" : "Ошибка, сообщение не отправлено!");
?>
