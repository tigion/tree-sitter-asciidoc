# tree-sitter-asciidoc

AsciiDoc grammar for [tree-sitter](https://github.com/tree-sitter/tree-sitter)

> [!WARNING]
> The grammar is not yet complete and the names of the rules or the structure of the tree nodes may change.

> [!NOTE]
> Until the first version of the AsciiDoc Language Specification is ratified, AsciiDoc is defined by the Asciidoctor implementation. There is no other official definition of the language.
>
> Source: [AsciiDoc Language Documentation - About this documentation](https://docs.asciidoctor.org/asciidoc/latest/#about-this-documentation)

## References

- [AsciiDoc Language Documentation](https://docs.asciidoctor.org/asciidoc/latest/)

## Rule Coverage

Not everything in the checklists is relevant to grammar.

### Document structure

```lisp
(document
  (document_header
    (document_title)
    (document_authors)
    (document_revision)
    (document_attribute))
    ...
  (document_body
    ...))
```

### Basic

- [x] Lines
- [x] Empty lines
- [ ] Extended lines with `\` on the end
- [x] Paragraphs
- [ ] Blocks with title, attributes, anchor, title
- [ ] Text and inline elements

### Document Header

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

### Document Body

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

- [x] Sections

  ```lisp
  (section)
  ```

- [x] Parts

  ```lisp
  (part)
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
- [ ] Audio and Video
- [ ] Icons
- [ ] Keyboard Macro
- [ ] Button and Menu UI Macros
- [ ] Admonitions
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
      (comment_line))
    ```

  - [x] Comment Block

    ```lisp
    (comment
      (comment_block))
    ```

  - [x] Comment Open Block Style

    ```lisp
    (comment
      (element_attributes)
      (open_block))
    ```

  - [x] Comment Paragraph Style

    ```lisp
    (comment
      (element_attributes)
      (paragraph))
    ```

- [ ] Includes
- [ ] Conditionals
- [ ] Passthroughs

  ```lisp
  (pass_block)
  ```

  ```lisp
  (pass_block
    (element_attributes)
    (paragraph))
  ```
