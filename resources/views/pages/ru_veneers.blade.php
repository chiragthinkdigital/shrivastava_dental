@extends('layouts.app', [
    'lang' => 'ru',
    'bodyAttributes' => 'data-clone-lang="ru" data-clone-page="veneers"',
    'pageClass' => 'page sales-page veneers-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.ru_veneers.head')
@endsection

@section('dialogs')
@include('pages.ru_veneers.dialogs')
@endsection

@section('header')
@include('pages.ru_veneers.header')
@endsection

@section('main')
@include('pages.ru_veneers.main')
@endsection

@section('footer')
@include('pages.ru_veneers.footer')
@endsection
