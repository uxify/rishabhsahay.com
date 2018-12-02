<?php

$to      = 'rishabhsahay.0@gmail.com';
$subject = 'Your product(s) will expire soon';
$message = '<html>
<head>
    <title>hostingmail</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>

<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="text-align:center;">
    <!-- Save for Web Slices (hostingmail.psd) -->
    <table style="text-align:center; margin: 0 auto;">
        <tr>
            <td>
                <a href="#"><img alt="cloudbitmailer" src="http://rishabhsahay.com/file/hostingmail.jpg" width="1024" height="1000" alt=""></a>
            </td>
        </tr>
    </table>
    
    <!-- End Save for Web Slices -->
</body>

</html>';

$headers = 'From: Cloudbit <service@cloudbit.io>' . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

mail($to, $subject, $message, $headers);


?>