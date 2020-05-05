<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Promental;
use App\Http\Requests\PromentalRequest;
use App\Http\Resources\PromentalResource;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\ValidationRequest;

class PromentalController extends Controller
{
	public function validar(ValidationRequest $request){
	    
	   return response()->json(['message' => "no registrado"]);

	}
    //
    public function store(PromentalRequest $request)
    {


        $registro = new Promental;

        $registro->name =$request->name;
        $registro->phone =$request->phone;
        $registro->mail =$request->mail;
        $registro->adress =$request->adress;

        $registro->save();

        return response()->json([
            'message' => "success",
            'question' => new PromentalResource($registro)
        ]);




    }
}
