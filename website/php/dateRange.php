<?php
	require_once(__DIR__."/databases.php");

	//$date1 = $_GET['date1'];
	//$date2 = $_GET['date2'];
	$date1 = '2015-04-24';
	$date2 = '2015-05-03';

	if($date1 == $date2){ //only asking for info from one day, so...
		//echo "executing one day loop" . "\n <br />";
		$query1 = getInfoFromDatabase(
					"SELECT count(DISTINCT drop_id) as dc
					FROM drops
					WHERE DATE(time_stamp) = '$date1'");
		$dropCount = $query1[0]['dc'];

		$query2 = getInfoFromDatabase(
					"SELECT count(DISTINCT user_id) as uc
					FROM drops
					WHERE DATE(time_stamp) = '$date1'");
		$userCount = $query2[0]['uc'];
		$info = array(
			'dropCount' => $dropCount,
			'userCount' => $userCount);
		echo json_encode($info);

	} /*else {
		$query3 = getInfoFromDatabase(
				"SELECT count(drop_id) as dc
				FROM drops
				WHERE DATE(time_stamp) >= '$date1'
				AND DATE(time_stamp) <= '$date2'");
		$dropCount = $query3[0]['dc'];

		$query4 = getInfoFromDatabase(
				"SELECT count(user_id) as uc
				FROM drops
				WHERE DATE(time_stamp) >= '$date1'
				AND DATE(time_stamp) <= '$date2'");
		$userCount = $query4[0]['uc'];

		$info = array(
			'dropCount' => $dropCount,
			'userCount' => $userCount);
		echo json_encode($info);
	}*/
	/*else {
		$query5 = getInfoFromDatabase(
				"SELECT DISTINCT(DATE(time_stamp)) as dates
				FROM drops
				WHERE DATE(time_Stamp) >= '$date1'
				AND DATE(time_stamp) <= '$date2'");
		$info = array();
		foreach($query5 as $key => $value){
			$date = $value['dates'];
			$query6 = "SELECT count(drop_id) as dc
					FROM drops
					WHERE DATE(time_stamp) = '$date'";
			$result6 = getInfoFromDatabase($query6);
			$dropCount = $result6[0]['dc'];

			$query7 = "SELECT count(user_id) as uc
					FROM drops
					WHERE DATE(time_stamp) = '$date'";
			$result7 = getInfoFromDatabase($query7);
			$userCount = $result7[0]['uc'];

			$info[] = array(
					'date' => $date,
					'dropCount' => $dropCount,
					'userCount' => $userCount);	
		}

		echo json_encode($info);
	}*/
		else {
		$dates = array($date1);
		while(end($dates) < $date2){
			$dates[] = date('Y-m-d', strtotime(end($dates). '+1 day'));
		}

		foreach($dates as $value){
			$date = $value;
			$query6 = "SELECT count(drop_id) as dc
					FROM drops
					WHERE DATE(time_stamp) = '$date'";
			$result6 = getInfoFromDatabase($query6);
			$dropCount = $result6[0]['dc'];

			$query7 = "SELECT count(DISTINCT user_id) as uc
					FROM drops
					WHERE DATE(time_stamp) = '$date'";
			$result7 = getInfoFromDatabase($query7);
			$userCount = $result7[0]['uc'];

			$info[] = array(
					'date' => $date,
					'dropCount' => $dropCount,
					'userCount' => $userCount);	
		}

		echo json_encode($info);
	}


?>