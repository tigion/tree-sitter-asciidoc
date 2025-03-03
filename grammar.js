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

  extras: (_) => [],
  // extras: ($) => [$._comment],
  // extras: (_) => ["\n"],
  // extras: (_) => [
  //   // $._comment,
  //   // /\s/,
  //   "\n",
  //   // /\n/,
  // ],

  conflicts: ($) => [[$.document_header], [$._block_not_section]],

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
    // document_title: ($) => prec(2, seq("= ", repeat1($._char), $._newline)),
    document_title: ($) =>
      prec(
        2,
        seq($.document_title_marker, " ", $.document_title_content, $._newline),
      ),
    document_title_marker: (_) => prec(2, "="),
    document_title_content: ($) => $._inner_line,
    // Document authors
    // document_authors: ($) => seq(/[^:=\n]/, repeat1($._char), $._newline),
    document_authors: ($) => seq(/[^:=\n]/, $._line),
    // Document revision
    // document_revision: ($) => seq(/[^:=\n]/, repeat1($._char), $._newline),
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
    attribute_value: ($) => $._inner_line,

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
          alias($.section_level4_header, $.section_header),
          repeat(choice($.section_level5, $._block_not_section)),
        ),
      ),
    section_level5: ($) =>
      prec.right(
        seq(
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
          // " ",
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

    //
    section_level0_header_marker: (_) => "=",
    section_level1_header_marker: (_) => "==",
    section_level2_header_marker: (_) => "===",
    section_level3_header_marker: (_) => "====",
    section_level4_header_marker: (_) => "=====",
    section_level5_header_marker: (_) => "======",

    // section_header_content: ($) => repeat1($._char),
    section_header_content: ($) => $._inner_line,

    // ------------------------------------------------------------------------

    _block_not_section: ($) =>
      prec.left(
        choice(
          $._blank_lines,
          $._comments,
          $.document_attribute,
          $.element_attributes,
          $.page_break,
          $.break,
          $.macro,
          $.title,
          $._block,
          $.paragraph,
          $.list,
          $.list_continuation_marker,
          $.admonition,
          $.catch_unresolved,
        ),
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
    // _comment_line: ($) => seq("//", $._x_line),
    _comment_line: ($) => seq("//", $._line),
    // Block style
    _comment_block: ($) =>
      seq(
        "////",
        $._newline,
        // repeat(prec.left(choice($._x_line, $._blank_lines))),
        repeat(prec.left(choice($._line, $._blank_lines))),
        "////",
        $._newline,
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
    //
    break: ($) => seq($.break_marker, $._newline),
    break_marker: (_) => choice("'''", /- ?- ?-/, /\* ?\* ?\*/),
    page_break: ($) => seq($.page_break_marker, $._newline),
    page_break_marker: (_) => "<<<",

    // ------------------------------------------------------------------------

    // Macros
    macro: ($) =>
      seq(
        alias($.macro_name, $.name),
        "::",
        alias($.macro_target, $.target),
        seq("[", optional(alias($.macro_attributes, $.attributes)), "]"),
        $._newline,
      ),
    macro_name: (_) => choice("image", "include"),
    // macro_name: ($) => $._macro_name, // FIX: Problem with other nodes start with chars.
    macro_target: (_) => /[^\[]+/,
    macro_attributes: (_) => /[^\]]+/,

    // ------------------------------------------------------------------------

    // Titles
    // - [x] Only recognize syntax
    // - [ ] Reference to the next block
    // title: ($) => seq(".", /[^\s]/, repeat($._char), $._newline),
    title: ($) => seq(".", $._no_white_space, $._line),

    // ------------------------------------------------------------------------

    // Blocks
    //
    // TODO:
    // - Source Code Block as a special Listing Block with a language attribute
    // - Also Markdown ``` Source Code Block?
    // - Currently is only one nesting for example_block supported.
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

    // TODO: WIP
    //
    // _block_content: ($) => repeat1($._not_block),
    _block_content: ($) =>
      repeat1(
        prec.left(
          choice(
            $._blank_lines,
            $._comments,
            $.document_attribute,
            $.element_attributes,
            $.page_break,
            $.break,
            $.macro,
            $.title,
            $._block,
            $.paragraph,
            $.list,
            $.list_continuation_marker,
            $.admonition,
            // $.catch_unresolved, // WARNING: This freezes Neovim with input `--`
          ),
        ),
      ),

    // Open Block with block style
    open_block: ($) =>
      prec.left(
        seq(
          alias("--\n", $.open_block_marker_start),
          optional($._block_content),
          alias("--\n", $.open_block_marker_end),
        ),
      ),

    // Listing
    listing_block: ($) =>
      seq(
        choice($._listing_block, $._listing_block_style),
        repeat($.listing_callout),
      ),
    listing_callout: ($) => seq($.callout, " ", $._line_with_newline),
    // listing_callout: ($) => seq($.callout, " ", repeat1($._char), $._newline),
    callout: (_) => /<[0-9]+>/,
    // Block style
    _listing_block: ($) =>
      prec.left(
        seq(
          alias("----\n", $.listing_block_marker_start),
          alias(optional($._block_content), $.listing_block_content),
          alias("----\n", $.listing_block_marker_end),
        ),
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
      prec.left(
        seq(
          alias("....\n", $.literal_block_marker_start),
          optional($._block_content),
          alias("....\n", $.literal_block_marker_end),
        ),
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
      prec.left(
        seq(
          alias("****\n", $.sidebar_block_marker_start),
          optional($._block_content),
          alias("****\n", $.sidebar_block_marker_end),
        ),
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
      prec.left(
        seq(
          alias("====\n", $.example_block_marker_start),
          repeat(
            prec.left(
              choice(
                $._block_content,
                alias($._example_block_level2, $.example_block),
              ),
            ),
          ),
          alias("====\n", $.example_block_marker_end),
        ),
      ),
    _example_block_level2: ($) =>
      seq(
        alias("=====\n", $.example_block_marker_start),
        optional($._block_content),
        alias("=====\n", $.example_block_marker_end),
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
      prec.left(
        seq(
          alias("++++\n", $.pass_block_marker_start),
          optional($._block_content),
          alias("++++\n", $.pass_block_marker_end),
        ),
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
    paragraph: ($) => prec.right(repeat1($._line)),
    // paragraph: ($) => prec.right(repeat1(alias($._line, $.line))),

    // ------------------------------------------------------------------------

    // Lists
    // - https://docs.asciidoctor.org/asciidoc/latest/lists/unordered/
    //
    // TODO:
    // - [x] Identify a simple list line
    // - [x] Don't recognize `+**.*` as list marker
    // - [ ] List with list items
    // - [ ] Nested list items

    // list: ($) => seq(repeat1($.list_item), $._newline),
    list: ($) => $._list_item,
    _list_item: ($) =>
      seq(alias($.list_marker, $.marker), $._list_content, $._newline),
    list_marker: (_) =>
      token(seq(choice(/[-]+/, /[*]+/, /[.]+/, /[0-9]+./), " ")),
    // list_marker: (_) => token(seq(/[ ]*/, choice(/[-]+/, /[*]+/, /[.]+/), " ")),

    // _list_content: ($) => repeat1($._char),
    _list_content: ($) => $._inner_line,

    // ------------------------------------------------------------------------

    // List Continuation
    //
    // TODO:
    // - [x] Identify a simple `+` line
    // - [ ] Context?

    list_continuation_marker: (_) => "+\n",

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
    _admonition_line: ($) => seq($.admonition_marker, ":", $._line),

    // Example Block, Open Block or Paragraph style
    _admonition_block_style: ($) =>
      seq(
        alias($.admonition_attributes, $.element_attributes),
        $._newline,
        choice($.example_block, $.open_block, $.paragraph),
      ),
    admonition_attributes: ($) => seq("[", $.admonition_marker, "]"),

    admonition_marker: (_) =>
      choice("NOTE", "TIP", "IMPORTANT", "CAUTION", "WARNING"),

    // ------------------------------------------------------------------------

    // Other body parts (blocks)
    //
    // TODO: code block, table, blocks, ...
    //

    // ------------------------------------------------------------------------

    // Catches the unresolved rest
    catch_unresolved: (_) => token(prec(-10, /.*/)),

    // ------------------------------------------------------------------------

    _x_line: ($) =>
      choice(
        // seq(":", /[^:\n]*/, optional(seq(":", optional($._char))), $._newline), // incorrect attributes
        // seq(
        //   ":",
        //   alias($.attribute_name, $._off_todo),
        //   ":",
        //   repeat1($._char),
        //   $._newline,
        // ),

        // seq("[[", repeat($._char), optional("]"), optional("]"), $._newline),
        // seq("[", repeat($._char), $._newline),

        seq(repeat1($._char), $._newline),
        // $._line_with_newline,
      ),

    _line: ($) => seq($._inner_line, $._newline),
    _inner_line: ($) => repeat1($._char),

    _blank_lines: ($) => repeat1($._blank_line),
    _blank_line: ($) => seq($._newline),

    // FIX: Currently only a workaround for the problem with the ` +` line continuation.
    _line_with_newline: ($) =>
      choice(
        $._newline,
        seq(/[^\n+ ]+/, $._line_with_newline),
        seq(/[ +]/, $._line_with_newline),
        seq($.line_continuation_marker, $._line_with_newline),
      ),
    line_continuation_marker: (_) => " +\n",

    _char: (_) => /[^\n]/,

    _newline: (_) => /\r?\n/,
    _white_space: (_) => /[ \t]+/, // TODO: Use instead of `" "`?
    _no_white_space: (_) => /[^ \t]/,

    _attribute_name: (_) => /[a-zA-Z0-9_][a-zA-Z0-9_-]*/,
    _macro_name: (_) => /[a-zA-Z0-9][a-zA-Z0-9-]*/,

    // _x: (_) => token.immediate(' '),
  },
});
