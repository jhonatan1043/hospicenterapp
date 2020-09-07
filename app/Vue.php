<?php
 
namespace App;
 
class Vue
{
    public static function prop($name, $value)
    {
        return sprintf(":%s='%s'", $name, json_encode($value));
    }
}