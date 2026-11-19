<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'pages.home');

$staticPages = [
    '/en' => 'pages.en_home',
    '/ru' => 'pages.ru_home',
    '/aligners' => 'pages.aligners',
    '/all-on-x' => 'pages.all_on_x',
    '/complex-diagnostics' => 'pages.complex_diagnostics',
    '/hygiene' => 'pages.hygiene',
    '/implants' => 'pages.implants',
    '/veneers' => 'pages.veneers',
    '/en/aligners' => 'pages.en_aligners',
    '/en/all-on-x' => 'pages.en_all_on_x',
    '/en/complex-diagnostics' => 'pages.en_complex_diagnostics',
    '/en/hygiene' => 'pages.en_hygiene',
    '/en/implants' => 'pages.en_implants',
    '/en/veneers' => 'pages.en_veneers',
    '/ru/aligners' => 'pages.ru_aligners',
    '/ru/all-on-x' => 'pages.ru_all_on_x',
    '/ru/complex-diagnostics' => 'pages.ru_complex_diagnostics',
    '/ru/hygiene' => 'pages.ru_hygiene',
    '/ru/implants' => 'pages.ru_implants',
    '/ru/veneers' => 'pages.ru_veneers',
];

foreach ($staticPages as $uri => $view) {
    Route::view($uri, $view);
}
