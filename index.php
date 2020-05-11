<!DOCTYPE html>
<html>
<head>
<title>Forward new tab data</title>
</head>
<body>

<?php

if(!isset($_GET['gid']) || !isset($_GET['sid'])){
  echo "No sheet id found";
  die;
}
else{
  $gid = trim(strip_tags($_GET['gid']));
  $sid = trim(strip_tags($_GET['sid']));
  if (!preg_match('/^\d+$/', $gid)){
    echo "no valid gid";
    die;
  }
  if (strlen($sid) != 86){
    echo "no valid sid";
    die;
  }
  if(!ini_set('default_socket_timeout', 15)) echo "<!-- unable to change socket timeout -->";

  $url_params = array("single" => 'true', 'output' => 'csv', 'gid' => $gid );

  $sheetURL = "https://docs.google.com/spreadsheets/d/e/".$sid."/pub?".http_build_query($url_params);


  if (($handle = fopen($sheetURL, "r")) !== FALSE) {
      while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
          $spreadsheet_data[] = $data;
      }
      fclose($handle);
  }
  else{
      die("Problem reading csv");
  }

  $title = trim(strip_tags($spreadsheet_data[0][0]));
  $text  = trim(strip_tags($spreadsheet_data[1][0]));
  if(!preg_match('/^.+\.tab$/', $title)){
    echo "incorrect filename";
    die;
  }
  if(!preg_match('/^Data:/', $title)){
    $title = "Data:".$title;
  }
}

?>

<form id="myForm" action="https://commons.wikimedia.org/w/index.php" method="post">
	<input type='hidden' name='action' value="edit">
	<input type='hidden' name='title' value="<?php echo $title; ?>">
  <input type="hidden" name="wpTextbox1" value='<?php echo $text; ?>'>
</form>
<script type="text/javascript">
    document.getElementById('myForm').submit();
</script>

</body>
</html>
