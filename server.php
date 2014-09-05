<?php
 $address = "name@domain.com"; // АДРЕС ПОЧТЫ МЕНЯТЬ ТУТ
 $hostaddr = "http://".$_SERVER['SERVER_NAME']."/p/avto"; // возможно, это надо изменить на адрес сайта
 
 function getStr($data, $default = ""){
  if(!isset($_POST[$data])) return $default;
  $data = $_POST[$data];
  $data = htmlspecialchars(strip_tags(trim($data)));
  return ($data != "" ? $data : $default);
 }
 function getImg($data, $uploaddir = 'file', $maxSize = 1000, $default = false){
  if(!isset($_FILES[$data])) return $default;
  
  $name = $_FILES[$data]["name"]; //имя файла
  $type = $_FILES[$data]["type"]; //тип файла (image/format - нас интересует)
  $size = $_FILES[$data]["size"]; //размер в кб
  $tmp  = $_FILES[$data]["tmp_name"]; //адрес временного хранения
  $ext = pathinfo($name, PATHINFO_EXTENSION);
  
  $uploaddir  = $uploaddir. DIRECTORY_SEPARATOR;
  $uploadfile = $uploaddir.md5(basename($name)).'.'.$ext; //путь до файла на сервере
  
  if(file_exists($uploadfile)) return $uploadfile; //если там уже лежит такой файл, не продолжаем (?)
  
  $prp = getimagesize($tmp); //проверка на картинку
  if($prp === false) return $default; //если это не картинка - не продолжаем
  
  if($prp[0] > 0 && $prp[1] > 0 && $size <= $maxSize * 1000 && move_uploaded_file($tmp, $uploadfile)){ //если высота и ширина > 0, размер в норме и файл успешно скопирован
   return $uploadfile; 
  }
  return $default; // Possible file upload attack
 }
 
 $name  = getStr('name');
 $phone = getStr('phone');
 $email = getStr('email');
 $comment = getStr('comment');
 $present = getStr('present');
 $color = getStr('color');
 $image = getImg('image');

 $site = "кузовной ремонт и покрас авто";
 $subject = "Заявка с сайта " . $site;
 
 $mes = "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><title>Заявка</title></head><body>Имя: ".$name." <br>Телефон: ". $phone."<br/>";
 
 $additional = "Content-type:text/html;charset = UTF-8\r\nFrom: " . $site;
 if($email) $additional .= "\r\nReply-To: " . $email;
 if($image) $mes .= "\r\n<img src=\"".$hostaddr."/".$image."\" />";
 $additional .= "\r\nX-Mailer: PHP/" . phpversion();
 $send = mail($address, $subject, $mes."</body></html>", $additional);
 
 if($send){
  echo "Менеджер агентства свяжется с вами в самое ближайшее время";
 }else{
  echo "Ошибка, сообщение не отправлено!";
 }
?>
