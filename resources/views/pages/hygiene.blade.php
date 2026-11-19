@extends('layouts.app', [
    'lang' => 'lv-LV',
    'bodyAttributes' => 'data-clone-lang="lv" data-clone-page="hygiene"',
    'pageClass' => 'page sales-page hygiene-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.hygiene.head')
@endsection

@section('dialogs')
@include('pages.hygiene.dialogs')
@endsection

@section('header')
@include('pages.hygiene.header')
@endsection

@section('main')
@include('pages.hygiene.main')
@endsection

@section('footer')
@include('pages.hygiene.footer')
@endsection
