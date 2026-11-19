@extends('layouts.app', [
    'lang' => 'en',
    'bodyAttributes' => 'data-clone-lang="en" data-clone-page="complex-diagnostics"',
    'pageClass' => 'page sales-page complex-diagnostics-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.en_complex_diagnostics.head')
@endsection

@section('dialogs')
@include('pages.en_complex_diagnostics.dialogs')
@endsection

@section('header')
@include('pages.en_complex_diagnostics.header')
@endsection

@section('main')
@include('pages.en_complex_diagnostics.main')
@endsection

@section('footer')
@include('pages.en_complex_diagnostics.footer')
@endsection
