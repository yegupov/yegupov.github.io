<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// we receive the sent data
$data = file_get_contents('php://input');
$data = json_decode($data);

$name = $data->name;
$email = $data->email;
$mess = $data->mess;

$msg_box = ""; // в этой переменной будем хранить сообщения формы
$errors = array(); // контейнер для ошибок
// проверяем корректность полей
if ($name == "") $errors[] = "Поле 'Ваше имя' не заполнено!";
if ($email == "") $errors[] = "Поле 'E-mail' не заполнено!";
if ($mess == "") $errors[] = "Поле 'Текст сообщения' не заполнено!";

// если форма без ошибок
if(empty($errors)) {
    // собираем данные из формы
    $mess = trim(htmlspecialchars(stripslashes($mess)));

    $message  = "Имя пользователя: " . $name . "<br/>";
    $message .= "E-mail пользователя: " . $email . "<br/>";
    $message .= "Текст письма: " . $mess;
    /*
    Можно строку 19 заменить на:
    $message .= "Текст письма: " . $mess . "<br/>";
    $message .= "Письмо сформировано автоматически.<br/>Пожалуйста, не отвечайте на данное письмо.";
    */
    send_mail($message); // отправим письмо
    // выведем сообщение об успехе
    $msg_box = "<span style='color: green;'>Сообщение успешно отправлено!</span>";
} else {
    // если были ошибки, то выводим их
    $msg_box = "";
    foreach($errors as $one_error){
        $msg_box .= "<span style='color: red;'>$one_error</span>";
    }
}

// делаем ответ на клиентскую часть в формате JSON
echo json_encode(array(
    'message' => $msg_box
), JSON_UNESCAPED_UNICODE);


function send_mail($message){
    // почта, на которую придет письмо
    $mail_to = "ludvig31@yandex.ru";
    // тема письма
    $subject = "Письмо с DARIA-BLOOM.ru";

    // заголовок письма
    $headers= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: daria-bloom.ru <DariaBloom@yandex.ru>\r\n";

    // отправляем письмо
    mail($mail_to, $subject, $message, $headers);
}
