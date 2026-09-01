# Rule Coverage

<!--toc:start-->

- [Basic](#basic)
- [Checklist](#checklist)
- [Rules](#rules)
- [Document structure](#document-structure)
  - [Document Header](#document-header)
  - [Document Body](#document-body)
- [Elements](#elements)
  - [Parts & Sections](#parts-sections)
  - [Content](#content)

<!--toc:end-->

## Basic

- [x] Lines
- [x] Blank lines
- [x] Paragraphs
- [ ] Blocks with title, attributes, anchor
- [ ] Inline elements
- [ ] Nested Blocks (like example_block inside example_block)
- [ ] Extended lines with `\` on the end

## Checklist

- [AsciiDoc Language Documentation](https://docs.asciidoctor.org/asciidoc/latest/)

Not everything is relevant to grammar.

| State | State | Rule                                        | Note                   |
| :---: | :---: | ------------------------------------------- | ---------------------- |
|  🟢   |       | **Document Structure**                      |                        |
|  🔴   |       | **Blocks**                                  |                        |
|  🟡   |       | **Document Attributes**                     |                        |
|  🟡   |       | **Element Attributes**                      |                        |
|  🟢   |       | **Document Header**                         |                        |
|       |  🟡   | - Document Title                            |                        |
|       |  🟡   | - Author Information                        |                        |
|       |  🟡   | - Revision Information                      |                        |
|  ❌   |       | ~~Document Metadata~~                       | -> Document Attributes |
|  ❌   |       | ~~Document Type~~                           |                        |
|  🟢   |       | **Sections**                                |                        |
|       |  🟢   | - Parts                                     |                        |
|       |  🟢   | - Sections Level 1 bis 5                    |                        |
|  🟡   |       | **Paragraphs**                              |                        |
|  ❌   |       | ~~Discrete Headings~~                       | -> Element Attributes  |
|  🟢   |       | **Breaks**                                  |                        |
|       |  🟢   | - Thematic Breaks                           |                        |
|       |  🟢   | - Page Breaks                               |                        |
|  🔴   |       | **Text Formatting and Punctuation**         |                        |
|  🟠   |       | **Lists**                                   |                        |
|       |  🟡   | - Unordered Lists                           |                        |
|       |  🟡   | - Ordered Lists                             |                        |
|       |  🔴   | - Checklists                                |                        |
|  🔴   |       | **Description Lists**                       |                        |
|       |  🔴   | - Horizontal Description List               |                        |
|       |  🔴   | - Question and Answer Lists                 |                        |
|       |  🔴   | - Description Lists With Marker             |                        |
|  🔴   |       | **Links**                                   |                        |
|       |  🔴   | - URL Macro                                 |                        |
|       |  🔴   | - Link Macro                                |                        |
|       |  🔴   | - Mailto Macro                              |                        |
|  🔴   |       | **Cross References**                        |                        |
|  🔴   |       | **Footnotes**                               |                        |
|  🟠   |       | **Images**                                  |                        |
|       |  🟡   | - Block image macro                         |                        |
|       |  🔴   | - Inline image macro                        |                        |
|  🟡   |       | **Audio and Video**                         |                        |
|  🔴   |       | **Icons**                                   |                        |
|       |  🔴   | - Icon Macro                                |                        |
|  🔴   |       | **Keyboard Macro**                          |                        |
|  🔴   |       | **Button and Menu UI Macros**               |                        |
|  🟢   |       | **Admonitions**                             |                        |
|       |  🟢   | - One Line                                  |                        |
|       |  🟢   | - Multi Line                                |                        |
|       |  🟢   | - Block notation                            |                        |
|  🟢   |       | **Sidebars**                                |                        |
|  🟢   |       | **Example Blocks**                          |                        |
|  🔴   |       | **Blockquotes**                             |                        |
|  🔴   |       | **Verses**                                  |                        |
|  🟠   |       | **Verbatim and Source Blocks**              |                        |
|       |  🔴   | - Source Code Blocks                        |                        |
|       |  🟢   | - Listing Blocks                            |                        |
|       |  🟢   | - Literal Blocks                            |                        |
|       |  🟡   | - Callouts                                  |                        |
|  🟡   |       | **Tables**                                  |                        |
|  🔴   |       | **Equations and Formulas (STEM)**           |                        |
|  🟢   |       | **Open Blocks**                             |                        |
|  🔴   |       | **Collapsible Blocks**                      |                        |
|  🟢   |       | **Comments**                                |                        |
|       |  🟢   | - Comment Line                              |                        |
|       |  🟢   | - Comment Block                             |                        |
|       |  🟢   | - Comment Open Block Style                  |                        |
|       |  🟢   | - Comment Paragraph Style                   |                        |
|  ❌   |       | ~~Automatic Table of Contents~~             |                        |
|  ❌   |       | ~~Docinfo Files~~                           |                        |
|  🟠   |       | **Includes**                                |                        |
|       |  🟡   | - Include Block Macro                       |                        |
|       |  🔴   | - Include Inline Macro                      |                        |
|  🟡   |       | **Conditionals**                            |                        |
|       |  🟡   | - `ifdef` and `ifndef` Directives (`endif`) |                        |
|       |  🟡   | - `ifeval` Directive                        |                        |
|  🔴   |       | **Substitutions**                           |                        |
|  🟠   |       | **Passthroughs**                            |                        |
|       |  🟢   | - Passthrough Blocks                        |                        |
|       |  🔴   | - Inline Passthroughs                       |                        |
|  ❌   |       | ~~Reference~~                               |                        |
|  🟡   |       | **plantuml**                                |                        |

<!-- - Introduction -->
<!--   - [ ] Document Structure -->
<!--     - Lines, Blocks, Text and Inline elements, -->
<!--   - Key Concepts (Document, Elements, Attributes, Macros) -->
<!-- - [ ] Blocks -->
<!-- - [ ] Document Attributes -->
<!-- - [ ] Element Attributes -->
<!-- - [ ] Document Header -->
<!--   - [ ] Document Title -->
<!--   - [ ] Author Information -->
<!--   - [ ] Revision Information -->
<!--   - ~~Document Metadata~~ -> Document Attributes -->
<!-- - ~~Document Type~~ -->
<!-- - [ ] Sections -->
<!--   - [ ] Parts -->
<!--   - [ ] Sections Level 1 bis 5 -->
<!-- - [ ] Paragraphs -->
<!-- - [ ] Discrete Headings -->
<!-- - [ ] Breaks -->
<!--   - [ ] Thematic Breaks -->
<!--   - [ ] Page Breaks -->
<!-- - [ ] Text Formatting and Punctuation -->
<!-- - [ ] Lists -->
<!--   - [ ] Unordered Lists -->
<!--   - [ ] Ordered Lists -->
<!--   - [ ] Checklists -->
<!-- - [ ] Description Lists -->
<!--   - [ ] Horizontal Description List -->
<!--   - [ ] Question and Answer Lists -->
<!--   - [ ] Description Lists With Marker -->
<!-- - [ ] Links -->
<!--   - [ ] URL Macro -->
<!--   - [ ] Link Macro -->
<!--   - [ ] Mailto Macro -->
<!-- - [ ] Cross References -->
<!-- - [ ] Footnotes -->
<!-- - [ ] Images -->
<!--   - [ ] Block image macro -->
<!--   - [ ] Inline image macro -->
<!-- - [ ] Audio and Video -->
<!-- - [ ] Icons -->
<!--   - [ ] Icon Macro -->
<!-- - [ ] Keyboard Macro -->
<!-- - [ ] Button and Menu UI Macros -->
<!-- - [ ] Admonitions -->
<!-- - [ ] Sidebars -->
<!-- - [ ] Example Blocks -->
<!-- - [ ] Blockquotes -->
<!-- - [ ] Verses -->
<!-- - [ ] Verbatim and Source Blocks -->
<!--   - [ ] Source Code Blocks -->
<!--   - [ ] Listing Blocks -->
<!--   - [ ] Literal Blocks -->
<!--   - [ ] Callouts -->
<!-- - [ ] Tables -->
<!-- - [ ] Equations and Formulas (STEM) -->
<!-- - [ ] Open Blocks -->
<!-- - [ ] Collapsible Blocks -->
<!-- - [ ] Comments -->
<!--   - [ ] Comment Line -->
<!--   - [ ] Comment Block -->
<!--   - [ ] Comment Open Block Style -->
<!--   - [ ] Comment Paragraph Style -->
<!-- - ~~Automatic Table of Contents~~ -->
<!-- - ~~Docinfo Files~~ -->
<!-- - [ ] Includes -->
<!-- - [ ] Conditionals -->
<!--   - [ ] `ifdef` and `ifndef` Directives (`endif`) -->
<!--   - [ ] `ifeval` Directive -->
<!-- - [ ] Substitutions -->
<!-- - [ ] Passthroughs -->
<!--   - [ ] Passthrough Blocks -->
<!--   - [ ] Inline Passthroughs -->
<!-- - ~~Reference~~ -->

## Rules

### Document structure

```lisp
(document
  (document_header
    (document_title)
    (document_authors)
    (document_revision)
    (document_attribute)
    ...)
  (document_body
    ...))
```

#### Document Header

- [x] Document Title

  ```lisp
  (document_title)
  ```

- [ ] Author Information

  - [x] Authors Line

  ```lisp
  (document_authors)
  ```

- [x] Revision Information

  ```lisp
  (document_revision)
  ```

- [x] Document Attributes
- [x] Comments

#### Document Body

- ...

### Elements

#### Parts & Sections

- [x] Parts

  ```lisp
  (part)
    (part_header
      (part_header_marker)
      (part_header_content)))
  ```

- [x] Sections Level 1 bis 5

  ```lisp
  (section_level1
    (section_header
      (section_header_marker)
      (section_header_content)))
  ```

  - [x] Nested Sections Level

    ```lisp
      (section_level1
        (section_header
          (section_header_marker)
          (section_header_content))
        (section_level2
          (section_header
            (section_header_marker)
            (section_header_content))))
    ```

#### Content

- [x] Document Attributes

  ```lisp
  (document_attribute
    (attribute_name)
    (attribute_value))
  ```

- [ ] Element Attributes

  - [x] Line

    ```lisp
    (element_attributes
      (_attribute_list
        (_attribute_unparsed
        ...)))
    ```

- [x] Paragraphs

  ```lisp
  (paragraph_context
    (paragraph
      (inline)))
  ```

- [x] Breaks

  - [x] Thematic Breaks

    ```lisp
    (break)
    ```

  - [x] Page Breaks

    ```lisp
    (page_break)
    ```

- [ ] Text Formatting and Punctuation
  - [ ] ...
- [ ] Lists
  - [x] Simple identification of list lines

    ```lisp
    (list_context
      (list
        (list_item
          (list_item_marker)
          (list_item_content
            (inline)))))
    ```

  - [ ] Unordered Lists
  - [ ] Ordered Lists
  - [ ] Checklists
- [ ] Description Lists
  - [ ] Horizontal Description List
  - [ ] Question and Answer Lists
  - [ ] Description Lists With Marker
- [ ] Links
- [ ] Cross References
- [ ] Footnotes
- [ ] Images

  - [x] Block Image Macro

    ```lisp
    (macro_context
      (macro
        (macro_name)
        (macro_target)
        (macro_attributes)))
    ```

  - [ ] Inline Image Macro

- [ ] Audio and Video
- [ ] Icons
- [ ] Keyboard Macro
- [ ] Button and Menu UI Macros
- [x] Admonitions
  - [x] One Line
  - [x] Multi Line
  - [x] Block notation
- [x] Sidebars

  <table><tr><td>

  ```asciidoc
  ****
  Lorem ipsum
  ****
  ```

  </td><td>

  ```lisp
  (block_context
    (sidebar_block
      (sidebar_block_marker_start)
      (sidebar_block_marker_end)))
  ```

  </td></tr><tr><td>

  ```asciidoc
  [sidebar]
  --
  Lorem ipsum
  --
  ```

  </td><td>

  ```lisp
  (block_context
    (sidebar_block
      (element_attributes)
      (open_block
        (open_block_marker_start)
        (open_block_marker_end))))
  ```

  </td></tr><tr><td>

  ```asciidoc
  [sidebar]
  Lorem ipsum
  ```

  </td><td>

  ```lisp
  (block_context
    (sidebar_block
      (element_attributes)
      (paragraph
        (inline))))
  ```

  </td></tr></table>

- [x] Example Blocks

  <table><tr><td>

  ```asciidoc
  ====
  Lorem ipsum
  ====
  ```

  </td><td>

  ```lisp
  (block_context
    (example_block
      (example_block_marker_start)
      (paragraph_context
        (paragraph
          (inline)))
      (example_block_marker_end)))
  ```

  </td></tr><tr><td>

  ```asciidoc
  [example]
  --
  Lorem ipsum
  --
  ```

  </td><td>

  ```lisp
  (block_context
    (example_block
      (element_attributes)
      (open_block
        (open_block_marker_start)
        (open_block_marker_end))))
  ```

  </td></tr><tr><td>

  ```asciidoc
  [example]
  Lorem ipsum
  ```

  </td><td>

  ```lisp
  (block_context
    (example_block
      (element_attributes)
      (paragraph
        (inline))))
  ```

  </td></tr></table>

- [ ] Blockquotes
- [ ] Verses
- [ ] Verbatim and Source Blocks

  - [ ] Source Code Blocks
  - [x] Listing Blocks

    <table><tr><td>

    ```asciidoc
    [source,c]
    ----
    printf("Hello, World!");
    ----
    ```

    </td><td>

    ```lisp
    (block_context
      (listing_block
        (source_attributes
          (source_attribute_name)
          language: (attribute_name))
        (listing_block_marker_start)
        (listing_block_content)
        (listing_block_marker_end)))
    ```

    </td></tr><tr><td>

    ```asciidoc
    ----
    printf("Hello, World!");
    ----
    ```

    </td><td>

    ```lisp
    (block_context
      (listing_block
        (listing_block_marker_start)
        (listing_block_content)
        (listing_block_marker_end)))
    ```

    </td></tr><tr><td>

    ```asciidoc
    [listing]
    --
    printf("Hello, World!");
    --
    ```

    </td><td>

    ```lisp
    (block_context
      (listing_block
        (element_attributes)
        (open_block
          (open_block_marker_start)
          (paragraph_context
            (paragraph
              (inline)))
          (open_block_marker_end))))
    ```

    </td></tr><tr><td>

    ```asciidoc
    [listing]
    printf("Hello, World!");
    ```

    </td><td>

    ```lisp
    (block_context
      (listing_block
        (element_attributes)
        (paragraph
          (inline))))
    ```

    </td></tr></table>

  - [x] Literal Blocks

    <table><tr><td>

    ```asciidoc
    ....
    Lorem ipsum
    ....
    ```

    </td><td>

    ```lisp
    (block_context
      (literal_block
        (literal_block_marker_start)
        (literal_block_content)
        (literal_block_marker_end)))
    ```

    </td></tr><tr><td>

    ```asciidoc
    [literal]
    --
    Lorem ipsum
    --
    ```

    </td><td>

    ```lisp
    (block_context
      (literal_block
        (element_attributes)
        (open_block
          (open_block_marker_start)
          (paragraph_context
            (paragraph
              (inline)))
          (open_block_marker_end))))
    ```

    </td></tr><tr><td>

    ```asciidoc
    [literal]
    Lorem ipsum
    ```

    </td><td>

    ```lisp
    (block_context
      (literal_block
        (element_attributes)
        (paragraph
          (inline))))
    ```

    </td></tr></table>

  - [x] Callouts

- [x] Tables
- [ ] Equations and Formulas (STEM)
- [x] Open Blocks

  <table><tr><td>

  ```asciidoc
  --
  Lorem ipsum
  --
  ```

  </td><td>

  ```lisp
  (block_context
    (open_block
      (open_block_marker_start)
      (paragraph_context
        (paragraph
          (inline)))
      (open_block_marker_end)))
  ```

  </td></tr></table>

- [ ] Collapsible Blocks
- [x] Comments

  - [x] Comment Line

    ```lisp
    (comment
      (_comment_line))
    ```

  - [x] Comment Block

    ```lisp
    (comment
      (_comment_block))
    ```

  - [x] Comment Open Block Style

    ```lisp
    (comment
      (_comment_attributes)
      (open_block))
    ```

  - [x] Comment Paragraph Style

    ```lisp
    (comment
      (_comment_attributes)
      (paragraph))
    ```

- [ ] Includes

  - [x] Include Block Macro

  - [ ] Include Inline Macro

- [ ] Conditionals
  - [x] Simple per line (ifdef, ifndef, ifeval, endif)

- [ ] Passthroughs
  - [x] Passthrough Blocks

    <table><tr><td>

    ```asciidoc
    ++++
    Lorem ipsum
    ++++
    ```

    </td><td>

    ```lisp
    (block_context
    (pass_block
      (pass_block_marker_start)
      (paragraph_context
        (paragraph
          (inline)))
      (pass_block_marker_end)))
    ```

    </td></tr><tr><td>

    ```asciidoc
    [pass]
    Lorem ipsum
    ```

    </td><td>

    ```lisp
    (block_context
    (pass_block
      (element_attributes)
      (paragraph
        (inline))))
    ```

    </td></tr></table>

  - [ ] Inline Passthroughs
