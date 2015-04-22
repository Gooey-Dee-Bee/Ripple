<?php
	Require_once(__DIR__."/databases.php"); //DB function access
	$latitude = $_POST['latitude'];		// retrieve latitude
	$longitude = $_POST['longitude'];	// retrieve longitude


	
	function getCurrentArea($latitude, $longitude)
	{
		$south = int($latitude);
		$north = latPlusOne($latitude);
		$east = int($longitude);
		$west = longPlusOne($latitude);

		$area =
		[
			"northBound" => $north,
			"southBound" => $south,
			"eastBound" => $east,
			"westBound" => $west,
		];

		return $area;
	}

	function getSurroundingArea($latitude, $longitude)
	{
		$area = getCurrentArea($latitude, $longitude);
		$surroundingArea = 
		[
			"northBound" = latPlusOne($area['northBound']),
			"southBound" = latMinusOne($area['southBound']),
			"eastBound" = longPlusOne($area['eastBound']),
			"westBound" = longMinusOne($area['westBound']),
		];

		return json_encode($surroundingArea);
	}



	function latPlusOne($latitude)
	{
		$lat = $latitude + 1;
		if($lat > 90)
		{
			$lat = ($lat % 90) - 90;
		}

		return $lat;
	}

	function latMinusOne($latitude)
	{
		$lat = $latitude - 1;
		if($lat < -90)
		{
			$lat = 90 - ($lat % (-90));
		}

		return $lat;
	}

	function longPlusOne($longitude)
	{
		$longi = $longitude + 1;
		if($longi > 180)
		{
			$longi = ($longi % 180) - 180;
		}

		return $longi;
	}

	function longMinusOne($longitude)
	{
		$longi = $longitude + 1;
		if($longi < -180)
		{
			$longi = 180 - ($longi %  (-180));
		}
		return $longi;
	}
?>