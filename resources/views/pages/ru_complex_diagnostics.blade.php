@extends('layouts.app', [
    'lang' => 'ru',
    'bodyAttributes' => 'data-clone-lang="ru" data-clone-page="complex-diagnostics"',
    'pageClass' => 'page sales-page complex-diagnostics-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.ru_complex_diagnostics.head')
@endsection

@section('dialogs')
@include('pages.ru_complex_diagnostics.dialogs')
@endsection

@section('header')
@include('pages.ru_complex_diagnostics.header')
@endsection

@section('main')
@include('pages.ru_complex_diagnostics.main')
@endsection

@section('footer')
@include('pages.ru_complex_diagnostics.footer')
@endsection
