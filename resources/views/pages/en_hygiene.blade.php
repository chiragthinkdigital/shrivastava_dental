@extends('layouts.app', [
    'lang' => 'en',
    'bodyAttributes' => 'data-clone-lang="en" data-clone-page="hygiene"',
    'pageClass' => 'page sales-page hygiene-page',
    'pageStyle' => ' style="timeline-scope:--tl-section-about, --tl-section-portfolio, --tl-section-process, --tl-section-feedback, --tl-section-about-us, --tl-section-faq, --tl-section-contacts;"',
])

@section('head')
@include('pages.en_hygiene.head')
@endsection

@section('dialogs')
@include('pages.en_hygiene.dialogs')
@endsection

@section('header')
@include('pages.en_hygiene.header')
@endsection

@section('main')
@include('pages.en_hygiene.main')
@endsection

@section('footer')
@include('pages.en_hygiene.footer')
@endsection
