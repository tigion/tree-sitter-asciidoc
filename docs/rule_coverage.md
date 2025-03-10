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
  (paragraph)
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
    (macro
      (name)
      (target))
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

  ```lisp
  (sidebar_block)
  ```

  ```lisp
  (sidebar_block
    (element_attributes)
    (open_block/paragraph))
  ```

- [x] Example Blocks

  ```lisp
  (example_block)
  ```

  ```lisp
  (example_block
    (element_attributes)
    (open_block/paragraph))
  ```

- [ ] Blockquotes
- [ ] Verses
- [ ] Verbatim and Source Blocks

  - [ ] Source Code Blocks
  - [x] Listing Blocks

    ```lisp
    (listing_block)
    ```

    ```lisp
    (listing_block
      (element_attributes)
      (open_block/paragraph))
    ```

  - [x] Literal Blocks

    ```lisp
    (literal_block)
    ```

    ```lisp
    (literal_block
      (element_attributes)
      (open_block/paragraph))
    ```

  - [x] Callouts

    ```lisp
    (listing_block
      (listing_block_marker_start)
      (listing_block_content
        (block_content
          (paragraph))
      (listing_block_marker_end)
      (listing_callout
        (callout))
    ```

- [ ] Tables
- [ ] Equations and Formulas (STEM)
- [x] Open Blocks

  ```lisp
  (open_block)
  ```

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

    ```lisp
    (macro
      (name)
      (target))
    ```

  - [ ] Include Inline Macro

- [ ] Conditionals
  - [x] Simple per line (ifdef, ifndef, ifeval, endif)
- [ ] Passthroughs

  ```lisp
  (pass_block)
  ```

  ```lisp
  (pass_block
    (element_attributes)
    (paragraph))
  ```
