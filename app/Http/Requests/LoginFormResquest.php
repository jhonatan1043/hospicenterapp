<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginFormResquest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'usuario' => 'required',
            'password' => 'required',
            'idEmpresa' => 'required',
            'idPuntoServicio' => 'required'
        ];
    }

    public function messages()
    {
       return [
               'usuario.required' => '¡el usuario es obrigatorio!',
               'password.required' => '¡la contraseña es obrigatoria!',
               'idEmpresa.required' => '¡Seleccione la empresa !',
               'idPuntoServicio.required' => '¡seleccione el punto de servicio!'
             ];
    }
}
