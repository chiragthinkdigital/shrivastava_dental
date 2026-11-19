@extends('layouts.app', [
    'lang' => 'ru',
    'bodyAttributes' => 'data-clone-lang="ru" data-clone-page="all-on-x"',
    'pageClass' => 'page sales-page all-on-x-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.ru_all_on_x.head')
@endsection

@section('dialogs')
@include('pages.ru_all_on_x.dialogs')
@endsection

@section('header')
@include('pages.ru_all_on_x.header')
@endsection

@section('main')
@include('pages.ru_all_on_x.main')
@endsection

@section('footer')
@include('pages.ru_all_on_x.footer')
@endsection
