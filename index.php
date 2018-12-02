<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<link rel='shortcut icon' type='image/x-icon' href='favicon.ico' />
	
	<title>Rishabh Sahay | UI/UX developer India</title>
	
	<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
	
	
	<link href='https://fonts.googleapis.com/css?family=Roboto:400,300,100' rel='stylesheet' type='text/css'>
	
	<link href="css/style.css" rel="stylesheet" type="text/css">
	
	<!-- Google Tag Manager -->
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-NWN3V3K');</script>
	<!-- End Google Tag Manager -->
</head>
<body>
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NWN3V3K"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
	<div id="page">
			<!-- Header-->
			<header>
				<div class="head_wrap">
					<div class="logo">
						<img src="img/logo.png" alt="logo"/>
					</div>
					<div class="nav_menu">
						<nav>
							<ul>
								<li><a href="#about">About</a></li>
								<li><a href="#work">Work</a></li>
								<li><a href="#contact">Contact</a></li>
							</ul>
						</nav>
					</div>
				</div>
			</header>
			<div class="content">
				<!--Home -->
				<div class="row" id="home">
					<div class="h_wrap">
					 <div class="h_line"></div>
					 <div class="h_text">
						<div class="htext_1">{I design}</div>
						<div class="htext_2"><span class="brk">&lt;</span>my code<span class="brk">&gt;</span></div>
					 </div>
					</div>
				</div>
				
				<!--About -->
				<div class="row" id="about">
					<div class="a_wrap">
						<div class="a_img"><img src="img/1.png"/></div>
						<div class="a_text">
							<div class="atext1"><span class="a_hi">Hi</span> I am Rishabh</div>
							<div class="atext2">UI/UX developer, Frontend engineer</div>
							<div class="atext2">Information architect, Wanderer</div>
						</div>
						<div class="a_line"></div>
					</div>
				</div>
				<!--Work-->
				<!--Contact -->
				<div class="row" id="contact">
					<div class="c_wrap">
						<div class="c_left">
							<div class="c_text">
								<a href="mailto:>ping@rishabhsahay.com" class="c_mail">ping@rishabhsahay.com</a>
								<div class="c_link">
									<a class="c_ln"><img src="img/ln.png"/></a>
									<a class="c_tw"><img src="img/tw.png"/></a>
								</div>
							</div>
						</div>
						<div class="c_tilt"></div>
						<div class="c_right">
							<div class="c_form"></div>
						</div>
					</div>
				</div>
			</div>
	</div>

	<script>
	
	$(document).ready(function(){
		draw();
	});
	
	
		$(".nav_menu ul li a").click(function(){
			if($(".nav_menu ul li a").hasClass("active")){
				$(".nav_menu ul li a").removeClass("active");
			}
			$(this).addClass("active");
		});
	</script>
	<script src="js/script.js"></script>
</body>
</html>