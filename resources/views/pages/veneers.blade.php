@extends('layouts.app', [
    'lang' => 'lv-LV',
    'bodyAttributes' => 'data-clone-lang="lv" data-clone-page="veneers"',
    'pageClass' => 'page sales-page veneers-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.veneers.head')
@endsection

@section('dialogs')
@include('pages.veneers.dialogs')
@endsection

@section('header')
@include('pages.veneers.header')
@endsection

@section('main')
@include('pages.veneers.main')
@endsection

@section('footer')
@include('pages.veneers.footer')
@endsection
