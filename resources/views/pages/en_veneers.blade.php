@extends('layouts.app', [
    'lang' => 'en',
    'bodyAttributes' => 'data-clone-lang="en" data-clone-page="veneers"',
    'pageClass' => 'page sales-page veneers-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.en_veneers.head')
@endsection

@section('dialogs')
@include('pages.en_veneers.dialogs')
@endsection

@section('header')
@include('pages.en_veneers.header')
@endsection

@section('main')
@include('pages.en_veneers.main')
@endsection

@section('footer')
@include('pages.en_veneers.footer')
@endsection
