<?php

namespace Tests\Feature;

use Tests\TestCase;

class InstagramReelsTest extends TestCase
{
    public function test_home_page_renders_six_instagram_reel_links_in_order(): void
    {
        $response = $this->get('/');

        $response->assertOk();
        $response->assertSeeInOrder([
            'https://www.instagram.com/reel/DadSMiAqTdu/?hvrq=MWtkbTVwOW8wYm9zdA==',
            'https://www.instagram.com/reel/DMkPSuVTviT/?bqrl=MTFxa2t3anhpbTd3cA==',
            'https://www.instagram.com/reel/DKzytrPzlt6/?gwpx=MTRqa3VvY2RldnNjeg==',
            'https://www.instagram.com/reel/DKPmPvUIMRh/?jplx=MXFpZDlpYjFwOWg5MQ==',
            'https://www.instagram.com/reel/DKAGU5_orPA/?dmpr=MXc1emVhNXI1ZXNkdw==',
            'https://www.instagram.com/reel/DJ9py3voRMy/?cnvx=bmRvcnZvM3cxYTky',
        ]);
        $this->assertSame(6, substr_count($response->getContent(), 'class="feedback-instagram-list__item"'));
        $response->assertSee('/cms/api/media/file/6-960x1449.avif');
        $response->assertSee('/cms/api/media/file/9-960x1404.avif');
    }

    public function test_instagram_reel_links_open_in_a_new_tab_with_a_watch_label(): void
    {
        $response = $this->get('/');

        $response->assertOk();
        $this->assertSame(6, preg_match_all('/<a class="feedback-instagram-list__item"[^>]*target="_blank" rel="noopener noreferrer"/', $response->getContent()));
        $this->assertSame(6, substr_count($response->getContent(), 'Watch reel</span>'));
        $response->assertSee('role="region" aria-label="Instagram reels" tabindex="0"', false);
        $response->assertSee('aria-label="Watch reel 6 on Instagram"', false);
    }
}
