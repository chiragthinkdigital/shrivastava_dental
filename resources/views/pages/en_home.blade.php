@extends('layouts.app', [
    'lang' => 'en',
    'bodyAttributes' => 'data-clone-lang="en" data-clone-page="index"',
    'pageClass' => 'page home-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-showcase, --tl-section-services, --tl-section-team, --tl-section-pricing, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.en_home.head')
@endsection

@section('dialogs')
@include('pages.en_home.dialogs')
@endsection

@section('header')
@include('pages.en_home.header')
@endsection

@section('main')
@include('pages.en_home.main')
@endsection

@section('footer')
@include('pages.en_home.footer')
@endsection
