<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Promental extends Model
{
    //
    //
    protected $table = 'promentalregisters';
    //
    protected $fillable = [
        'name',
        'phone',
        'mail',
        'adress'
    ];
}
