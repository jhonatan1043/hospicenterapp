
@if($item['submenu']==[])

<li @click="{{$item['enlace']}}">
    <a class="nav-link active" href="#"><i class="{{$item['icono']}}"></i> 
      <span class="font-italic small">{{$item['descripcion']}}</span>
    </a>
</li> 
@else
 
    <li class="nav-item nav-dropdown">
        <a class="nav-link nav-dropdown-toggle" href="#">
            <i class="{{$item['icono']}}"></i>
            <span class="h6 font-italic">{{$item["descripcion"]}}</span>
            
        </a>
          <ul class="nav-dropdown-items">
             @foreach($item["submenu"] as $submenu)
                @include("plantilla.$plantilla.sidebarHijo",["item"=>$submenu])
             @endforeach
          </ul>
    </li>                
 @endif   


 