@extends('layouts.app', [
    'lang' => 'lv-LV',
    'bodyAttributes' => 'data-clone-lang="lv" data-clone-page="complex-diagnostics"',
    'pageClass' => 'page sales-page complex-diagnostics-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.complex_diagnostics.head')
@endsection

@section('dialogs')
@include('pages.complex_diagnostics.dialogs')
@endsection

@section('header')
@include('pages.complex_diagnostics.header')
@endsection

@section('main')
@include('pages.complex_diagnostics.main')
@endsection

@section('footer')
@include('pages.complex_diagnostics.footer')
@endsection
