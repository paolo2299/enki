Feature: Browsing
  Because I write totally awesome posts
  An everyday Joe
  Should be able to read and comment on my posts

  Scenario: browsing the blog page
    Given there is at least one post tagged "awesome"
    When I go to the blog page
    Then I should see "This is a post"
    And I should see a link to all posts tagged "awesome"

  Scenario: browsing the blog archive, to find more posts to read
    Given there is at least one post titled "My Post"
    When I go to the blog page
    And I follow "Blog Archive"
    Then I should see "My Post"
