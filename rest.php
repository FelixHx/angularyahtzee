<?php
header('Content-Type: text/plain');

$error = false;
$errortext = "No Error";

$player = $_GET['player'];
if (!preg_match('/^[0-1]$/', $player)) {
    $error = true;
    $errortext = "Invalid player, should be 0, 1";
}
;

$rollNumber = $_GET['rollNumber'];
if (!preg_match('/^[1-3]$/', $rollNumber)) {
    $error = true;
    $errortext = "Invalid rollNumber, should be 1, 2, 3";
}
;

$lastRoll = $_GET['lastRoll'];
if (!preg_match('/^[1-6][1-6][1-6][1-6][1-6]$/', $lastRoll)) {
    $error = true;
    $errortext = "Invalid lastRoll, should be like 31146";
}
;

$p1 = array(null, null, null, null, null, null, null, null, null, null, null, null, null);
$p2 = array(null, null, null, null, null, null, null, null, null, null, null, null, null);

for ($field = 0; $field < 13; $field++) {
    $p1[$field] = $_GET['f-0-' . $field];
    if ($p1[$field] && !preg_match('/^[0-9]*$/', $p1[$field])) {
        $error = true;
        $errortext = "Invalid f-0-" . $field .", should only contains 0-9";
    }
    $p2[$field] = $_GET['f-1-' . $field];
    if ($p2[$field] && !preg_match('/^[0-9]*$/', $p2[$field])) {
        $error = true;
        $errortext = "Invalid f-1-" . $field .", should only contains 0-9";
    }
}

$query = "-j+p1+-+-+-+-+-+-+-+-+-+-+-+-+-+p2+-+-+-+-+-+-+-+-+-+-+-+-+-+p1+3+22342";
//echo $query . "\n";
$query = "-j+p1+";

for ($field = 0; $field < 13; $field++) {
    if ($p1[$field]) {
        $query .= $p1[$field] . "+";
    } else {
        $query .= "-+";
    }
    ;
}

$query .= "p2+";

for ($field = 0; $field < 13; $field++) {
    if ($p2[$field]) {
        $query .= $p2[$field] . "+";
    } else {
        $query .= "-+";
    }
    ;
}

$query .= "p" . ($player+1) . "+" . $rollNumber . "+" . $lastRoll;


if ($error) {
    echo "error " . json_encode($error) . "\n";
    echo "errortext " . $errortext . "\n";
}


$headers = getallheaders();
$headers_str = [];
//$url = "http://192.162.84.231/json.cgi?".$query;
$url = "http://captchas.net/json.cgi?" . $query;

//echo $url;

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Host: yahtzee.holderied.de'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);


$result = curl_exec($ch);
curl_close($ch);

sleep(rand(10,30)/10);

header('Content-Type: application/json');
//echo $url;
echo $result;
?>