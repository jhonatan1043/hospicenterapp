<section class="sidebar">     
          <!-- sidebar menu: : style can be found in sidebar.less -->
          <nav class="sidebar-nav">
               <ul class="nav">
                  <li class="nav-item">
                  <li class="nav-title"></li>
            @foreach ($menusComposer as $key => $item)
          
             @if($item["padre"]!=null)
               @break
             @endif
             @include("plantilla.$plantilla.sidebarHijo",["item" => $item])
           @endforeach
         </ul>
       </nav>
</section>
