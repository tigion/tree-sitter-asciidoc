/**
 * @file AsciiDoc grammar for tree-sitter
 * @author Christoph Zirkelbach
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

/* global grammar, optional, seq, repeat, repeat1, choice, prec, token, alias */

module.exports = grammar({
  name: "asciidoc",

  externals: ($) => [$.listing_block_content, $.literal_block_content],

  extras: (_) => [],
  // extras: ($) => [$._comment],
  // extras: (_) => ["\n"],
  // extras: (_) => [
  //   // $._comment,
  //   // /\s/,
  //   "\n",
  //   // /\n/,
  // ],

  conflicts: ($) => [
    [$.document_header],
    [$._block_not_section],
    // [$.block_context, $._list_continuation_content],
  ],

  rules: {
    // Document
    //
    // 1. (optional) Blank Lines and/or Comments
    // 2. Choices:
    //   - Only Document Header
    //   - Document Header + Blank Lines + Document Body
    //   - Only Document Body
    //
    //
    document: ($) =>
      seq(
        repeat(prec(10, choice($._blank_lines, $._comments))),
        choice(
          optional(
            seq(
              $.document_header,
              optional(seq($._blank_lines, $.document_body)),
            ),
          ),
          optional($.document_body),
        ),
      ),

    // ------------------------------------------------------------------------

    // Header
    //
    // 1. Document Title
    // 2. (optional) Comments
    // 3. (optional) Authors or Authors + (Comments) + Revision
    // 4. (optional) Document Attributes
    //
    document_header: ($) =>
      prec.right(
        seq(
          // Document Title
          $.document_title,
          // (optional) Comments
          optional($._comments),
          // (optional) Authors or Authors + (Comments) + Revision
          optional(
            seq(
              $.document_authors,
              optional(seq(optional($._comments), $.document_revision)),
            ),
          ),
          // (optional) Document Attributes
          optional($._document_attributes),
        ),
      ),

    // Document title
    document_title: ($) =>
      prec(
        2,
        seq($.document_title_marker, " ", $.document_title_content, $._newline),
      ),
    document_title_marker: (_) => prec(2, "="),
    document_title_content: ($) => $.inline,
    // Document authors
    document_authors: ($) => seq(/[^:=\n]/, $._line),
    // Document revision
    document_revision: ($) => seq(/[^:=\n]/, $._line),
    // Document attributes
    _document_attributes: ($) =>
      repeat1(choice($._comments, $.document_attribute, $.macro)),

    // ------------------------------------------------------------------------

    // Body
    document_body: ($) =>
      repeat1(
        choice(
          $._section,
          // alias(prec.right(repeat1($._block_not_section)), $.section),
          prec.right(repeat1($._block_not_section)),
        ),
      ),

    // ------------------------------------------------------------------------

    // Document Attributes
    // - https://docs.asciidoctor.org/asciidoc/latest/attributes/document-attributes/
    //
    // TODO:
    // - handling of incorrect attributes (e.g. missing last `:`)
    // - inline attributes `{...}`
    //
    // _attribute: ($) => choice($.attribute /*, $.no_attribute*/),
    document_attribute: ($) =>
      seq(
        ":",
        optional($.attribute_unset),
        $.attribute_name,
        ":",
        optional(seq(" ", $.attribute_value)),
        // optional($.attribute_value),
        $._newline,
      ),
    attribute_unset: (_) => "!",
    attribute_name: ($) => $._attribute_name,
    // attribute_value: ($) => repeat1($._char),
    attribute_value: ($) => $.inline,

    // ------------------------------------------------------------------------

    // Element Attributes
    // - https://docs.asciidoctor.org/asciidoc/latest/attributes/positional-and-named-attributes/
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

    element_attributes: ($) => $._attribute_list,

    // _attribute_list: (_) => token(seq("[", /[^\]\r\n]*/, "]", /\r?\n/)),

    _attribute_list: ($) =>
      seq(
        "[",
        optional(
          seq($._attribute_unparsed, repeat(seq(",", $._attribute_unparsed))),
        ),
        "]",
        // FIX: Problem: `[attribute]...` is recognized as an element_attribute,
        //      but should be an inline node.
        /[ \t]*/, // HACK: Workaround for `[attribute]...` / `[attribute] ...`
        $._newline,
      ),
    _attribute_unparsed: (_) => /[^,\]\r\n]+/,

    id_attributes: ($) => seq("[#", $._attribute_name, "]", $._newline),

    // ------------------------------------------------------------------------

    // Parts & Sections
    // - https://docs.asciidoctor.org/asciidoc/latest/sections/titles-and-levels/
    //
    // - part is a special section level 0

    _section: ($) =>
      choice(
        $.part,
        $.section_level1,
        $.section_level2,
        $.section_level3,
        $.section_level4,
        $.section_level5,
      ),

    part: ($) =>
      prec.right(
        seq(
          optional($.element_attributes),
          $.part_header,
          repeat(
            choice(
              choice(
                $.section_level1,
                $.section_level2,
                $.section_level3,
                $.section_level4,
                $.section_level5,
              ),
              $._block_not_section,
            ),
          ),
        ),
      ),

    section_level1: ($) =>
      prec.right(
        seq(
          optional($.element_attributes),
          alias($.section_level1_header, $.section_header),
          repeat(
            choice(
              choice(
                $.section_level2,
                $.section_level3,
                $.section_level4,
                $.section_level5,
              ),
              $._block_not_section,
            ),
          ),
        ),
      ),

    section_level2: ($) =>
      prec.right(
        seq(
          optional($.element_attributes),
          alias($.section_level2_header, $.section_header),
          repeat(
            choice(
              choice($.section_level3, $.section_level4, $.section_level5),
              $._block_not_section,
            ),
          ),
        ),
      ),

    section_level3: ($) =>
      prec.right(
        seq(
          optional($.element_attributes),
          alias($.section_level3_header, $.section_header),
          repeat(
            choice(
              choice($.section_level4, $.section_level5),
              $._block_not_section,
            ),
          ),
        ),
      ),

    section_level4: ($) =>
      prec.right(
        seq(
          optional($.element_attributes),
          alias($.section_level4_header, $.section_header),
          repeat(choice($.section_level5, $._block_not_section)),
        ),
      ),

    section_level5: ($) =>
      prec.right(
        seq(
          optional($.element_attributes),
          alias($.section_level5_header, $.section_header),
          repeat($._block_not_section),
        ),
      ),

    part_header: ($) =>
      prec(
        1,
        seq(
          alias($.section_level0_header_marker, $.part_header_marker),
          " ",
          alias($.section_header_content, $.part_header_content),
          $._newline,
        ),
      ),

    section_level1_header: ($) =>
      prec(
        1,
        seq(
          alias($.section_level1_header_marker, $.section_header_marker),
          " ",
          $.section_header_content,
          $._newline,
        ),
      ),

    section_level2_header: ($) =>
      prec(
        1,
        seq(
          alias($.section_level2_header_marker, $.section_header_marker),
          " ",
          $.section_header_content,
          $._newline,
        ),
      ),

    section_level3_header: ($) =>
      prec(
        1,
        seq(
          alias($.section_level3_header_marker, $.section_header_marker),
          " ",
          $.section_header_content,
          $._newline,
        ),
      ),

    section_level4_header: ($) =>
      prec(
        1,
        seq(
          alias($.section_level4_header_marker, $.section_header_marker),
          " ",
          $.section_header_content,
          $._newline,
        ),
      ),

    section_level5_header: ($) =>
      prec(
        1,
        seq(
          alias($.section_level5_header_marker, $.section_header_marker),
          " ",
          $.section_header_content,
          $._newline,
        ),
      ),

    section_level0_header_marker: (_) => "=",
    section_level1_header_marker: (_) => "==",
    section_level2_header_marker: (_) => "===",
    section_level3_header_marker: (_) => "====",
    section_level4_header_marker: (_) => "=====",
    section_level5_header_marker: (_) => "======",

    section_header_content: ($) => $.inline,

    // ------------------------------------------------------------------------

    _block_not_section: ($) =>
      prec.left(choice($._block_content, $.catch_unresolved)),

    _block_content: ($) =>
      repeat1(
        prec.left(
          choice(
            $._blank_lines,
            $._comments,
            $.document_attribute,
            $.id_attributes,
            $.page_break,
            $.break,
            $.conditional,
            $.admonition,
            // Blocks with context (e.g. title, attributes, etc.)
            $.context,
            // $.paragraph,
            // $.list,
            // $.table,
            // $.macro,
            // $._block,
            // Fallback for standalone context content (e.g. title, attributes, etc.).
            prec(-1, $.title),
            prec(-1, $.element_attributes),
          ),
        ),
      ),

    context: ($) =>
      seq(
        // repeat1(choice($.title, $.element_attributes)),
        repeat(choice($.title, $.element_attributes)),
        choice($.paragraph, $.list, $.table, $.macro, $._block),
      ),
    context_without_list: ($) =>
      seq(
        repeat(choice($.title, $.element_attributes)),
        choice($.paragraph, $.table, $.macro, $._block),
      ),

    // ------------------------------------------------------------------------

    // Comments
    // - https://docs.asciidoctor.org/asciidoc/latest/comments/

    // Comments are one big comment
    // comment: ($) => $._comments,

    // Multiple consecutive comments
    _comments: ($) => prec.right(repeat1($.comment)),

    // One comment type
    comment: ($) =>
      prec.left(
        choice($._comment_line, $._comment_block, $._comment_block_style),
      ),

    // Comment Types
    // Line style
    _comment_line: ($) => seq("//", choice($._newline, $._line)),
    // Block style
    _comment_block: ($) =>
      seq(
        token(seq("////", /\r?\n/)),
        repeat(prec.left(choice($._line, $._blank_lines))),
        token(seq("////", /\r?\n/)),
      ),
    // Open Block or Paragraph style
    _comment_block_style: ($) =>
      seq($._comment_attributes, $._newline, choice($.open_block, $.paragraph)),
    _comment_attributes: (_) => seq("[", "comment", "]"),

    // ------------------------------------------------------------------------

    // Breaks
    //
    // - `'''`
    // - Markdown: `---`, `- - -`, `***`,  `* * *`

    // Break
    break: ($) => seq($.break_marker, $._newline),
    break_marker: (_) => choice("'''", "---", "- - -", "***", "* * *"),

    // Page break
    page_break: ($) => seq($.page_break_marker, $._newline),
    page_break_marker: (_) => "<<<",

    // ------------------------------------------------------------------------

    // Macros
    macro: ($) =>
      seq(
        $.macro_name,
        "::",
        $.macro_target,
        seq("[", optional($.macro_attributes), "]"),
        $._newline,
      ),
    macro_name: (_) => choice("image", "audio", "video", "include", "plantuml"),
    // macro_name: ($) => $._macro_name, // FIX: Problem with other nodes start with chars.
    macro_target: (_) => /[^\[]+/,
    macro_attributes: (_) => /[^\]]+/,

    // ------------------------------------------------------------------------

    // Titles
    // - [x] Only recognize syntax
    // - [ ] Reference to the next block
    // title: ($) => seq(".", /[^\s]/, repeat($._char), $._newline),
    // title: ($) => seq(".", $._no_white_space, $._line),
    title: ($) => seq(".", $._line_start_without_space),

    // ------------------------------------------------------------------------

    // Blocks
    //
    // TODO:
    // - Source Code Block as a special Listing Block with a language attribute
    // - Also Markdown ``` Source Code Block?
    //
    _block: ($) =>
      seq(
        // optional($.element_attributes),
        choice(
          $.open_block,
          $.listing_block,
          $.literal_block,
          $.sidebar_block,
          $.example_block,
          $.pass_block,
        ),
      ),

    // ---------------------------------

    // Open Block (only block style)
    open_block: ($) =>
      prec.left(
        seq(
          alias($.open_block_marker, $.open_block_marker_start),
          optional($._block_content),
          alias($.open_block_marker, $.open_block_marker_end),
        ),
      ),
    open_block_marker: (_) => token(seq("--", /\r?\n/)),

    // ---------------------------------

    // Listing Block
    listing_block: ($) =>
      seq(
        choice($._listing_block, $._listing_block_style),
        repeat($.listing_callout),
      ),

    // Callout
    listing_callout: ($) => seq($.callout_marker, " ", $.callout_content),
    callout_content: ($) => prec.right(repeat1($._line_with_newline)),
    callout_marker: (_) => /<[0-9]+>/,

    // Block style
    _listing_block: ($) =>
      seq(
        optional($.source_attributes),
        alias($.listing_block_marker, $.listing_block_marker_start),
        optional($.listing_block_content),
        alias($.listing_block_marker, $.listing_block_marker_end),
      ),
    listing_block_marker: (_) => token(seq("----", /\r?\n/)),

    // TODO: Support multiple attributes (e.g. `[source,ruby,linenums]`)
    // TODO: Support attribute shorthands (https://docs.asciidoctor.org/asciidoc/latest/attributes/positional-and-named-attributes/#block-style-and-attribute-shorthand)
    source_attributes: ($) =>
      seq(
        "[",
        alias("source", $.source_attribute_name), //optional("source"),
        optional(
          seq(
            ",",
            optional($._white_space),
            field("language", $.attribute_name),
            optional($._white_space),
            repeat(seq(",", /[^,\]\n]*/)), // catch unresolved attributes
          ),
        ),
        "]",
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

    // ---------------------------------

    // Literal Block
    literal_block: ($) => choice($._literal_block, $._literal_block_style),

    // Block style
    _literal_block: ($) =>
      prec.left(
        seq(
          alias($.literal_block_marker, $.literal_block_marker_start),
          optional($.literal_block_content),
          alias($.literal_block_marker, $.literal_block_marker_end),
        ),
      ),
    literal_block_marker: (_) => token(seq("....", /\r?\n/)),

    // Open Block or Paragraph style
    _literal_block_style: ($) =>
      seq(
        alias($._literal_attributes, $.element_attributes),
        $._newline,
        choice($.open_block, $.paragraph),
      ),
    _literal_attributes: (_) => seq("[", "literal", "]"),

    // ---------------------------------

    // Sidebar
    sidebar_block: ($) => choice($._sidebar_block, $._sidebar_block_style),

    // Block style
    _sidebar_block: ($) =>
      prec.left(
        seq(
          alias($.sidebar_block_marker, $.sidebar_block_marker_start),
          optional($._block_content),
          alias($.sidebar_block_marker, $.sidebar_block_marker_end),
        ),
      ),
    sidebar_block_marker: (_) => token(seq("****", /\r?\n/)),

    // Open Block or Paragraph style
    _sidebar_block_style: ($) =>
      seq(
        alias($._sidebar_attributes, $.element_attributes),
        $._newline,
        choice($.open_block, $.paragraph),
      ),
    _sidebar_attributes: (_) => seq("[", "sidebar", "]"),

    // ---------------------------------

    // Example
    example_block: ($) => choice($._example_block, $._example_block_style),

    // Block style
    _example_block: ($) =>
      choice(
        $._example_block_level1,
        $._example_block_level2,
        $._example_block_level3,
        $._example_block_level4,
      ),

    // Level 1
    _example_block_level1: ($) =>
      prec.left(
        seq(
          alias($.example_block_level1_marker, $.example_block_marker_start),
          optional($._block_content),
          alias($.example_block_level1_marker, $.example_block_marker_end),
        ),
      ),
    example_block_level1_marker: (_) => token(seq("====", /\r?\n/)),

    // Level 2
    _example_block_level2: ($) =>
      prec.left(
        seq(
          alias($.example_block_level2_marker, $.example_block_marker_start),
          optional($._block_content),
          alias($.example_block_level2_marker, $.example_block_marker_end),
        ),
      ),
    example_block_level2_marker: (_) => token(seq("=====", /\r?\n/)),

    // Level 3
    _example_block_level3: ($) =>
      prec.left(
        seq(
          alias($.example_block_level3_marker, $.example_block_marker_start),
          optional($._block_content),
          alias($.example_block_level3_marker, $.example_block_marker_end),
        ),
      ),
    example_block_level3_marker: (_) => token(seq("======", /\r?\n/)),

    // Level 4
    _example_block_level4: ($) =>
      prec.left(
        seq(
          alias($.example_block_level4_marker, $.example_block_marker_start),
          optional($._block_content),
          alias($.example_block_level4_marker, $.example_block_marker_end),
        ),
      ),
    example_block_level4_marker: (_) => token(seq("=======", /\r?\n/)),

    // Open Block or Paragraph style
    _example_block_style: ($) =>
      seq(
        alias($._example_attributes, $.element_attributes),
        $._newline,
        choice($.open_block, $.paragraph),
      ),
    _example_attributes: (_) => seq("[", "example", "]"),

    // ---------------------------------

    // Passthrough
    pass_block: ($) => choice($._pass_block, $._pass_block_style),

    // Block style
    _pass_block: ($) =>
      prec.left(
        seq(
          alias($.pass_block_marker, $.pass_block_marker_start),
          optional($._block_content),
          alias($.pass_block_marker, $.pass_block_marker_end),
        ),
      ),
    pass_block_marker: (_) => token(seq("++++", /\r?\n/)),

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

    paragraph: ($) => $._lines,

    // ------------------------------------------------------------------------

    // Lists
    // - https://docs.asciidoctor.org/asciidoc/latest/lists/unordered/
    //
    // TODO:
    // - [x] Identify a simple list line
    // - [x] Don't recognize `+**.*` as list marker
    // - [x] List with list items
    // - [ ] Nested list items context

    list: ($) => prec.right(repeat1($.list_item)),

    list_item: ($) => seq($.list_item_marker, $.list_item_content),

    list_item_marker: (_) =>
      token(seq(choice(/[-]+/, /[*]+/, /[.]+/, /[0-9]+./), " ")),
    // list_item_marker: (_) =>
    //   token(seq(/[ ]*/, choice(/[-]+/, /[*]+/, /[.]+/), " ")),

    list_item_content: ($) =>
      seq($._lines, repeat($._list_continuation_content)),

    _list_continuation_content: ($) =>
      seq(
        $.list_continuation_marker,
        choice(
          alias($.context_without_list, $.context),
          $.admonition,
          $.id_attributes,
        ),
      ),

    list_continuation_marker: (_) => choice("+\n", "+\r\n"),

    // ------------------------------------------------------------------------

    // Description Lists
    // - https://docs.asciidoctor.org/asciidoc/latest/lists/description/

    // description_list: ($) =>
    // description_list_marker: (_) => choice(/::/, /:::/, /::::/, /;;/),

    // ------------------------------------------------------------------------

    // Admonitions

    // admonition: ($) =>
    //   choice(
    //     $.admonition_note,
    //     $.admonition_tip,
    //     $.admonition_important,
    //     $.admonition_caution,
    //     $.admonition_warning,
    //   ),

    admonition: ($) => choice($._admonition_line, $._admonition_block_style),

    // Line
    _admonition_line: ($) => seq($.admonition_marker, ":", $._lines),

    // Example Block, Open Block or Paragraph style
    _admonition_block_style: ($) =>
      seq(
        $.admonition_attributes,
        optional($.title),
        choice($.example_block, $.open_block, $.paragraph),
      ),

    admonition_attributes: ($) =>
      seq("[", $.admonition_marker, "]", $._newline),

    admonition_marker: (_) =>
      choice("NOTE", "TIP", "IMPORTANT", "CAUTION", "WARNING"),

    // ------------------------------------------------------------------------

    // Conditionals
    // - https://docs.asciidoctor.org/asciidoc/latest/directives/conditionals/
    //
    // TODO:
    // - [ ] Support single line and block style

    conditional: ($) =>
      choice($._conditional_simple, $._conditional_ifeval_simple),
    // conditional: ($) => choice($.conditional_block, $.conditional_line),

    // ifdef, ifndef, endif
    _conditional_simple: ($) =>
      seq(
        $.conditional_name,
        "::",
        optional($._conditional_attributes),
        alias("[", $.conditional_bracket),
        optional($.conditional_content),
        alias("]", $.conditional_bracket),
        $._newline,
      ),
    conditional_name: (_) => choice("ifdef", "ifndef", "endif"),
    conditional_content: (_) => /[^\]\n]+/,

    // ifeval
    _conditional_ifeval_simple: ($) =>
      seq(
        alias("ifeval", $.conditional_name),
        "::",
        optional($._conditional_attributes),
        alias("[", $.conditional_bracket),
        optional($.conditional_condition),
        alias("]", $.conditional_bracket),
        $._newline,
      ),
    conditional_condition: ($) =>
      seq(
        optional($._white_space),
        $.conditional_condition_part,
        optional($._white_space),
        $.conditional_condition_operator,
        optional($._white_space),
        $.conditional_condition_part,
        optional($._white_space),
      ),
    // conditional_condition_part: (_) => /[^=!><\]\n]+/,
    conditional_condition_part: (_) => choice(/"[^\"\]\n]+"/, /[^=!><\]\n]+/),
    conditional_condition_operator: (_) =>
      choice("==", "!=", ">", "<", ">=", "<="),

    // single line
    // conditional_line: ($) =>
    //   seq(
    //     $.conditional_start,
    //     "::",
    //     $.conditional_attributes,
    //     /\[[^\]\n]*\]/,
    //     $._newline,
    //   ),

    // block style
    // conditional_block: ($) =>
    //   prec(
    //     1,
    //     seq(
    //       $.conditional_start,
    //       "::",
    //       $.conditional_attributes,
    //       "[]",
    //       $._newline,
    //       optional($._block_content),
    //       $.conditional_end,
    //       "::",
    //       optional($.conditional_attributes),
    //       "[]",
    //       $._newline,
    //     ),
    //   ),

    // conditional_start: (_) => choice("ifdef", "ifndef"),
    // conditional_end: (_) => "endif",
    _conditional_attributes: ($) =>
      repeat1(
        seq(
          alias($._attribute_name, $.attribute_name),
          optional($.conditional_attribute_separator),
        ),
      ),
    conditional_attribute_separator: (_) => /[,+]/,

    // ------------------------------------------------------------------------

    // Tables
    // - https://docs.asciidoctor.org/asciidoc/latest/tables/build-a-basic-table/

    // TODO:
    // - [ ] inline cell specifier operators
    // - [ ] line continuation for table cells

    table: ($) =>
      seq(
        alias($.table_marker, $.table_marker_start),
        repeat(choice(seq(repeat1($.table_cell), $._newline), $._blank_line)),
        alias($.table_marker, $.table_marker_end),
      ),

    table_cell: ($) =>
      seq(
        $.table_cell_marker,
        repeat($._white_space),
        $.table_cell_content,
        repeat($._white_space),
      ),

    table_marker: (_) => token(seq("|===", /\r?\n/)),

    table_cell_marker: ($) => seq($._table_cell_marker_operator, "|"),
    _table_cell_marker_operator: (_) => /[0-9.+*a<^>]*/,

    table_cell_content: (_) => /[^|\n]*/,

    // ------------------------------------------------------------------------

    // Other body parts (blocks)
    //

    // ------------------------------------------------------------------------

    // Catches the unresolved rest
    catch_unresolved: (_) => token(prec(-10, /.*/)),

    // ------------------------------------------------------------------------

    _lines: ($) => prec.right(repeat1($._line)),

    _line: ($) => seq($.inline, $._newline),

    inline: ($) => repeat1($._char),

    _line_start_without_space: ($) =>
      seq(alias($._inline_start_without_space, $.inline), $._newline),
    _inline_start_without_space: ($) => seq($._no_white_space, repeat($._char)),

    _blank_lines: ($) => repeat1($._blank_line),
    _blank_line: ($) => seq($._newline),

    // FIX: Currently only a workaround for the problem with the ` +` line continuation.
    _line_with_newline: ($) =>
      choice(
        $._newline,
        seq(alias(/[^\n+ ]+/, $.inline), $._line_with_newline),
        seq(alias(/[ +]/, $.inline), $._line_with_newline),
        seq($.line_continuation_marker, $._line_with_newline),
      ),
    line_continuation_marker: (_) => " +\n",

    _char: (_) => /[^\n]/,

    _newline: (_) => /\r?\n/,
    // _newline: (_) => /[ \t]*\r?\n/,
    _white_space: (_) => /[ \t]+/, // TODO: Use instead of `" "`?
    _no_white_space: (_) => /[^ \t]/,

    _attribute_name: (_) => /[a-zA-Z0-9_][a-zA-Z0-9_-]*/,
    _macro_name: (_) => /[a-zA-Z0-9][a-zA-Z0-9-]*/,

    // _x: (_) => token.immediate(' '),
  },
});
