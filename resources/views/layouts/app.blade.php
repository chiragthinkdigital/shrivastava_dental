<!DOCTYPE html><html lang="{{ $lang }}" class="lenis">
<head>
@yield('head')
@vite(['resources/css/site.css', 'resources/js/app.js'])
</head>
<body {!! $bodyAttributes !!}>
<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><filter id="gold-logo" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 0.831373 0 0 0 0 0.686275 0 0 0 0 0.215686 0 0 0 1 0"/></filter></svg>
@yield('dialogs')
<div id="__nuxt"><div class="app"><!--[--><div class="{{ $pageClass }}"{!! $pageStyle !!}>
@yield('header')
@yield('main')
@yield('footer')
@include('partials.tail')
</body></html>
