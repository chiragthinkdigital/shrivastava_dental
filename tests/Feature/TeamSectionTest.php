<?php

namespace Tests\Feature;

use Tests\TestCase;

class TeamSectionTest extends TestCase
{
    public function test_assistant_doctors_follow_dr_kriti_in_team_carousel(): void
    {
        $response = $this->get('/');

        $response->assertOk();
        $response->assertSeeInOrder([
            '<h3 class="doctor-profile__name">Dr. Kriti Shrivastava</h3>',
            '<h3 class="doctor-profile__name">Dr. Nikita Desai</h3>',
            '<h3 class="doctor-profile__name">Dr. Ayesha Shaikh</h3>',
        ], false);
        $this->assertSame(2, substr_count($response->getContent(), '<p class="doctor-profile__role u-text-body-large">Assistant Doctor</p>'));
    }
}
