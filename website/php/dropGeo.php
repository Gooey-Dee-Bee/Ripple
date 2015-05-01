<?php
	Require_once(__DIR__."/databases.php"); //DB function access

	
	function getCurrentArea($latitude, $longitude)
	{
		
		#This logic decides which operation decides how to deal with lat and long based on hemisphere
		if ($latitude >= 0)
		{
			$north = latPlusOne((int)$latitude);
			$south = (int)$latitude;
		}
		else
		{
			$north = (int)$latitude;
			$south = longMinusOne((int)$latitude);
		}

		if($longitude >= 0)
		{
			$east = longPlusOne((int)$longitude);
			$west = (int)$longitude;
		}
		else
		{
			$east = (int)$longitude;
			$west = longMinusOne((int)$longitude);	
		}

		$area =
		array(
			"northBound" => $north,
			"southBound" => $south,
			"eastBound" => $east,
			"westBound" => $west,
		);
		
		return $area;
	}

	function getSurroundingArea($latitude, $longitude)
	{
		$area = getCurrentArea($latitude, $longitude);
		$surroundingArea = 
		array(
			"northBound" => latPlusOne($area['northBound']),
			"southBound" => latMinusOne($area['southBound']),
			"eastBound" => longPlusOne($area['eastBound']),
			"westBound" => longMinusOne($area['westBound']),
		);

		#echo "TESTING SURROUNDING AREA:";
		#echo $surroundingArea;
		return ($surroundingArea);
	}

	function inViewableRegion($songLat, $songLong, $boundsArray)
	{
		#echo json_encode($boundsArray);
		if($songLat < $boundsArray['northBound'] && $songLat > $boundsArray['southBound']&& $songLong < $boundsArray['eastBound'] && $songLong > $boundsArray['westBound'])
			return TRUE;
		else
			return FALSE;
	}


	#Adds 1 to the latitude. If incrementing causes the 
	function latPlusOne($latitude)
	{
		$lat = $latitude + 1;
		if($lat > 90)
		{
			$lat = -90;
		}
		
		// {
		// 	$lat = ($lat % 90) - 90;
		// }

		return $lat;
	}

	function latMinusOne($latitude)
	{
		$lat = $latitude - 1;
		if($lat < -90)
		{
			$lat = 90;
		}
		// {
		// 	$lat = 90 - ($lat % (-90));
		// }

		return $lat;
	}

	function longPlusOne($longitude)
	{
		$longi = $longitude + 1;
		if($longi > 180)
		{
			$longi = -180;
		}
		// {
		// 	$longi = ($longi % 180) - 180;
		// }

		return $longi;
	}

	function longMinusOne($longitude)
	{
		$longi = $longitude - 1;
		if($longi < -180)
		{
			$longi = 180;
		}
		// {
		// 	$longi = 180 - ($longi %  (-180));
		// }
		return $longi;
	}
?>