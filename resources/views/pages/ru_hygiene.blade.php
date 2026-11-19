@extends('layouts.app', [
    'lang' => 'ru',
    'bodyAttributes' => 'data-clone-lang="ru" data-clone-page="hygiene"',
    'pageClass' => 'page sales-page hygiene-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.ru_hygiene.head')
@endsection

@section('dialogs')
@include('pages.ru_hygiene.dialogs')
@endsection

@section('header')
@include('pages.ru_hygiene.header')
@endsection

@section('main')
@include('pages.ru_hygiene.main')
@endsection

@section('footer')
@include('pages.ru_hygiene.footer')
@endsection
