<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="keyword" content="">
    <link rel="shortcut icon" href="img/logo_color.jpeg">
    <!-- Id for Channel Notification -->   
    <meta name="userId" content="{{ Auth::check() ? Auth::user()->id : ''}}">  
    <title>Clinica san ignacio</title>
    <meta name="csrf-token" content="{{ csrf_token() }}"> 
    <!-- Icons -->
    <link href="css/plantilla.css" rel="stylesheet">
</head>

<body class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
<div id="app">
    <header class="app-header navbar">
        <button class="navbar-toggler mobile-sidebar-toggler d-lg-none mr-auto" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="nav navbar-nav ml-auto"> 
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle nav-link" data-toggle="dropdown" 
                   href="#menuSession" 
                   role="button" 
                   aria-haspopup="true" 
                   aria-expanded="false">
                    <span class="d-md-down-none"></span>
                </a>
                <div class="dropdown-menu dropdown-menu-right" id="menuSession">
                    <div class="dropdown-header text-center">
                        <strong>Cuenta</strong>
                    </div>
                    <a class="dropdown-item" href="" 
                    onclick="event.preventDefault(); 
                             document.getElementById('logout-form').submit();">
                    <i class="fa fa-lock"></i> Cerrar sesión</a>

                    <form id="logout-form" 
                          action="/logout" 
                          method="POST" 
                          style="display: none;">
                        {{ csrf_field() }}
                    </form>
                </div>
            </li>
        </ul>
    </header>
    <div class="app-body">
        @include('plantilla.sidebar')
        @yield('contenido')
    </div>   
</div>
</body>
<footer class="footer-fixed ">
    <div class="app-footer float-left">
      <strong>usuario:
          </strong>
           <small>&nbsp;<?= session()->get('sesionActual.usuario') ?></small> 
    </div>
</footer>
    <script src="js/app.js"></script>
    <script src="js/plantilla.js"></script>
</html>