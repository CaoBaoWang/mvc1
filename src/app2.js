import "./app2.css";
import $ from "jquery";

const $tabBar = $('#app2 .tab-bar')
const $tabContent = $('#app2 .tab-content')

$tabBar.on('click','li', function (e) {

  const li = $(e.currentTarget)
  const index = li
      .addClass('selected')
      .siblings()
      .removeClass('selected')
      .index();
  console.log(index);
  $tabContent
      .children()
      .eq(index)
      .addClass('active')
      .siblings()
      .removeClass('active')
  console.log($tabContent
      .children().find());
})
$tabBar.children().eq(0).trigger('click')
