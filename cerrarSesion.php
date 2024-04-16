<?php
session_name("CGR");
session_start();
session_unset();
session_destroy(); 
echo '{success: true}';
exit();
?>
