@extends('layouts.app', [
    'lang' => 'ru',
    'bodyAttributes' => 'data-clone-lang="ru" data-clone-page="aligners"',
    'pageClass' => 'page sales-page aligners-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.ru_aligners.head')
@endsection

@section('dialogs')
@include('pages.ru_aligners.dialogs')
@endsection

@section('header')
@include('pages.ru_aligners.header')
@endsection

@section('main')
@include('pages.ru_aligners.main')
@endsection

@section('footer')
@include('pages.ru_aligners.footer')
@endsection
