@extends('layouts.app', [
    'lang' => 'ru',
    'bodyAttributes' => 'data-clone-lang="ru" data-clone-page="index"',
    'pageClass' => 'page home-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-services, --tl-section-team, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.ru_home.head')
@endsection

@section('dialogs')
@include('pages.ru_home.dialogs')
@endsection

@section('header')
@include('pages.ru_home.header')
@endsection

@section('main')
@include('pages.ru_home.main')
@endsection

@section('footer')
@include('pages.ru_home.footer')
@endsection
