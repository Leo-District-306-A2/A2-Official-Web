let curr_date = new Date();

if(curr_date.getMonth() === 11) {
    let content_html = "\n" +
        "<div class=\"snowflakes\" aria-hidden=\"true\">\n" +
        "  <div class=\"snowflake\">\n" +
        "  ❅\n" +
        "  </div>\n" +
        "  <div class=\"snowflake\">\n" +
        "  ❅\n" +
        "  </div>\n" +
        "  <div class=\"snowflake\">\n" +
        "  ❆\n" +
        "  </div>\n" +
        "  <div class=\"snowflake\">\n" +
        "  ❄\n" +
        "  </div>\n" +
        "  <div class=\"snowflake\">\n" +
        "  ❅\n" +
        "  </div>\n" +
        "  <div class=\"snowflake\">\n" +
        "  ❆\n" +
        "  </div>\n" +
        "  <div class=\"snowflake\">\n" +
        "  ❄\n" +
        "  </div>\n" +
        "  <div class=\"snowflake\">\n" +
        "  ❅\n" +
        "  </div>\n" +
        "  <div class=\"snowflake\">\n" +
        "  ❆\n" +
        "  </div>\n" +
        "  <div class=\"snowflake\">\n" +
        "  ❄\n" +
        "  </div>\n" +
        "</div>";

    $('#seasonal').html(content_html);
}
