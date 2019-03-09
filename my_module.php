<?php

/* 
 * Get data about the last lead 
 * @author Vladimir Pishida
 * @version 1.0
*/
class LastLeadGetter 
{
	/* Get data about the last lead in the following form: "lead id, lead full name, assigned by"
	 * @param int $number max number of leads to get
	 * @return array("id" => string, "name" => string, "assigned" => string)
	*/
	public static function getData( $number = 1 ){
		$counter = 0;
		// Result accumulator
		$res = Array();
		if (\Bitrix\Main\Loader::includeModule('crm')) {
			$obRes = CCrmLead::GetList($arOrder = Array('DATE_CREATE' => 'DESC'), $arFilter = Array(), $arSelect = Array(), $nPageTop = false);
			while ($arRes = $obRes->Fetch()) {

				$res[] = Array(
							"id" => $arRes["ID"],
							"name" => $arRes["FULL_NAME"],
							"assigned" => $arRes["ASSIGNED_BY_NAME"] . ' ' . $arRes["ASSIGNED_BY_LAST_NAME"]
							);
				$counter += 1;
				// Check if the number of leads doesn't exeed the limit
				if ( $counter >= $number )
					break;
			}
		}

		return $res;
	}

	/* Format the array with leads data
	 * @param Array( Array("id", "name", "assigned") ) $data 
	 * @return string ID: lead id, LEAD_NAME: lead full name, ASSIGNED: assigned by | another lead if $data param contains many leads data
	*/
	public static function leadBeautifier( $data ){
		$res = "";
		foreach( $data as $e  ){
			// Add new line for a new lead 
			if ($res != "" ){
				$res .= " | ";
			}
			$res .= sprintf("ID: %s, LEAD_NAME: %s, ASSIGNED: %s", $e["id"], $e["name"], $e["assigned"]);
		}

		return $res;
	}
}


?>