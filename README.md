# tree-sitter-asciidoc

AsciiDoc grammar for [tree-sitter](https://github.com/tree-sitter/tree-sitter)

Better other parsers:

- <https://github.com/cathaysia/tree-sitter-asciidoc>
- <https://github.com/cpkio/tree-sitter-asciidoc>

---

> [!WARNING]
> The grammar is not yet complete and the names of the rules or the structure of the tree nodes may change.

> [!NOTE]
> Until the first version of the AsciiDoc Language Specification is ratified, AsciiDoc is defined by the Asciidoctor implementation. There is no other official definition of the language.
>
> Source: [AsciiDoc Language Documentation - About this documentation](https://docs.asciidoctor.org/asciidoc/latest/#about-this-documentation)

## Use

### Neovim

Add the following to your `init.lua` or `nvim-treesitter.lua` config and after a restart run `:TSInstallFromGrammar asciidoc`.

```lua
-- Adds a (experimental) parser for AsciiDoc.
-- Source: https://github.com/nvim-treesitter/nvim-treesitter?tab=readme-ov-file#adding-parsers
-- `:TSInstallFromGrammar asciidoc`
local parser_config = require('nvim-treesitter.parsers').get_parser_configs()
parser_config.asciidoc = {
  install_info = {
    url = 'https://github.com/tigion/tree-sitter-asciidoc',
    files = { 'src/parser.c' },
    branch = 'main',
  },
}
```

For highlighting, copy the _queries/highlights.scm_ to your _nvim/queries/asciidoc/_ directory.

> [!NOTE]
> The highlights are work in progress. The colors are not yet final.
>
> With `set syntax=asciidoc` the default vim syntax colors can also be used.

For Snacks.image support, add a file _nvim/queries/asciidoc/images.scm_ with the following content:

```scheme
(macro
  (name) @name (#eq? @name "image")
  (target) @image.src
) @image
```

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
- [ ] Nested Blocks (like example_block inside example_block)

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

#### Blocks

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
- [ ] Passthroughs

  ```lisp
  (pass_block)
  ```

  ```lisp
  (pass_block
    (element_attributes)
    (paragraph))
  ```
