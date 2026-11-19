@extends('layouts.app', [
    'lang' => 'lv-LV',
    'bodyAttributes' => 'data-clone-lang="lv" data-clone-page="aligners"',
    'pageClass' => 'page sales-page aligners-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.aligners.head')
@endsection

@section('dialogs')
@include('pages.aligners.dialogs')
@endsection

@section('header')
@include('pages.aligners.header')
@endsection

@section('main')
@include('pages.aligners.main')
@endsection

@section('footer')
@include('pages.aligners.footer')
@endsection
