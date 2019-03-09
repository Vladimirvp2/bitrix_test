<?php

/* 
 * Process ajax call to get the last lead data
 * @author Vladimir Pishida
 * @version 1.0
*/

require_once($_SERVER['DOCUMENT_ROOT']. "/bitrix/modules/main/include/prolog_before.php");
require_once($_SERVER['DOCUMENT_ROOT']. "/ajax/my_module.php");

// Set the maximum number of the last leads to get
const GET_LEADS_LIMIT = 1;
// Get leads data
$leadData = LastLeadGetter::getData( GET_LEADS_LIMIT );
$leadStringData = LastLeadGetter::leadBeautifier( $leadData );


// cast the result do the needed standart
$ar = Array("status" => "ok", "data" => $leadStringData);
$res = json_encode( $ar );

echo $res;

?>