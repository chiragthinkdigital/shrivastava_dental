@extends('layouts.app', [
    'lang' => 'ru',
    'bodyAttributes' => 'data-clone-lang="ru" data-clone-page="implants"',
    'pageClass' => 'page sales-page implants-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.ru_implants.head')
@endsection

@section('dialogs')
@include('pages.ru_implants.dialogs')
@endsection

@section('header')
@include('pages.ru_implants.header')
@endsection

@section('main')
@include('pages.ru_implants.main')
@endsection

@section('footer')
@include('pages.ru_implants.footer')
@endsection
