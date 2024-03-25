/* global grammar, optional, seq, repeat, repeat1, choice, prec, token, alias */

module.exports = grammar({
  name: "asciidoc",

  extras: (_) => [],
  // extras: ($) => [$.comment],
  // extras: (_) => ["\n"],
  // extras: (_) => [
  //   // $.comment,
  //   // /\s/,
  //   "\n",
  //   // /\n/,
  // ],

  rules: {
    // Document
    document: ($) =>
      seq(
        repeat(prec(1, choice($._x_blank_line, $.comment))),
        choice(
          optional(
            seq(
              $.document_header,
              optional(seq($._x_blank_line, $.document_body)),
            ),
          ),
          optional($.document_body),
        ),
      ),

    // ------------------------------------------------------------------------

    // Header
    //
    document_header: ($) =>
      prec.right(
        seq(
          $.document_title,
          repeat(prec(1, $.comment)),
          optional(
            seq(
              $.document_authors,
              optional(seq(repeat(prec(1, $.comment)), $.document_revision)),
            ),
          ),
          optional($._document_attributes),
        ),
      ),

    // Document title
    document_title: ($) => prec(2, seq("= ", repeat1($._char), $._newline)),
    // Document authors
    document_authors: ($) => seq(/[^:=\n]/, repeat1($._char), $._newline),
    // Document revision
    document_revision: ($) => seq(/[^:=\n]/, repeat1($._char), $._newline),
    // Document attributes
    _document_attributes: ($) =>
      repeat1(choice($.comment, $.document_attribute)),

    // ------------------------------------------------------------------------

    // Body
    document_body: ($) =>
      repeat1(
        seq(
          choice(
            $._x_blank_line,
            $.document_attribute,
            $.element_attributes,
            $.title,
            $.part,
            $.section,
            $.page_break,
            $.break,
            $.comment,
            $._block,
            $.paragraph,
            $.catch_unresolved,
          ),
        ),
      ),

    // ------------------------------------------------------------------------

    // Attributes
    // - ...
    // - https://docs.asciidoctor.org/asciidoc/latest/attributes/positional-and-named-attributes/
    //
    // - Document Attribute
    //
    // - Element Attribute
    //
    //   - option: `[%linenums,ruby]`
    //   - positional attribute: `[,ruby,linenums]`
    //
    //   - Shorthands:
    //     - `#` ... ID for `id=`
    //     - `.` ... role for `role=`
    //     - `%` ... option for `option=`

    // Document Attributes
    //
    // TODO:
    // - handling of incorrect attributes (e.g. missing last `:`)
    // - inline attributes
    //
    document_attribute: ($) =>
      seq(
        ":",
        $.attribute_name,
        ":",
        optional(seq(" ", $.attribute_value)),
        // optional($.attribute_value),
        $._newline,
      ),
    attribute_name: (_) => /[a-zA-Z0-9_][a-zA-Z0-9_-]*/,
    attribute_value: ($) => repeat1($._char),

    // Element Attributes
    //
    element_attributes: ($) => $._attribute_list,
    _attribute_list: ($) =>
      seq(
        "[",
        optional(
          seq($._attribute_unparsed, repeat(seq(",", $._attribute_unparsed))),
        ),
        "]",
        $._newline,
      ),
    // eslint-disable-next-line no-useless-escape
    _attribute_unparsed: (_) => /[^,\]\n]*/,

    // ------------------------------------------------------------------------

    // Titles
    //
    // TODO: ...
    //
    title: ($) => seq(".", repeat1(/[^\s]/), $._newline),

    // ------------------------------------------------------------------------

    // Sections
    // - https://docs.asciidoctor.org/asciidoc/latest/sections/titles-and-levels/
    //
    part: ($) => seq("= ", repeat1($._char), $._newline),
    section: ($) => seq(/={2,6} /, repeat1($._char), $._newline),

    // ------------------------------------------------------------------------

    // Breaks
    //
    // - `'''`
    // - Markdown: `---`, `- - -`, `***`,  `* * *`
    //
    break: ($) => seq(choice("'''", /- ?- ?-/, /\* ?\* ?\*/), $._newline),
    page_break: ($) => seq("<<<", $._newline),

    // ------------------------------------------------------------------------

    // Comments
    // - https://docs.asciidoctor.org/asciidoc/latest/comments/
    //
    comment: ($) =>
      choice(
        $.comment_line,
        $.comment_block,
        // $._comment_open_block,
        // $._comment_paragraph,
        $._comment_block_style,
      ),
    // Line style
    comment_line: ($) => seq("//", $._x_line),
    // Block style
    comment_block: ($) =>
      seq(
        "////",
        $._newline,
        repeat(choice($._x_line, $._x_blank_line)),
        "////",
        $._newline,
      ),
    // // Open Block style
    // _comment_open_block: ($) =>
    //   seq(
    //     "[",
    //     "comment",
    //     "]",
    //     $._newline,
    //     "--",
    //     $._newline,
    //     repeat(choice($._x_line, $._x_blank_line)),
    //     "--",
    //     $._newline,
    //   ),
    // // Paragraph style
    // _comment_paragraph: ($) =>
    //   seq("[", "comment", "]", $._newline, $._x_paragraph),
    // Open Block or Paragraph style
    _comment_block_style: ($) =>
      seq(
        alias($._comment_attributes, $.element_attributes),
        $._newline,
        choice($.open_block, $.paragraph),
      ),
    _comment_attributes: (_) => seq("[", "comment", "]"),

    // ------------------------------------------------------------------------

    // Blocks
    //
    // TODO:
    // - Source Code Block as a special Listing Block with a language attribute
    // - Also Markdown ``` Source Code Block?
    //
    _block: ($) =>
      choice(
        $.open_block,
        $.listing_block,
        $.literal_block,
        $.sidebar_block,
        $.example_block,
        $.pass_block,
      ),

    // Open Block with block style
    open_block: ($) =>
      seq(
        "--",
        $._newline,
        repeat(choice($._x_line, $._x_blank_line)),
        "--",
        $._newline,
      ),

    // Listing
    listing_block: ($) => choice($._listing_block, $._listing_block_style),
    // Block style
    _listing_block: ($) =>
      seq(
        "----",
        $._newline,
        repeat(choice($._x_line, $._x_blank_line)),
        "----",
        $._newline,
      ),
    // Open Block or Paragraph style
    _listing_block_style: ($) =>
      seq(
        alias($._listing_attributes, $.element_attributes),
        $._newline,
        choice($.open_block, $.paragraph),
      ),
    _listing_attributes: (_) => seq("[", "listing", "]"),

    // Literal
    literal_block: ($) => choice($._literal_block, $._literal_block_style),
    // Block style
    _literal_block: ($) =>
      seq(
        "....",
        $._newline,
        repeat(choice($._x_line, $._x_blank_line)),
        "....",
        $._newline,
      ),
    // Open Block or Paragraph style
    _literal_block_style: ($) =>
      seq(
        alias($._literal_attributes, $.element_attributes),
        $._newline,
        choice($.open_block, $.paragraph),
      ),
    _literal_attributes: (_) => seq("[", "literal", "]"),

    // Sidebar
    sidebar_block: ($) => choice($._sidebar_block, $._sidebar_block_style),
    // Block style
    _sidebar_block: ($) =>
      seq(
        "****",
        $._newline,
        repeat(choice($._x_line, $._x_blank_line)),
        "****",
        $._newline,
      ),
    // Open Block or Paragraph style
    _sidebar_block_style: ($) =>
      seq(
        alias($._sidebar_attributes, $.element_attributes),
        $._newline,
        choice($.open_block, $.paragraph),
      ),
    _sidebar_attributes: (_) => seq("[", "sidebar", "]"),

    // Example
    example_block: ($) => choice($._example_block, $._example_block_style),
    // Block style
    _example_block: ($) =>
      seq(
        "====",
        $._newline,
        repeat(choice($._x_line, $._x_blank_line)),
        "====",
        $._newline,
      ),
    // Open Block or Paragraph style
    _example_block_style: ($) =>
      seq(
        alias($._example_attributes, $.element_attributes),
        $._newline,
        choice($.open_block, $.paragraph),
      ),
    _example_attributes: (_) => seq("[", "example", "]"),

    // Passthrough
    pass_block: ($) => choice($._pass_block, $._pass_block_style),
    // Block style
    _pass_block: ($) =>
      seq(
        "++++",
        $._newline,
        repeat(choice($._x_line, $._x_blank_line)),
        "++++",
        $._newline,
      ),
    // Paragraph style
    _pass_block_style: ($) =>
      seq(
        alias($._pass_attributes, $.element_attributes),
        $._newline,
        $.paragraph,
      ),
    _pass_attributes: (_) => seq("[", "pass", "]"),

    // ------------------------------------------------------------------------

    // Paragraphs
    // - https://docs.asciidoctor.org/asciidoc/latest/blocks/paragraphs/
    //
    paragraph: ($) => prec.right(repeat1($._x_line)),
    _x_paragraph: ($) => prec.right(repeat1($._x_line)),

    // ------------------------------------------------------------------------

    // Catches the unresolved rest
    catch_unresolved: (_) => token(prec(-1, /.*/)),

    // ------------------------------------------------------------------------

    _x_line: ($) => seq(repeat1($._char), $._newline),
    _char: (_) => /[^\n]/,
    _newline: () => "\n",
    _x_blank_line: ($) => seq("", $._newline),
  },
});
