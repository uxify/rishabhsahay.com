<!DOCTYPE html>
<html>
    <head> 
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Ping Echo | Custom HTML form for static pages.</title>
        <link rel='shortcut icon' type='image/x-icon' href='http://pingecho.org/favicon.ico'/>
        
        <link href='http://fonts.googleapis.com/css?family=Lato:700,400,300' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="css/style.css"/>
        <link rel="stylesheet" href="css/home.css"/>
        
    </head>
<body>
    <div id="content">
        <header>
            <div class="head_wrap">
                <a href="#" class="logo">
                    <img src="images/logo.png"/>
                </a>
                <a class="hlogin" href="#">
                    Login
                </a>
            </div>
        </header>
        <div class="page" id="page">
            <div class="page_wrap home" id="home">
                <div class="page_section sec1">
                    <div class="section_wrap">
                        <h1>Custom HTML form for everyone!</h1>
                        <div class="home_form">
                            <form id="home_form" name="home_form" action="#" method="POST">
                                <div class="home_form_row">
                                    <input placeholder="Your email id" type="email" name="email" class="home_input_email"/>
                                </div>
                                <input type="submit" value="Create" class="home_form_submit form_submit" id="home_form_submit"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            
        </footer>
    </div>
</body>
</html>