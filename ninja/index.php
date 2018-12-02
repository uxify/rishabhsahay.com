<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);


    function get_url($url)
    {
		$ch = curl_init();

		if($ch === false)
		{
			die('Failed to create curl object');
		}

		$timeout = 5;
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		$data = curl_exec($ch);
		curl_close($ch);
		return $data;
    }

	if(!isset($_REQUEST["auth"])){
        echo "Access denied";
		exit;
    }

    if(isset($_REQUEST["view"])){
        $url = $_REQUEST["view"];
        echo get_url($url);
    }
    else{
       echo "<form action='#'>
                <input type='text' name='view'/>
                <input type='submit' value='Cloak'/>
            </form>";
    }
