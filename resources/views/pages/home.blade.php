@extends('layouts.app', [
    'lang' => 'en-IN',
    'bodyAttributes' => 'data-clone-lang="en" data-clone-page="index"',
    'pageClass' => 'page home-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-showcase, --tl-section-services, --tl-section-team, --tl-section-pricing, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.home.head')
@endsection

@section('dialogs')
@include('pages.home.dialogs')
@endsection

@section('header')
@include('pages.home.header')
@endsection

@section('main')
@include('pages.home.main')
@endsection

@section('footer')
@include('pages.home.footer')
@endsection
