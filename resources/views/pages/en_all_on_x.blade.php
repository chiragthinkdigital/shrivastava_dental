@extends('layouts.app', [
    'lang' => 'en',
    'bodyAttributes' => 'data-clone-lang="en" data-clone-page="all-on-x"',
    'pageClass' => 'page sales-page all-on-x-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.en_all_on_x.head')
@endsection

@section('dialogs')
@include('pages.en_all_on_x.dialogs')
@endsection

@section('header')
@include('pages.en_all_on_x.header')
@endsection

@section('main')
@include('pages.en_all_on_x.main')
@endsection

@section('footer')
@include('pages.en_all_on_x.footer')
@endsection
