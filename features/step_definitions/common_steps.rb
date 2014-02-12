When(/^I go to (.*)$/) do |url|
  visit url
end

And(/I wait for the page to be fully loaded/) do
  page.should have_css('body.ready')
end

Then(/^the status code should be (\d*)/) do |status_code|
  page.status_code.should == status_code.to_i
end

Then(/^I should see the text "(.*)"/) do |page_text|
  page.body.should have_content(page_text)
end

Then(/^I should receive the appropriate "(.*?)"$/) do |file_name|
  JSON.parse(page.document.text).should == JSON.parse(File.read(File.join(PROJECT_ROOT, "app/support/backdrop_stub/responses", file_name)))
end

Then(/^I see "(.*?)" crumb(s?) in the breadcrumb trail$/) do |num_crumbs, plural_crumbs|
  page.all('#global-breadcrumb ol li').count.should eql(num_crumbs.to_i)
end

Then(/^I can report an error for the current page$/) do
  page.should have_css('.report-a-problem-container', :visible => false)
  page.find('.report-a-problem-toggle a').click
  page.should have_css('.report-a-problem-container', :visible => true)

  current_path = URI.parse(current_url).path
  page.should have_css('input#url', :visible => false)
  page.find('input#url', :visible => false)['value'].should === "https://spotlight.test.gov.uk#{current_path}"
end
