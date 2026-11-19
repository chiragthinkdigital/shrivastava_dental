@extends('layouts.app', [
    'lang' => 'lv-LV',
    'bodyAttributes' => 'data-clone-lang="lv" data-clone-page="implants"',
    'pageClass' => 'page sales-page implants-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.implants.head')
@endsection

@section('dialogs')
@include('pages.implants.dialogs')
@endsection

@section('header')
@include('pages.implants.header')
@endsection

@section('main')
@include('pages.implants.main')
@endsection

@section('footer')
@include('pages.implants.footer')
@endsection
