@extends('layouts.app', [
    'lang' => 'en',
    'bodyAttributes' => 'data-clone-lang="en" data-clone-page="implants"',
    'pageClass' => 'page sales-page implants-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.en_implants.head')
@endsection

@section('dialogs')
@include('pages.en_implants.dialogs')
@endsection

@section('header')
@include('pages.en_implants.header')
@endsection

@section('main')
@include('pages.en_implants.main')
@endsection

@section('footer')
@include('pages.en_implants.footer')
@endsection
