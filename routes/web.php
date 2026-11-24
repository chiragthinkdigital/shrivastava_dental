<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'pages.home');

$pages = [
    '/aligners' => 'pages.aligners',
    '/all-on-x' => 'pages.all_on_x',
    '/complex-diagnostics' => 'pages.complex_diagnostics',
    '/hygiene' => 'pages.hygiene',
    '/implants' => 'pages.implants',
    '/veneers' => 'pages.veneers',
];

foreach ($pages as $uri => $view) {
    Route::view($uri, $view);
}
