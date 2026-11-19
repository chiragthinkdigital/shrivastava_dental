@extends('layouts.app', [
    'lang' => 'en',
    'bodyAttributes' => 'data-clone-lang="en" data-clone-page="aligners"',
    'pageClass' => 'page sales-page aligners-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.en_aligners.head')
@endsection

@section('dialogs')
@include('pages.en_aligners.dialogs')
@endsection

@section('header')
@include('pages.en_aligners.header')
@endsection

@section('main')
@include('pages.en_aligners.main')
@endsection

@section('footer')
@include('pages.en_aligners.footer')
@endsection
