
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Hospi | Inicio de Sesión</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="shortcut icon" href="img/logo_color.jpeg">
   <!-- Bootstrap 3.3.5 -->
   <link rel="stylesheet" href="css/styleLogin.css">
   <link rel="stylesheet" href="css/plantilla.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="css/AdminLTE.min.css">
  <!-- Google Font -->
</head>
<body >
<div id="app">
<div class="login-box">
  <div class="login-logo">
  <img src="/img/logo.png" width=100%;>
  </div>  
    @yield('login') 
  <!-- /.login-box-body -->
</div>
</div>
<!-- /.login-box -->  

    <script src="js/app.js"></script>
    <script src="js/plantilla.js"></script>
</body>
</html>
